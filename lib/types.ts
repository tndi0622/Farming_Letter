export interface Platform {
  id: number;
  name: string;
  slug: string;
}

export interface Game {
  id: string | number;
  title: string;
  summary?: string;
  coverImage: string;
  platforms: string[]; // e.g. ['PC', 'PS5']
  releaseDate: string;
  rating: number; // Metacritic score or similar (0-100)
  price?: number;
  discount?: number; // percentage off, e.g. 20 for 20%
  genres?: string[];
  developers?: string[];
  store?: string;
  storeLink?: string;
}

export interface News {
  id: number;
  title: string;
  summary: string;
  publishedAt: string;
  imageUrl?: string;
}

export interface Briefing {
  id: string;
  headlines: string[];
  newReleases: Game[];
  sales: Game[];
  timeLeftSeconds: number; // For countdown
}

export interface Newsletter {
  id: string;
  title: string;
  date: string;
  summary: string;
  thumbnail: string;
  intro?: string;
  highlights?: {
    title: string;
    description: string;
    gameSlug?: string;
  }[];
  deepDive?: {
    title: string;
    content: string;
  };
  editorNote?: string;
  outro?: string;
}
