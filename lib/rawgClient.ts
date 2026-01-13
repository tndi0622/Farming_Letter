import { Game } from './types';
import { newReleases, popularGames, onSaleGames, featuredGame } from './mockData';

const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;
const BASE_URL = 'https://api.rawg.io/api';

if (!API_KEY) {
    console.warn('RAWG API Key is missing in environment variables');
}

export async function getGames(params: Record<string, string> = {}): Promise<Game[]> {
    if (!API_KEY) return [];

    const searchParams = new URLSearchParams({
        key: API_KEY,
        page_size: '10',
        ...params,
    });

    try {
        const response = await fetch(`${BASE_URL}/games?${searchParams.toString()}`, {
            next: { revalidate: 3600 } // Revalidate every hour
        });

        if (!response.ok) {
            throw new Error(`Error fetching from RAWG: ${response.statusText}`);
        }

        const data = await response.json();
        return data.results.map(mapRawgGameToGame);
    } catch (error) {
        console.error('Failed to fetch games:', error);
        return [];
    }
}

const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop';

// Google Translate 'Free' Endpoint (GTX) - Unofficial but works for light usage
async function translateText(text: string): Promise<string> {
    if (!text) return text;

    try {
        // Split text into smaller chunks if it's too long (URL length limit)
        // For simple usage, we'll try to translate the first 2000 chars roughly.
        const truncText = text.slice(0, 2000);
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=ko&dt=t&q=${encodeURIComponent(truncText)}`;

        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0' // Sometimes required to avoid blocking
            }
        });

        if (!response.ok) {
            return text;
        }

        const data = await response.json();

        // Response structure: [[["Translated sub-part", "Source sub-part", ...], ...], ...]
        // We join the first element of each array in the first main array.
        if (data && Array.isArray(data[0])) {
            return data[0].map((item: any) => item[0]).join('');
        }

        return text;
    } catch (error) {
        console.error('Translation error:', error);
        return text;
    }
}

function mapRawgGameToGame(rawgGame: any): Game {
    return {
        id: rawgGame.id,
        title: rawgGame.name,
        summary: rawgGame.description_raw || rawgGame.description || '',
        coverImage: rawgGame.background_image || PLACEHOLDER_IMAGE,
        platforms: rawgGame.parent_platforms?.map((p: any) => p.platform.name) || [],
        releaseDate: rawgGame.released,
        rating: rawgGame.metacritic || 0,
        price: 0,
        discount: 0,
        genres: rawgGame.genres?.map((g: any) => g.name) || [],
        developers: rawgGame.developers?.map((d: any) => d.name) || []
    };
}

export async function getGameDetails(id: string): Promise<Game | null> {
    // 1. Check Mock Data first
    const numericId = parseInt(id);
    if (!isNaN(numericId)) {
        const allMocks = [...newReleases, ...popularGames, ...onSaleGames, featuredGame];
        const foundMock = allMocks.find(g => g.id === numericId);
        if (foundMock) {
            return foundMock;
        }
    }

    if (!API_KEY) return null;

    try {
        const response = await fetch(`${BASE_URL}/games/${id}?key=${API_KEY}`, {
            next: { revalidate: 3600 }
        });

        if (!response.ok) {
            console.error(`Error fetching game details (${response.status}): ${response.statusText}`);
            return null;
        }

        const data = await response.json();
        const game = mapRawgGameToGame(data);

        // Translate summary if available
        if (game.summary) {
            game.summary = await translateText(game.summary);
        }

        return game;
    } catch (error) {
        console.error(`Failed to fetch game details for ${id}:`, error);
        return null;
    }
}

export async function getNewReleases(): Promise<Game[]> {
    // Fetch upcoming/recent games but order by POPULARITY (-added) 
    // to filter for "Major Publishers" and "High Interest" games 
    // as requested by the user, avoiding obscure shovelware.
    const dates = '2024-06-01,2025-12-31';
    console.log(`Fetching curated new releases with dates: ${dates}`);

    const games = await getGames({
        dates: dates,
        ordering: '-added', // Changed from -released to -added effectively highlights "Major" & "Anticipated"
        page_size: '6'
    });
    console.log(`Fetched ${games.length} new releases`);
    return games;
}

export async function getIndieSpotlight(): Promise<Game[]> {
    // "Global Indie Spotlight" - Simulating "Latest Game Show" entries (G-Star/E3/TGS)
    // We look for very recent (late 2025 - current 2026) high-rated Indies.
    // Ideally this would be a crawled list from specific event pages, 
    // but for now we use 'Indie' genre + 'Recent' + 'Verified Quality'.
    const dates = '2025-09-01,2026-12-31';
    const games = await getGames({
        ordering: '-rating', // Highest rated first
        genres: 'indie',
        dates: dates,
        metacritic: '85,100', // Exceptional quality (Hidden Gems)
        page_size: '8'
    });
    return games;
}

export async function getPopularGames(): Promise<Game[]> {
    // "Major Games" / "Trending AAA"
    // Filter for games released in the last ~1 year (relative to Jan 2026) + High Popularity
    const dates = '2025-01-01,2026-01-13';
    const games = await getGames({
        dates: dates,
        ordering: '-added', // Trending recently
        metacritic: '80,100', // High quality
        page_size: '8', // Limit to top 8
    });
    console.log(`Fetched ${games.length} major/popular games`);
    return games;
}

export async function getPlatformTrending(platformId: string): Promise<Game[]> {
    // Fetch trending games specific to a platform
    const dates = '2024-01-01,2026-01-13'; // Extended range for platform libraries
    return getGames({
        platforms: platformId,
        dates: dates,
        ordering: '-added', // Popularity
        page_size: '4' // Top 4 per platform
    });
}

export async function getOnSaleGames(): Promise<Game[]> {
    // This is a fallback if CheapShark fails or is not used
    return getGames({
        ordering: '-metacritic',
        page_size: '8'
    });
}
