type Language = "en" | "ru";

const LANGUAGE_KEY = "language";
const DEFAULT_LANGUAGE: Language = "en";

const dictionary: Record<Language, Record<string, string>> = {
  en: {
    "site.title": "Koshkin blog",
    "site.desc": "Bits and pieces of writing.",
    "skip.toContent": "Skip to content",
    "nav.posts": "Posts",
    "nav.tags": "Tags",
    "nav.about": "About",
    "nav.archives": "Archives",
    "nav.search": "Search",
    "nav.language": "Language",
    "language.current": "EN",
    "language.english": "English",
    "language.russian": "Русский",
    "theme.toggle": "Toggle light and dark",
    "home.links": "Links",
    "home.featured": "Featured",
    "home.recent": "Recent Posts",
    "home.allPosts": "All Posts",
    "page.posts.title": "Posts",
    "page.posts.desc": "All published notes.",
    "page.tags.title": "Tags",
    "page.tags.desc": "All tags used in posts.",
    "page.search.title": "Search",
    "page.search.desc": "Search blog posts.",
    "page.archives.title": "Archives",
    "page.archives.desc": "All posts grouped by time.",
    "page.about.title": "About",
    "page.tag.prefix": "Tag:",
    "page.tag.desc": 'All posts tagged "{tag}".',
    "breadcrumb.home": "Home",
    "pagination.prev": "Prev",
    "pagination.next": "Next",
    "back.go": "Go back",
    "post.prev": "Previous Post",
    "post.next": "Next Post",
    "share.label": "Share this post:",
    "footer.rights": "All rights reserved.",
    "month.1": "January",
    "month.2": "February",
    "month.3": "March",
    "month.4": "April",
    "month.5": "May",
    "month.6": "June",
    "month.7": "July",
    "month.8": "August",
    "month.9": "September",
    "month.10": "October",
    "month.11": "November",
    "month.12": "December",
  },
  ru: {
    "site.title": "Кошкин блог",
    "site.desc": "Тут пишутся всякие штуки.",
    "skip.toContent": "Перейти к содержимому",
    "nav.posts": "Посты",
    "nav.tags": "Теги",
    "nav.about": "Эбаут",
    "nav.archives": "Архивы",
    "nav.search": "Поиск",
    "nav.language": "Язык",
    "language.current": "RU",
    "language.english": "English",
    "language.russian": "Русский",
    "theme.toggle": "Переключить светлую и темную тему",
    "home.links": "Ссылки",
    "home.featured": "Избранное",
    "home.recent": "Последние посты",
    "home.allPosts": "Все посты",
    "page.posts.title": "Посты",
    "page.posts.desc": "Все опубликованные посты.",
    "page.tags.title": "Теги",
    "page.tags.desc": "Все теги, которыми размечены записи.",
    "page.search.title": "Поиск",
    "page.search.desc": "Поиск по постам блога.",
    "page.archives.title": "Архивы",
    "page.archives.desc": "Все посты, разложенные по времени.",
    "page.about.title": "О блоге",
    "page.tag.prefix": "Тег:",
    "page.tag.desc": 'Все записи с тегом "{tag}".',
    "breadcrumb.home": "Главная",
    "pagination.prev": "Назад",
    "pagination.next": "Вперед",
    "back.go": "Назад",
    "post.prev": "Предыдущий пост",
    "post.next": "Следующий пост",
    "share.label": "Поделиться:",
    "footer.rights": "Все права защищины.",
    "month.1": "Январь",
    "month.2": "Февраль",
    "month.3": "Март",
    "month.4": "Апрель",
    "month.5": "Май",
    "month.6": "Июнь",
    "month.7": "Июль",
    "month.8": "Август",
    "month.9": "Сентябрь",
    "month.10": "Октябрь",
    "month.11": "Ноябрь",
    "month.12": "Декабрь",
  },
};

function getStoredLanguage(): Language {
  return localStorage.getItem(LANGUAGE_KEY) === "ru" ? "ru" : DEFAULT_LANGUAGE;
}

function translate(key: string, language: Language): string {
  return dictionary[language][key] ?? dictionary.en[key] ?? key;
}

function interpolate(text: string, values: Record<string, string>) {
  return text.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "");
}

function getValues(element: HTMLElement) {
  const raw = element.dataset.i18nValues;
  if (!raw) return {};

  try {
    return JSON.parse(raw) as Record<string, string>;
  } catch {
    return {};
  }
}

function setElementText(element: HTMLElement, language: Language) {
  const key = element.dataset.i18n;
  if (!key) return;

  element.textContent = interpolate(
    translate(key, language),
    getValues(element)
  );
}

function setElementAttribute(
  element: HTMLElement,
  attribute: "title" | "aria-label",
  language: Language
) {
  const key =
    attribute === "title"
      ? element.dataset.i18nTitle
      : element.dataset.i18nAriaLabel;

  if (!key) return;
  element.setAttribute(attribute, translate(key, language));
}

function closeLanguageMenu() {
  const button = document.querySelector<HTMLButtonElement>("#language-btn");
  const menu = document.querySelector<HTMLElement>("#language-menu");

  button?.setAttribute("aria-expanded", "false");
  menu?.classList.add("hidden");
}

function applyLanguage(language: Language) {
  localStorage.setItem(LANGUAGE_KEY, language);
  document.documentElement.lang = language;
  document.documentElement.dataset.language = language;

  document.querySelectorAll<HTMLElement>("[data-i18n]").forEach(element => {
    setElementText(element, language);
  });

  document
    .querySelectorAll<HTMLElement>("[data-i18n-title]")
    .forEach(element => {
      setElementAttribute(element, "title", language);
    });

  document
    .querySelectorAll<HTMLElement>("[data-i18n-aria-label]")
    .forEach(element => {
      setElementAttribute(element, "aria-label", language);
    });

  document
    .querySelectorAll<HTMLElement>("[data-language-option]")
    .forEach(option => {
      const selected = option.dataset.languageOption === language;
      option.setAttribute("aria-selected", selected ? "true" : "false");
      option.classList.toggle("text-accent", selected);
    });
}

function initLanguageSwitcher() {
  const language = getStoredLanguage();
  applyLanguage(language);

  const button = document.querySelector<HTMLButtonElement>("#language-btn");
  const menu = document.querySelector<HTMLElement>("#language-menu");

  if (!button || !menu || button.dataset.initialized === "true") return;
  button.dataset.initialized = "true";

  button.addEventListener("click", event => {
    event.stopPropagation();
    const isOpen = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", isOpen ? "false" : "true");
    menu.classList.toggle("hidden", isOpen);
  });

  menu
    .querySelectorAll<HTMLButtonElement>("[data-language-option]")
    .forEach(option => {
      option.addEventListener("click", () => {
        const nextLanguage =
          option.dataset.languageOption === "ru" ? "ru" : DEFAULT_LANGUAGE;
        applyLanguage(nextLanguage);
        closeLanguageMenu();
      });
    });

  if (document.documentElement.dataset.languageListeners !== "true") {
    document.documentElement.dataset.languageListeners = "true";
    document.addEventListener("click", closeLanguageMenu);
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") closeLanguageMenu();
    });
  }
}

initLanguageSwitcher();
document.addEventListener("astro:page-load", initLanguageSwitcher);
document.addEventListener("astro:after-swap", initLanguageSwitcher);
