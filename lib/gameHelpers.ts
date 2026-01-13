
import { Game } from '@/lib/types';
import { getGameDetails } from '@/lib/rawgClient';

export async function getGamesFromSlugs(slugs: string[]): Promise<Game[]> {
    const results = await Promise.all(
        slugs.map(async (slug) => {
            const game = await getGameDetails(slug);
            return game;
        })
    );
    // Filter out nulls
    return results.filter((g): g is Game => g !== null);
}
