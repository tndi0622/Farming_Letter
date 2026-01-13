import { Game, News, Briefing, Newsletter } from './types';

export const featuredGame: Game = {
    id: 1,
    title: "할로우 나이트: 실크송",
    summary: "실크송의 저주받은 왕국을 탐험하세요! 평단과 유저 모두의 극찬을 받은 액션 어드벤처 후속작이 돌아왔습니다.",
    coverImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop", // Placeholder
    platforms: ['PC', 'PS5', 'Switch', 'Xbox'],
    releaseDate: "2025-09-04", // Updated to match API
    rating: 98,
};

export const newReleases: Game[] = [
    {
        id: 101,
        title: "몬스터 헌터 와일즈",
        coverImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop", // Desert / Adventure
        platforms: ['PS5', 'PC', 'Xbox'],
        releaseDate: "2025-02-28",
        rating: 0,
        price: 69.99
    },
    {
        id: 102,
        title: "문명 VII",
        coverImage: "https://images.unsplash.com/photo-1461301214746-1e790926d323?q=80&w=2670&auto=format&fit=crop", // Reliable Map/History image
        platforms: ['PC', 'PS5', 'Switch'],
        releaseDate: "2025-02-11",
        rating: 0,
        price: 59.99
    },
    {
        id: 103,
        title: "슈퍼 마리오 오디세이 2",
        coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop", // Bright/Game placeholder
        platforms: ['Switch'],
        releaseDate: "TBA",
        rating: 0,
        price: 59.99
    }
];

export const popularGames: Game[] = [
    {
        id: 201,
        title: "엘든 링: 황금 나무의 그림자",
        coverImage: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2778580/header.jpg", // Official Steam Art
        platforms: ['PC', 'PS5', 'Xbox'],
        releaseDate: "2025-06-21",
        rating: 97
    },
    {
        id: 202,
        title: "GTA VI",
        coverImage: "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?q=80&w=2670&auto=format&fit=crop", // Miami Night / Vice City vibe
        platforms: ['PS5', 'Xbox'],
        releaseDate: "2026-11-19",
        rating: 0 // Unreleased
    },
    {
        id: 203,
        title: "더 위쳐 4",
        coverImage: "https://images.unsplash.com/photo-1548588627-f97800c01a1c?q=80&w=2670&auto=format&fit=crop", // Snowy / Wolf vibe
        platforms: ['PC', 'PS5', 'Xbox'],
        releaseDate: "TBA",
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

export const recentNewsletters: Newsletter[] = [
    {
        id: "vol-10",
        title: "Vol.10: 2026년 기대작 총정리",
        date: "2026.01.01",
        summary: "다가오는 2026년, 놓치면 안 될 대작 게임들을 엄선해서 정리해드립니다.",
        thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop"
    },
    {
        id: "vol-9",
        title: "Vol.9: 스팀 겨울 할인 알짜배기 가이드",
        date: "2025.12.24",
        summary: "할인율 75% 이상, 압도적 긍정적 평가를 받은 숨은 명작들을 찾아보세요.",
        thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop"
    },
    {
        id: "vol-8",
        title: "Vol.8: TGA 2025 수상작 분석",
        date: "2025.12.15",
        summary: "올해의 게임(GOTY) 수상작과 그 의미, 그리고 놓친 후보작까지.",
        thumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2671&auto=format&fit=crop"
    },
    {
        id: "vol-7",
        title: "Vol.7: 인디 게임의 약진",
        date: "2025.12.01",
        summary: "대형 개발사 못지않은 퀄리티와 재미로 무장한 12월의 인디 게임.",
        thumbnail: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2670&auto=format&fit=crop"
    }
];
