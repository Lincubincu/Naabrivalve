
export enum Language {
  ET = 'et',
  RU = 'ru',
  EN = 'en',
}

export interface User {
  id: string;
  name: string; // e.g., "Jüri korter 7"
}

export enum PostCategory {
  GENERAL = 'general',
  FOR_SALE = 'for_sale',
  FREE = 'free',
  PETS_LOST_FOUND = 'pets_lost_found',
  RIDE_SHARE_OFFER = 'ride_share_offer',
  RIDE_SHARE_REQUEST = 'ride_share_request',
  EVENT = 'event',
  HELP_REQUEST = 'help_request',
  HELP_OFFER = 'help_offer',
  RECOMMENDATION = 'recommendation',
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  userName: string;
  text: string;
  timestamp: number;
}

export interface Post {
  id:string;
  userId: string;
  userName: string;
  title: string;
  description: string;
  imageUrl?: string;
  location?: string; // Manual input or GPS based like "Pärnu kesklinn"
  category: PostCategory;
  timestamp: number;
  comments: Comment[];
  // Specific fields for certain categories
  eventDate?: string; // For EVENT
  price?: string; // For FOR_SALE
  origin?: string; // For RIDE_SHARE
  destination?: string; // For RIDE_SHARE
  isOffering?: boolean; // For RIDE_SHARE, HELP
  rsvp?: { userId: string, status: 'coming' | 'not_coming' }[]; // For EVENT
}

export interface Translations {
  [key: string]: {
    [lang in Language]: string;
  };
}

export type AppView = 
  | 'feed' 
  | 'createPost' 
  | 'settings' 
  | 'login' 
  | 'postDetail';

