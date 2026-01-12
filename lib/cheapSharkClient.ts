import { Game } from './types';

const BASE_URL = 'https://www.cheapshark.com/api/1.0';

export async function getDeals(params: Record<string, string> = {}): Promise<Game[]> {
    const searchParams = new URLSearchParams({
        storeID: '1', // Steam only
        onSale: '1',
        pageSize: '8',
        sortBy: 'Metacritic', // Prioritize quality/popularity
        ...params,
    });

    try {
        const response = await fetch(`${BASE_URL}/deals?${searchParams.toString()}`, {
            next: { revalidate: 3600 } // Revalidate every hour
        });

        if (!response.ok) {
            throw new Error(`Error fetching from CheapShark: ${response.statusText}`);
        }

        const data = await response.json();
        return data.map(mapDealToGame);
    } catch (error) {
        console.error('Failed to fetch deals:', error);
        return [];
    }
}

function mapDealToGame(deal: any): Game {
    // Try to get a high-res image from Steam if steamAppID is present
    let coverImage = deal.thumb;
    if (deal.steamAppID) {
        coverImage = `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${deal.steamAppID}/header.jpg`;
    }

    // Use slugified title as ID to allow fetching details from RAWG
    const slug = slugify(deal.title);

    return {
        id: slug,
        title: deal.title,
        summary: '', // Deals endpoint doesn't provide summary
        coverImage: coverImage,
        platforms: ['PC'], // Since we filtered by StoreID 1 (Steam)
        releaseDate: deal.releaseDate ? new Date(deal.releaseDate * 1000).toISOString().split('T')[0] : 'N/A',
        rating: deal.steamRatingPercent ? parseInt(deal.steamRatingPercent) : parseInt(deal.metacriticScore) || 0,
        price: parseFloat(deal.salePrice),
        discount: Math.round(parseFloat(deal.savings))
    };
}

function slugify(text: string): string {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')     // Replace spaces with -
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, '-');  // Replace multiple - with single -
}
