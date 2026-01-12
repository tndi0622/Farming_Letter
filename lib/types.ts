export interface Platform {
  id: number;
  name: string;
  slug: string;
}

export interface Game {
  id: number;
  title: string;
  summary?: string;
  coverImage: string;
  platforms: string[]; // e.g. ['PC', 'PS5']
  releaseDate: string;
  rating: number; // Metacritic score or similar (0-100)
  price?: number;
  discount?: number; // percentage off, e.g. 20 for 20%
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
}
