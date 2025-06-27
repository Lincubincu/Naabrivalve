
import React from 'react';
import { Language, PostCategory, Translations } from './types';

export const APP_TITLE = "Virtuaalne Naabrivalve";

export const DEFAULT_LANGUAGE = Language.ET;

export const POST_CATEGORIES: { value: PostCategory, labelKey: string }[] = [
  { value: PostCategory.GENERAL, labelKey: 'categoryGeneral' },
  { value: PostCategory.FOR_SALE, labelKey: 'categoryForSale' },
  { value: PostCategory.FREE, labelKey: 'categoryFree' },
  { value: PostCategory.PETS_LOST_FOUND, labelKey: 'categoryPetsLostFound' },
  { value: PostCategory.RIDE_SHARE_OFFER, labelKey: 'categoryRideShareOffer' },
  { value: PostCategory.RIDE_SHARE_REQUEST, labelKey: 'categoryRideShareRequest' },
  { value: PostCategory.EVENT, labelKey: 'categoryEvent' },
  { value: PostCategory.HELP_REQUEST, labelKey: 'categoryHelpRequest' },
  { value: PostCategory.HELP_OFFER, labelKey: 'categoryHelpOffer' },
  { value: PostCategory.RECOMMENDATION, labelKey: 'categoryRecommendation' },
];

export const UI_TEXTS: Translations = {
  appName: { et: "Virtuaalne Naabrivalve", en: "Virtual Neighborhood Watch", ru: "Виртуальный соседский дозор" },
  loginPrompt: { et: "Sisesta oma nimi või korteri number (nt Jüri korter 7)", en: "Enter your name or apartment number (e.g., John apt 7)", ru: "Введите ваше имя или номер квартиры (например, Юрий кв. 7)" },
  loginButton: { et: "Sisene", en: "Login", ru: "Войти" },
  logoutButton: { et: "Logi välja", en: "Logout", ru: "Выйти" },
  welcomeUser: { et: "Tere, {userName}!", en: "Hello, {userName}!", ru: "Привет, {userName}!" },
  feedTitle: { et: "Teadete voog", en: "Announcements Feed", ru: "Лента объявлений" },
  createPostButton: { et: "Lisa uus teade", en: "Add New Post", ru: "Добавить новое объявление" },
  settingsButton: { et: "Seaded", en: "Settings", ru: "Настройки" },
  settingsTitle: { et: "Rakenduse seaded", en: "Application Settings", ru: "Настройки приложения" },
  languageLabel: { et: "Keel:", en: "Language:", ru: "Язык:" },
  simplifiedModeLabel: { et: "Lihtsustatud režiim (suurem tekst):", en: "Simplified Mode (larger text):", ru: "Упрощенный режим (крупный текст):" },
  notificationsLabel: { et: "Teavitused:", en: "Notifications:", ru: "Уведомления:" },
  exportDataButton: { et: "Ekspordi teated (JSON)", en: "Export Posts (JSON)", ru: "Экспорт объявлений (JSON)" },
  // Create Post Form
  formTitleLabel: { et: "Pealkiri", en: "Title", ru: "Заголовок" },
  formDescriptionLabel: { et: "Kirjeldus", en: "Description", ru: "Описание" },
  formImageLabel: { et: "Pildi URL (valikuline)", en: "Image URL (optional)", ru: "URL изображения (необязательно)" },
  formLocationLabel: { et: "Asukoht (nt Pärnu kesklinn)", en: "Location (e.g., Pärnu city center)", ru: "Местоположение (например, центр Пярну)" },
  formCategoryLabel: { et: "Kategooria", en: "Category", ru: "Категория" },
  formSubmitButton: { et: "Postita", en: "Post", ru: "Опубликовать" },
  formCancelButton: { et: "Tühista", en: "Cancel", ru: "Отмена" },
  detectLocationButton: { et: "Määra asukoht GPS-iga", en: "Detect Location with GPS", ru: "Определить местоположение по GPS" },
  // Post Card
  postedByLabel: { et: "Postitas:", en: "Posted by:", ru: "Опубликовал:" },
  locationLabel: { et: "Asukoht:", en: "Location:", ru: "Местоположение:" },
  categoryLabel: { et: "Kategooria:", en: "Category:", ru: "Категория:" },
  commentsLabel: { et: "Kommentaarid", en: "Comments", ru: "Комментарии" },
  addCommentLabel: { et: "Lisa kommentaar...", en: "Add a comment...", ru: "Добавить комментарий..." },
  submitCommentButton: { et: "Saada", en: "Send", ru: "Отправить" },
  noPosts: { et: "Ühtegi teadet ei leitud.", en: "No posts found.", ru: "Объявлений не найдено." },
  backToFeed: { et: "Tagasi voogu", en: "Back to Feed", ru: "Назад к ленте" },
  viewPost: { et: "Vaata teadet", en: "View Post", ru: "Посмотреть объявление" },
  // Categories
  categoryGeneral: { et: "Üldine", en: "General", ru: "Общее" },
  categoryForSale: { et: "Müük", en: "For Sale", ru: "Продажа" },
  categoryFree: { et: "Ära anda", en: "Give Away", ru: "Отдам даром" },
  categoryPetsLostFound: { et: "Lemmikloomad (kadunud/leitud)", en: "Pets (Lost/Found)", ru: "Питомцы (потерян/найден)" },
  categoryRideShareOffer: { et: "Pakun sõitu", en: "Offering Ride", ru: "Предлагаю поездку" },
  categoryRideShareRequest: { et: "Otsin sõitu", en: "Requesting Ride", ru: "Ищу поездку" },
  categoryEvent: { et: "Üritus", en: "Event", ru: "Мероприятие" },
  categoryHelpRequest: { et: "Vajan abi", en: "Need Help", ru: "Нужна помощь" },
  categoryHelpOffer: { et: "Pakun abi", en: "Offering Help", ru: "Предлагаю помощь" },
  categoryRecommendation: { et: "Soovitus", en: "Recommendation", ru: "Рекомендация" },
  // Event specific
  eventDateLabel: { et: "Ürituse kuupäev:", en: "Event Date:", ru: "Дата мероприятия:" },
  formEventDateLabel: { et: "Ürituse kuupäev (YYYY-MM-DD)", en: "Event Date (YYYY-MM-DD)", ru: "Дата мероприятия (ГГГГ-ММ-ДД)" },
  rsvpComing: { et: "Tulen", en: "Coming", ru: "Приду" },
  rsvpNotComing: { et: "Ei tule", en: "Not Coming", ru: "Не приду" },
  // Ride share specific
  formOriginLabel: { et: "Lähtekoht", en: "Origin", ru: "Пункт отправления" },
  formDestinationLabel: { et: "Sihtkoht", en: "Destination", ru: "Пункт назначения" },
  // Marketplace specific
  formPriceLabel: { et: "Hind", en: "Price", ru: "Цена" },
  // For FilterPanel:
  allCategoriesLabel: { et: "Kõik kategooriad", en: "All Categories", ru: "Все категории" },
  // For Geolocation errors in App.tsx:
  locationError: {et: "Asukoha määramine ebaõnnestus: {message}", en: "Failed to get location: {message}", ru: "Не удалось определить местоположение: {message}"},
  geolocationNotSupported: {et: "GPS asukoha määramine pole selles brauseris toetatud.", en: "GPS location is not supported in this browser.", ru: "GPS-местоположение не поддерживается в этом браузере."}
};

