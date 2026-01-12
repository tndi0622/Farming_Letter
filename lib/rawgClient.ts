import { Game } from './types';

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
    if (!API_KEY) return null;

    try {
        const response = await fetch(`${BASE_URL}/games/${id}?key=${API_KEY}`, {
            next: { revalidate: 3600 }
        });

        if (!response.ok) {
            throw new Error(`Error fetching game details: ${response.statusText}`);
        }

        const data = await response.json();
        const game = mapRawgGameToGame(data);

        // Translate summary if available
        if (game.summary) {
            // Translate only the first 1000 characters to save quota/time if needed, 
            // but for quality let's try full text or split if too long. 
            // Google API has limits per request, but 5k chars usually. 
            // rawg descriptions can be HTML. description_raw is safer.
            game.summary = await translateText(game.summary);
        }

        return game;
    } catch (error) {
        console.error(`Failed to fetch game details for ${id}:`, error);
        return null;
    }
}

export async function getNewReleases(): Promise<Game[]> {
    // RAWG API has real data. Since we are simulating 2026 but data is from 2024/2025,
    // we fetch the latest *real* upcoming/recent games to avoid 2033+ junk data.
    const dates = '2024-09-01,2025-12-31';
    console.log(`Fetching new releases with dates: ${dates}`);

    const games = await getGames({
        dates: dates,
        ordering: '-released', // Latest within the range
        page_size: '6'
    });
    console.log(`Fetched ${games.length} new releases`);
    return games;
}

export async function getPopularGames(): Promise<Game[]> {
    // Fetch all-time popular games if date-restricted query fails
    const games = await getGames({
        ordering: '-added', // Most added to libraries (Popularity)
        metacritic: '80,100', // High quality
        page_size: '8'
    });
    console.log(`Fetched ${games.length} popular games`);
    return games;
}

export async function getOnSaleGames(): Promise<Game[]> {
    // This is a fallback if CheapShark fails or is not used
    return getGames({
        ordering: '-metacritic',
        page_size: '8'
    });
}
