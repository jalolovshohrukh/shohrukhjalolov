/**
 * Places Shohrukh has been — one representative city per country, plus home.
 * Used to plot green dots on the dotted world map and to list below it.
 * Cities are best-guess representatives; adjust freely.
 */
export type Place = {
  cityEn: string;
  cityRu: string;
  countryEn: string;
  countryRu: string;
  lat: number;
  lng: number;
  home?: boolean;
};

export const places: Place[] = [
  { cityEn: "Dushanbe", cityRu: "Душанбе", countryEn: "Tajikistan", countryRu: "Таджикистан", lat: 38.56, lng: 68.79, home: true },
  { cityEn: "Portland", cityRu: "Портленд", countryEn: "United States", countryRu: "США", lat: 45.52, lng: -122.68 },
  { cityEn: "Toronto", cityRu: "Торонто", countryEn: "Canada", countryRu: "Канада", lat: 43.65, lng: -79.38 },
  { cityEn: "Moscow", cityRu: "Москва", countryEn: "Russia", countryRu: "Россия", lat: 55.75, lng: 37.62 },
  { cityEn: "Bucharest", cityRu: "Бухарест", countryEn: "Romania", countryRu: "Румыния", lat: 44.43, lng: 26.1 },
  { cityEn: "Istanbul", cityRu: "Стамбул", countryEn: "Türkiye", countryRu: "Турция", lat: 41.01, lng: 28.98 },
  { cityEn: "Beijing", cityRu: "Пекин", countryEn: "China", countryRu: "Китай", lat: 39.9, lng: 116.4 },
  { cityEn: "Tashkent", cityRu: "Ташкент", countryEn: "Uzbekistan", countryRu: "Узбекистан", lat: 41.3, lng: 69.24 },
  { cityEn: "Almaty", cityRu: "Алматы", countryEn: "Kazakhstan", countryRu: "Казахстан", lat: 43.24, lng: 76.89 },
];
