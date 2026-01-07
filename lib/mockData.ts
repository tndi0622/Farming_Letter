import { Game, News, Briefing } from './types';

export const featuredGame: Game = {
    id: 1,
    title: "할로우 나이트: 실크송",
    summary: "실크송의 저주받은 왕국을 탐험하세요! 평단과 유저 모두의 극찬을 받은 액션 어드벤처 후속작이 돌아왔습니다.",
    coverImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop", // Placeholder
    platforms: ['PC', 'PS5', 'Switch', 'Xbox'],
    releaseDate: "2026-02-14",
    rating: 98,
};

export const newReleases: Game[] = [
    {
        id: 101,
        title: "파이널 판타지 XVII",
        coverImage: "https://images.unsplash.com/photo-1560253023-3ec5d502959f?q=80&w=2670&auto=format&fit=crop",
        platforms: ['PS5', 'PC'],
        releaseDate: "2026-01-06",
        rating: 92,
        price: 69.99
    },
    {
        id: 102,
        title: "문명 VII",
        coverImage: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2670&auto=format&fit=crop",
        platforms: ['PC'],
        releaseDate: "2026-01-07",
        rating: 89,
        price: 59.99
    },
    {
        id: 103,
        title: "슈퍼 마리오 오디세이 2",
        coverImage: "https://images.unsplash.com/photo-1605901309584-818e25960b8f?q=80&w=2678&auto=format&fit=crop",
        platforms: ['Switch'],
        releaseDate: "2026-01-05",
        rating: 96,
        price: 59.99
    }
];

export const popularGames: Game[] = [
    {
        id: 201,
        title: "엘든 링: 황금 나무의 그림자",
        coverImage: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2671&auto=format&fit=crop",
        platforms: ['PC', 'PS5', 'Xbox'],
        releaseDate: "2025-06-21",
        rating: 97
    },
    {
        id: 202,
        title: "GTA VI",
        coverImage: "https://images.unsplash.com/photo-1593305841991-05c29736ce87?q=80&w=2670&auto=format&fit=crop",
        platforms: ['PS5', 'Xbox'],
        releaseDate: "2025-11-15",
        rating: 99
    },
    {
        id: 203,
        title: "더 위쳐 4",
        coverImage: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=2728&auto=format&fit=crop",
        platforms: ['PC', 'PS5', 'Xbox'],
        releaseDate: "2026-05-10",
        rating: 0 // Not released
    }
];

export const onSaleGames: Game[] = [
    {
        id: 301,
        title: "사이버펑크 2077",
        coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop",
        platforms: ['PC', 'PS5', 'Xbox'],
        releaseDate: "2020-12-10",
        rating: 86,
        price: 59.99,
        discount: 50
    },
    {
        id: 302,
        title: "하데스 II",
        coverImage: "https://images.unsplash.com/photo-1519669556878-63bdad8a1a49?q=80&w=2712&auto=format&fit=crop",
        platforms: ['PC', 'Switch'],
        releaseDate: "2024-08-15",
        rating: 94,
        price: 29.99,
        discount: 20
    }
];

export const dailyBriefing: Briefing = {
    id: "brief-20260106",
    headlines: [
        "스팀 동시접속자 4,100만 명 돌파, 역대 최고 기록 경신",
        "‘할로우 나이트: 실크송’ 2월 14일 출시일 확정 발표",
        "닌텐도, 차세대 기기 하위 호환 공식 지원 발표"
    ],
    newReleases: newReleases,
    sales: onSaleGames,
    timeLeftSeconds: 72000 // approx 20 hours
};
