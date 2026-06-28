/**
 * Places Shohrukh has been — grouped by country, each with the cities he
 * visited. Used to plot green dots on the dotted world map and to list below
 * it. Home (Dushanbe) is rendered in the accent colour.
 */
export type City = { en: string; ru: string; lat: number; lng: number };
export type Country = {
  en: string;
  ru: string;
  home?: boolean;
  cities: City[];
};

export const visited: Country[] = [
  {
    en: "Tajikistan",
    ru: "Таджикистан",
    home: true,
    cities: [{ en: "Dushanbe", ru: "Душанбе", lat: 38.56, lng: 68.79 }],
  },
  {
    en: "United States",
    ru: "США",
    cities: [
      { en: "Los Angeles", ru: "Лос-Анджелес", lat: 34.05, lng: -118.24 },
      { en: "San Francisco", ru: "Сан-Франциско", lat: 37.77, lng: -122.42 },
      { en: "Portland", ru: "Портленд", lat: 45.52, lng: -122.68 },
      { en: "Seattle", ru: "Сиэтл", lat: 47.61, lng: -122.33 },
      { en: "Denver", ru: "Денвер", lat: 39.74, lng: -104.99 },
      { en: "Fort Collins", ru: "Форт-Коллинз", lat: 40.59, lng: -105.08 },
      { en: "New York", ru: "Нью-Йорк", lat: 40.71, lng: -74.01 },
      { en: "Boston", ru: "Бостон", lat: 42.36, lng: -71.06 },
      { en: "Philadelphia", ru: "Филадельфия", lat: 39.95, lng: -75.17 },
      { en: "Washington, D.C.", ru: "Вашингтон", lat: 38.9, lng: -77.04 },
      { en: "Niagara Falls", ru: "Ниагарский водопад", lat: 43.1, lng: -79.04 },
    ],
  },
  {
    en: "Canada",
    ru: "Канада",
    cities: [
      { en: "Vancouver", ru: "Ванкувер", lat: 49.28, lng: -123.12 },
      { en: "Victoria", ru: "Виктория", lat: 48.43, lng: -123.37 },
    ],
  },
  {
    en: "Russia",
    ru: "Россия",
    cities: [{ en: "Moscow", ru: "Москва", lat: 55.75, lng: 37.62 }],
  },
  {
    en: "Romania",
    ru: "Румыния",
    cities: [{ en: "Bucharest", ru: "Бухарест", lat: 44.43, lng: 26.1 }],
  },
  {
    en: "Türkiye",
    ru: "Турция",
    cities: [{ en: "Istanbul", ru: "Стамбул", lat: 41.01, lng: 28.98 }],
  },
  {
    en: "Uzbekistan",
    ru: "Узбекистан",
    cities: [
      { en: "Tashkent", ru: "Ташкент", lat: 41.3, lng: 69.24 },
      { en: "Samarkand", ru: "Самарканд", lat: 39.65, lng: 66.96 },
      { en: "Termez", ru: "Термез", lat: 37.22, lng: 67.28 },
      { en: "Denau", ru: "Денау", lat: 38.33, lng: 67.9 },
    ],
  },
  {
    en: "Kazakhstan",
    ru: "Казахстан",
    cities: [{ en: "Almaty", ru: "Алматы", lat: 43.24, lng: 76.89 }],
  },
  {
    en: "China",
    ru: "Китай",
    cities: [
      { en: "Shanghai", ru: "Шанхай", lat: 31.23, lng: 121.47 },
      { en: "Guangzhou", ru: "Гуанчжоу", lat: 23.13, lng: 113.26 },
      { en: "Wenzhou", ru: "Вэньчжоу", lat: 27.99, lng: 120.7 },
      { en: "Yiwu", ru: "Иу", lat: 29.31, lng: 120.07 },
      { en: "Wuxi", ru: "Уси", lat: 31.49, lng: 120.31 },
      { en: "Jinan", ru: "Цзинань", lat: 36.65, lng: 117.12 },
      { en: "Zibo", ru: "Цзыбо", lat: 36.81, lng: 118.06 },
      { en: "Boxing", ru: "Босин", lat: 37.15, lng: 118.1 },
      { en: "Chongqing", ru: "Чунцин", lat: 29.56, lng: 106.55 },
      { en: "Fuzhou", ru: "Фучжоу", lat: 26.07, lng: 119.3 },
    ],
  },
];
