
export interface SteamSpecial {
    id: number;
    title: string;
    thumbnail: string;
    salePrice: number;
    normalPrice: number;
    discount: number;
    link: string;
}

export async function getSteamSpecials(): Promise<SteamSpecial[]> {
    try {
        const response = await fetch('https://store.steampowered.com/api/featuredcategories?l=koreana&cc=kr', {
            next: { revalidate: 3600 }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch Steam specials');
        }

        const data = await response.json();
        const specials = data.specials?.items || [];

        return specials.map((item: any) => ({
            id: item.id,
            title: item.name,
            thumbnail: item.header_image || item.large_capsule_image,
            salePrice: item.final_price / 100, // Steam API often returns values multiplied by 100
            normalPrice: item.original_price / 100,
            discount: item.discount_percent,
            link: `https://store.steampowered.com/app/${item.id}/`
        }));
    } catch (error) {
        console.error('Error fetching Steam specials:', error);
        return [];
    }
}
