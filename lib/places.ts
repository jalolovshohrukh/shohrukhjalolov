/**
 * Places Shohrukh has been — grouped by country, each city with an IANA
 * timezone so the map can show the current local time on hover.
 * Home (Dushanbe) is rendered in the accent colour.
 */
export type City = {
  en: string;
  ru: string;
  lat: number;
  lng: number;
  tz: string;
  home?: boolean;
};
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
    cities: [
      { en: "Dushanbe", ru: "Душанбе", lat: 38.56, lng: 68.79, tz: "Asia/Dushanbe" },
    ],
  },
  {
    en: "United States",
    ru: "США",
    cities: [
      { en: "Los Angeles", ru: "Лос-Анджелес", lat: 34.05, lng: -118.24, tz: "America/Los_Angeles" },
      { en: "San Francisco", ru: "Сан-Франциско", lat: 37.77, lng: -122.42, tz: "America/Los_Angeles" },
      { en: "San Jose", ru: "Сан-Хосе", lat: 37.34, lng: -121.89, tz: "America/Los_Angeles" },
      { en: "Portland", ru: "Портленд", lat: 45.52, lng: -122.68, tz: "America/Los_Angeles", home: true },
      { en: "Salem", ru: "Сейлем", lat: 44.94, lng: -123.04, tz: "America/Los_Angeles" },
      { en: "Seattle", ru: "Сиэтл", lat: 47.61, lng: -122.33, tz: "America/Los_Angeles" },
      { en: "Salt Lake City", ru: "Солт-Лейк-Сити", lat: 40.76, lng: -111.89, tz: "America/Denver" },
      { en: "Denver", ru: "Денвер", lat: 39.74, lng: -104.99, tz: "America/Denver" },
      { en: "Boulder", ru: "Боулдер", lat: 40.01, lng: -105.27, tz: "America/Denver" },
      { en: "Fort Collins", ru: "Форт-Коллинз", lat: 40.59, lng: -105.08, tz: "America/Denver" },
      { en: "New York", ru: "Нью-Йорк", lat: 40.71, lng: -74.01, tz: "America/New_York" },
      { en: "New Jersey", ru: "Нью-Джерси", lat: 40.72, lng: -74.04, tz: "America/New_York" },
      { en: "Boston", ru: "Бостон", lat: 42.36, lng: -71.06, tz: "America/New_York" },
      { en: "Philadelphia", ru: "Филадельфия", lat: 39.95, lng: -75.17, tz: "America/New_York" },
      { en: "Washington, D.C.", ru: "Вашингтон", lat: 38.9, lng: -77.04, tz: "America/New_York" },
      { en: "Niagara Falls", ru: "Ниагарский водопад", lat: 43.1, lng: -79.04, tz: "America/New_York" },
    ],
  },
  {
    en: "Canada",
    ru: "Канада",
    cities: [
      { en: "Vancouver", ru: "Ванкувер", lat: 49.28, lng: -123.12, tz: "America/Vancouver" },
      { en: "Victoria", ru: "Виктория", lat: 48.43, lng: -123.37, tz: "America/Vancouver" },
    ],
  },
  {
    en: "Russia",
    ru: "Россия",
    cities: [{ en: "Moscow", ru: "Москва", lat: 55.75, lng: 37.62, tz: "Europe/Moscow" }],
  },
  {
    en: "Romania",
    ru: "Румыния",
    cities: [{ en: "Bucharest", ru: "Бухарест", lat: 44.43, lng: 26.1, tz: "Europe/Bucharest" }],
  },
  {
    en: "Türkiye",
    ru: "Турция",
    cities: [{ en: "Istanbul", ru: "Стамбул", lat: 41.01, lng: 28.98, tz: "Europe/Istanbul" }],
  },
  {
    en: "Uzbekistan",
    ru: "Узбекистан",
    cities: [
      { en: "Tashkent", ru: "Ташкент", lat: 41.3, lng: 69.24, tz: "Asia/Tashkent" },
      { en: "Samarkand", ru: "Самарканд", lat: 39.65, lng: 66.96, tz: "Asia/Samarkand" },
      { en: "Termez", ru: "Термез", lat: 37.22, lng: 67.28, tz: "Asia/Tashkent" },
      { en: "Denau", ru: "Денау", lat: 38.33, lng: 67.9, tz: "Asia/Tashkent" },
    ],
  },
  {
    en: "Kazakhstan",
    ru: "Казахстан",
    cities: [{ en: "Almaty", ru: "Алматы", lat: 43.24, lng: 76.89, tz: "Asia/Almaty" }],
  },
  {
    en: "China",
    ru: "Китай",
    cities: [
      { en: "Shanghai", ru: "Шанхай", lat: 31.23, lng: 121.47, tz: "Asia/Shanghai" },
      { en: "Guangzhou", ru: "Гуанчжоу", lat: 23.13, lng: 113.26, tz: "Asia/Shanghai" },
      { en: "Wenzhou", ru: "Вэньчжоу", lat: 27.99, lng: 120.7, tz: "Asia/Shanghai" },
      { en: "Yiwu", ru: "Иу", lat: 29.31, lng: 120.07, tz: "Asia/Shanghai" },
      { en: "Wuxi", ru: "Уси", lat: 31.49, lng: 120.31, tz: "Asia/Shanghai" },
      { en: "Jinan", ru: "Цзинань", lat: 36.65, lng: 117.12, tz: "Asia/Shanghai" },
      { en: "Zibo", ru: "Цзыбо", lat: 36.81, lng: 118.06, tz: "Asia/Shanghai" },
      { en: "Boxing", ru: "Босин", lat: 37.15, lng: 118.1, tz: "Asia/Shanghai" },
      { en: "Chongqing", ru: "Чунцин", lat: 29.56, lng: 106.55, tz: "Asia/Shanghai" },
      { en: "Fuzhou", ru: "Фучжоу", lat: 26.07, lng: 119.3, tz: "Asia/Shanghai" },
      { en: "Urumqi", ru: "Урумчи", lat: 43.83, lng: 87.62, tz: "Asia/Shanghai" },
    ],
  },
];