// Define a type for individual icon functions
type IconType = (className?: string) => JSX.Element;

// Simple SVG Icons with explicit typing
export const Icons: Record<string, IconType> = {
  user: (className = "w-5 h-5") => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
    </svg>
  ),
  plusCircle: (className = "w-5 h-5") => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
    </svg>
  ),
  cog: (className = "w-5 h-5") => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01-.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106A1.532 1.532 0 0111.49 3.17zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
    </svg>
  ),
  globe: (className = "w-5 h-5") => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.5 7.5 7.442 9.076a1 1 0 001.95.208A7.001 7.001 0 0010 7c.884 0 1.734.201 2.528.566a1 1 0 10.992-1.734A8.962 8.962 0 0010 5c-.939 0-1.853.175-2.694.502H10a1 1 0 000-2H6.332a8.003 8.003 0 00-2 3.027zM10 15a5 5 0 100-10 5 5 0 000 10z" clipRule="evenodd" />
    </svg>
  ),
  mapPin: (className = "w-5 h-5") => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    </svg>
  ),
  camera: (className = "w-5 h-5") => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path d="M13 8V0L8.11 5.87 3 7.93v12.07h17V8h-7zM8 18H5V9.93l2.16-1.04L10 11.41V18zm9-1.5a.5.5 0 01-.5.5h-5a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5h5a.5.5 0 01.5.5v3zM10 0a3 3 0 11-6 0 3 3 0 016 0zm-2 3a1 1 0 10-2 0 1 1 0 002 0z" />
    </svg>
  ),
  chatBubble: (className = "w-5 h-5") => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zm-4 0H9v2h2V9z" clipRule="evenodd" />
    </svg>
  ),
  arrowLeft: (className = "w-5 h-5") => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
    </svg>
  ),
  download: (className = "w-5 h-5") => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  ),
};
