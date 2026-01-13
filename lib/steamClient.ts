
export interface SteamDeal {
    id: string;
    title: string;
    originalPrice: string;
    salePrice: string;
    discount: string;
    thumbnail: string;
    store: 'Steam';
    link: string;
}

export async function getSteamSpecials(): Promise<SteamDeal[]> {
    try {
        const response = await fetch('https://store.steampowered.com/api/featuredcategories?cc=kr', {
            next: { revalidate: 3600 }
        });

        if (!response.ok) {
            return [];
        }

        const data = await response.json();
        const specials = data.specials?.items || [];

        return specials.map((item: any) => ({
            id: `steam_${item.id}`,
            title: item.name,
            originalPrice: item.original_price ? formatSteamPrice(item.original_price) : '₩0',
            salePrice: item.final_price ? formatSteamPrice(item.final_price) : '₩0',
            discount: item.discount_percent ? `${item.discount_percent}%` : '0%',
            thumbnail: item.large_capsule_image || item.header_image,
            store: 'Steam',
            link: `https://store.steampowered.com/app/${item.id}/?utm_source=farming_letter`
        })).slice(0, 8);

    } catch (error) {
        console.error('Steam API Error:', error);
        return [];
    }
}

export async function getSteamGameDetails(id: string): Promise<any | null> {
    const steamId = id.replace('steam_', '');

    try {
        // Steam Store API for app details
        // Note: This API is rate limited depending on IP, usually OK for small scale client usage.
        // It returns a map of { [appId]: { success: boolean, data: ... } }
        const response = await fetch(`https://store.steampowered.com/api/appdetails?appids=${steamId}&l=koreana&cc=kr`, {
            next: { revalidate: 86400 }
        });

        if (!response.ok) return null;

        const data = await response.json();
        const appData = data[steamId];

        if (!appData || !appData.success) {
            return null;
        }

        const game = appData.data;

        return {
            id: `steam_${steamId}`,
            title: game.name,
            summary: game.short_description,
            description: game.detailed_description, // HTML content
            coverImage: game.header_image,
            platforms: ['PC', 'Steam'], // Steam is PC
            releaseDate: game.release_date?.date || '출시 예정',
            rating: game.metacritic ? game.metacritic.score : 0,
            ratingCount: game.recommendations ? game.recommendations.total : 0,
            genres: game.genres?.map((g: any) => g.description) || [],
            developers: game.developers || [],
            publishers: game.publishers || [],
            price: game.price_overview?.final || 0,
            originalPrice: game.price_overview?.initial || 0,
            discount: game.price_overview?.discount_percent || 0,
            storeLink: `https://store.steampowered.com/app/${steamId}`
        };

    } catch (error) {
        console.error('Steam Detail Fetch Error:', error);
        return null;
    }
}

function formatSteamPrice(price: number): string {
    return `₩${(price / 100).toLocaleString()}`;
}
