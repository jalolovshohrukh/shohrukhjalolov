"use client";

import { useEffect, useRef } from "react";

/*
  Vivid Motion-style hero light: flowing ember smoke drawn by a fragment shader
  (domain-warped noise). Moving the pointer over the section swirls the smoke
  around it and warms its colour. Renders at half resolution, pauses off
  screen, and with reduced motion the smoke holds still (the pointer still
  warms the colour). Without WebGL the canvas never fades in and the CSS glow
  underneath stays.
*/

const VERTEX = `attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}`;

const FRAGMENT = `
precision mediump float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uPointer;
uniform float uHover;
uniform vec3 uBg;
uniform vec3 uDeep;
uniform vec3 uHot;
uniform vec3 uWarm;

float hash(vec2 p){p=fract(p*vec2(234.34,435.345));p+=dot(p,p+34.23);return fract(p.x*p.y);}
float noise(vec2 p){
  vec2 i=floor(p);vec2 f=fract(p);vec2 u=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1.,0.)),u.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),u.x),u.y);
}
float fbm(vec2 p){
  float v=0.;float a=.5;
  for(int i=0;i<4;i++){v+=a*noise(p);p=mat2(1.6,1.2,-1.2,1.6)*p;a*=.5;}
  return v;
}
void main(){
  float aspect=uRes.x/uRes.y;
  vec2 uv=gl_FragCoord.xy/uRes;
  vec2 p=vec2(uv.x*aspect,uv.y);
  vec2 m=vec2(uPointer.x*aspect,uPointer.y);
  vec2 d=p-m;
  float near=exp(-dot(d,d)*5.);
  float ang=uHover*near*1.8;
  float s=sin(ang);float c=cos(ang);
  vec2 q=(m+mat2(c,-s,s,c)*d)*.95;
  float t=uTime*.05;
  vec2 w1=vec2(fbm(q+vec2(0.,t)),fbm(q+vec2(5.2,1.3)-t));
  vec2 w2=vec2(fbm(q+3.*w1+vec2(1.7,9.2)+.6*t),fbm(q+3.*w1+vec2(8.3,2.8)-.4*t));
  float f=fbm(q+3.2*w2);
  float bias=smoothstep(.15,.85,uv.x)*smoothstep(-.1,.7,uv.y);
  float heat=smoothstep(.42,.95,f+.18*bias-.08)*(.35+.75*bias);
  heat+=uHover*near*.5;
  heat*=smoothstep(0.,.25,uv.y);
  vec3 hot=mix(uHot,uWarm,uHover*near);
  vec3 col=mix(uBg,uDeep,smoothstep(0.,.5,heat));
  col=mix(col,hot,smoothstep(.45,1.,heat));
  gl_FragColor=vec4(col,1.);
}`;

type Palette = { bg: number[]; deep: number[]; hot: number[]; warm: number[] };

const PALETTES: Record<"dark" | "light", Omit<Palette, "bg">> = {
  dark: { deep: [0.42, 0.05, 0.01], hot: [1, 0.24, 0.05], warm: [1, 0.48, 0.14] },
  light: { deep: [0.99, 0.74, 0.62], hot: [1, 0.42, 0.2], warm: [1, 0.6, 0.3] },
};

function hexToRgb(hex: string): number[] {
  const value = parseInt(hex.replace("#", ""), 16);
  if (Number.isNaN(value)) return [0, 0, 0];
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255].map((n) => n / 255);
}

function currentPalette(): Palette {
  const root = document.documentElement;
  const theme = root.classList.contains("theme-light") ? "light" : "dark";
  const bg = hexToRgb(getComputedStyle(root).getPropertyValue("--canvas").trim());
  return { bg, ...PALETTES[theme] };
}

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("EmberField: could not create a shader");
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(`EmberField: shader failed to compile: ${gl.getShaderInfoLog(shader)}`);
  }
  return shader;
}

function createProgram(gl: WebGLRenderingContext) {
  const program = gl.createProgram();
  if (!program) throw new Error("EmberField: could not create a program");
  gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX));
  gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(`EmberField: program failed to link: ${gl.getProgramInfoLog(program)}`);
  }
  gl.useProgram(program);
  // One triangle that covers the whole viewport.
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, "a");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  return program;
}

