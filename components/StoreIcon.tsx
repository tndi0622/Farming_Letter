
import Image from 'next/image';

const STORE_SLUGS: Record<string, string> = {
    'Steam': 'steam',
    'Epic Games': 'epicgames',
    'GOG': 'gog',
    'Xbox': 'xbox',
    'PlayStation': 'playstation',
    'Nintendo': 'nintendoswitch',
    'Ubisoft': 'ubisoft',
    'Origin': 'origin',
    'EA': 'ea',
    'Amazon': 'amazon',
    'Google Play': 'googleplay',
    'App Store': 'apple'
};

interface StoreIconProps {
    store: string;
    className?: string;
}

export default function StoreIcon({ store, className = "w-4 h-4" }: StoreIconProps) {
    const slug = STORE_SLUGS[store];

    if (!slug) return null;

    return (
        <div className={`relative ${className} opacity-80 hover:opacity-100 transition-opacity`}>
            <Image
                src={`https://cdn.simpleicons.org/${slug}/white`}
                alt={store}
                fill
                className="object-contain"
                unoptimized // Use unoptimized for external CDNs if config is tricky, but preferably config
            />
        </div>
    );
}
