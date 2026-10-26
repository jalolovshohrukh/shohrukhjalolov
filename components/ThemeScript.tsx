export const THEME_STORAGE_KEY = "sj-theme";

/**
 * Runs in <head> before first paint:
 * - puts the visitor's saved theme class on <html> (dark by default), so the
 *   page never flashes the wrong palette;
 * - adds "js-reveal", which lets CSS hide .reveal blocks until they scroll in.
 *   Without JavaScript that class is never set and everything stays visible.
 */
export function ThemeScript() {
  const code =
    `(function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');` +
    `if(t!=='light'&&t!=='dark'){t='dark'}var c=document.documentElement.classList;` +
    `c.remove('theme-light','theme-dark');c.add('theme-'+t);c.add('js-reveal')}catch(e){}})();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
