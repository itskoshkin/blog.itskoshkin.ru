export const SITE = {
  website: "https://blog.itskoshkin.ru/",
  author: "itskoshkin",
  profile: "https://itskoshkin.ru/",
  desc: "Some cat's blog",
  title: "Кошкин блог",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 6,
  postPerPage: 6,
  scheduledPostMargin: 15 * 60 * 1000, // 15m
  showArchives: true,
  showBackButton: true,
  editPost: {
    enabled: true,
    text: "Edit page",
    url: "https://github.com/itskoshkin/blog.itskoshkin.ru/edit/main/",
  },
  dynamicOgImage: true,
  dir: "ltr", // "rtl" | "auto"
  lang: "ru", // html lang code
  timezone: "Europe/Moscow", // https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;