/** Starts the shader on `canvas`; returns a function that stops it and frees the GPU context. */
function startField(canvas: HTMLCanvasElement): () => void {
  const gl = canvas.getContext("webgl", { antialias: false, powerPreference: "low-power" });
  const area = canvas.parentElement;
  if (!gl || !area) return () => {};
  const program = createProgram(gl);
  const at = (name: string) => gl.getUniformLocation(program, name);
  const u = {
    res: at("uRes"), time: at("uTime"), pointer: at("uPointer"), hover: at("uHover"),
    bg: at("uBg"), deep: at("uDeep"), hot: at("uHot"), warm: at("uWarm"),
  };

  const still = window.matchMedia("(prefers-reduced-motion: reduce)");
  const pointer = { x: 0.72, y: 0.62, tx: 0.72, ty: 0.62, hover: 0, target: 0 };
  let time = 14;
  let last = performance.now();
  let frame = 0;
  let visible = true;

  const applyPalette = () => {
    const pal = currentPalette();
    gl.uniform3fv(u.bg, pal.bg);
    gl.uniform3fv(u.deep, pal.deep);
    gl.uniform3fv(u.hot, pal.hot);
    gl.uniform3fv(u.warm, pal.warm);
  };

  const resize = () => {
    const scale = Math.min(window.devicePixelRatio || 1, 1.5) * 0.5;
    canvas.width = Math.max(1, Math.round(canvas.clientWidth * scale));
    canvas.height = Math.max(1, Math.round(canvas.clientHeight * scale));
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(u.res, canvas.width, canvas.height);
  };

  const draw = (now: number) => {
    frame = 0;
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    if (!still.matches) time += dt;
    pointer.x += (pointer.tx - pointer.x) * 0.06;
    pointer.y += (pointer.ty - pointer.y) * 0.06;
    pointer.hover += (pointer.target - pointer.hover) * 0.05;
    gl.uniform1f(u.time, time);
    gl.uniform2f(u.pointer, pointer.x, pointer.y);
    gl.uniform1f(u.hover, pointer.hover);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    canvas.style.opacity = "1";
    const settling =
      Math.abs(pointer.target - pointer.hover) > 0.002 ||
      Math.abs(pointer.tx - pointer.x) + Math.abs(pointer.ty - pointer.y) > 0.002;
    if (visible && (!still.matches || settling)) schedule();
  };

  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(draw);
  };

  const onMove = (event: PointerEvent) => {
    const box = area.getBoundingClientRect();
    pointer.tx = (event.clientX - box.left) / box.width;
    pointer.ty = 1 - (event.clientY - box.top) / box.height;
    pointer.target = 1;
    schedule();
  };
  const onLeave = () => {
    pointer.target = 0;
    schedule();
  };
  const onTheme = () => {
    applyPalette();
    schedule();
  };

  const sizeObserver = new ResizeObserver(() => {
    resize();
    schedule();
  });
  const viewObserver = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    last = performance.now();
    if (visible) schedule();
  });
  const themeObserver = new MutationObserver(onTheme);

  applyPalette();
  resize();
  sizeObserver.observe(canvas);
  viewObserver.observe(canvas);
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  area.addEventListener("pointermove", onMove);
  area.addEventListener("pointerleave", onLeave);
  still.addEventListener("change", schedule);
  schedule();

  return () => {
    cancelAnimationFrame(frame);
    sizeObserver.disconnect();
    viewObserver.disconnect();
    themeObserver.disconnect();
    area.removeEventListener("pointermove", onMove);
    area.removeEventListener("pointerleave", onLeave);
    still.removeEventListener("change", schedule);
    gl.getExtension("WEBGL_lose_context")?.loseContext();
  };
}

/** Full-bleed shader canvas; its parent section must be `relative isolate overflow-hidden`. */
export function EmberField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    return startField(ref.current);
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-0 transition-opacity duration-1000"
    />
  );
}
