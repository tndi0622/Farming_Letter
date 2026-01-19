import { Game, News, Briefing, Newsletter } from './types';

export const featuredGame: Game = {
    id: 1,
    title: "할로우 나이트: 실크송",
    summary: "실크송의 저주받은 왕국을 탐험하세요! 평단과 유저 모두의 극찬을 받은 액션 어드벤처 후속작이 돌아왔습니다.",
    coverImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop", // E-sports/Gaming
    platforms: ['PC', 'PS5', 'Switch', 'Xbox'],
    releaseDate: "2025-09-04",
    rating: 98,
    source: 'manual'
};

export const newReleases: Game[] = [
    {
        id: 101,
        title: "몬스터 헌터 와일즈",
        coverImage: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2670&auto=format&fit=crop", // Gaming dark
        platforms: ['PS5', 'PC', 'Xbox'],
        releaseDate: "2025-02-28",
        rating: 0,
        price: 69.99,
        source: 'manual'
    },
    {
        id: 102,
        title: "문명 VII",
        coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop", // Retro Tech
        platforms: ['PC', 'PS5', 'Switch'],
        releaseDate: "2025-02-11",
        rating: 0,
        price: 59.99,
        source: 'manual'
    },
    {
        id: 103,
        title: "슈퍼 마리오 오디세이 2",
        coverImage: "https://images.unsplash.com/photo-1560253023-3ec5d502959f?q=80&w=2670&auto=format&fit=crop", // Switch/Colorful
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
        coverImage: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2670&auto=format&fit=crop", // Dark atmospheric
        platforms: ['PC', 'PS5', 'Xbox'],
        releaseDate: "2025-06-21",
        rating: 97,
        source: 'manual'
    },
    {
        id: "grand-theft-auto-vi", // Changed from 202 to match slug
        title: "GTA VI",
        coverImage: "https://images.unsplash.com/photo-1605901309584-818e25960b8f?q=80&w=2670&auto=format&fit=crop", // Changed to a more GTA-like vibe (Sunset/City) or keep previous
        platforms: ['PS5', 'Xbox'],
        releaseDate: "2026-11-19",
        rating: 0,
        source: 'manual'
    },
    {
        id: 203,
        title: "더 위쳐 4",
        coverImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2668&auto=format&fit=crop", // Nature/Adventure
        platforms: ['PC', 'PS5', 'Xbox'],
        releaseDate: "TBA",
        rating: 0,
        source: 'manual'
    },
    {
        id: "od", // Manual entry for Kojima's OD to avoid API conflict
        title: "OD",
        summary: "코지마 히데오가 선보이는 새로운 형태의 몰입형 공포 게임. '소셜 스크림 시스템'을 통해 클라우드 게이밍의 잠재력을 극한으로 시험합니다. 이 게임은 단순한 공포를 넘어 플레이어의 공포 한계점을 테스트하는 실험적인 작품입니다.",
        coverImage: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=2670&auto=format&fit=crop", // Dark/Horror/Abstract
        platforms: ['Xbox', 'PC'],
        releaseDate: "TBA",
        rating: 0,
        source: 'manual',
        developers: ['Kojima Productions']
    }
];

export const onSaleGames: Game[] = [
    {
        id: 301,
        title: "사이버펑크 2077",
        coverImage: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=2670&auto=format&fit=crop", // Cyberpunk/Tech
        platforms: ['PC', 'PS5', 'Xbox'],
        releaseDate: "2020-12-10",
        rating: 86,
        price: 59.99,
        discount: 50,
        source: 'manual'
    },
    {
        id: 302,
        title: "하데스 II",
        coverImage: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=2694&auto=format&fit=crop", // Gaming atmospheric
        platforms: ['PC', 'Switch'],
        releaseDate: "2024-08-15",
        rating: 94,
        price: 29.99,
        discount: 20,
        source: 'manual'
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
        thumbnail: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=2670&auto=format&fit=crop",
        intro: `안녕하세요, **파밍레터(Farming Letter)**입니다. 2025년이 '대격변의 해'였다면, 2026년은 그야말로 '수확의 해'가 될 전망입니다. 차세대 엔진의 최적화가 무르익었고, 오랫동안 베일에 싸여있던 전설적인 프랜차이즈들이 귀환을 예고하고 있습니다. 새해 첫 뉴스레터에서는 여러분의 지갑과 시간을 확실하게 책임질 기대작들을 미리 짚어드립니다.`,
        highlights: [
            {
                title: "'더 위쳐' 시리즈의 새로운 시작: 프로젝트 폴라리스",
                description: "프로젝트 폴라리스(Polaris)의 구체적인 인게임 플레이 영상이 상반기 중 공개될 가능성이 높습니다. 게롤트가 아닌 새로운 위쳐 교단의 이야기가 어떻게 펼쳐질지 주목하세요.",
                gameSlug: "the-witcher-4"
            },
            {
                title: "오픈월드의 새로운 기준, GTA VI",
                description: "콘솔 독점 기간이 끝나고 PC 버전 발매에 대한 구체적인 로드맵이 발표될 것으로 보입니다. 모드(MOD) 커뮤니티의 활성화가 기대됩니다.",
                gameSlug: "grand-theft-auto-vi"
            },
            {
                title: "코지마 프로덕션의 'OD'",
                description: "클라우드 게이밍 기술을 극한으로 활용한 이 실험적인 공포 게임이, 과연 공포 장르의 문법을 어떻게 바꿀지 업계가 긴장하고 있습니다.",
                gameSlug: "od"
            }
        ],
        deepDive: {
            title: "그래픽 그 이상의 경험, '몰입형 심(Immersive Sim)'의 부활",
            content: `2026년 기대작들의 공통점은 '자유도'의 질적 향상입니다. 과거의 자유도가 단순히 "어디든 갈 수 있다"였다면, 2026년의 자유도는 "무엇이든 될 수 있다"에 가깝습니다.\n\n특히 켄 레빈의 신작 **'주다스(Judas)'**와 아케인 스튜디오의 차기작은 플레이어의 선택이 스토리의 결말뿐만 아니라, 게임 속 세계의 경제와 생태계까지 바꾸는 유기적인 시스템을 선보일 예정입니다. 단순히 퀘스트 마커를 따라가는 게임에 지치셨나요? 올해는 직접 이야기를 만들어가는 진짜 모험을 기대하셔도 좋습니다.`
        },
        editorNote: `이번 호부터는 독자 여러분의 피드백을 반영하여 '출시 예정일 캘린더' 기능을 뉴스레터 하단에 추가했습니다. 기대작들의 발매 연기 소식이나 급작스러운 출시일 변경도 놓치지 않고 업데이트해 드리겠습니다. 앞으로도 더 나은 읽는 경험을 제공하기 위해 노력하겠습니다.`,
        outro: "언제나 그랬듯, 즐거운 게임 라이프 되시길 바랍니다. 다음 주에 또 만나요!"
    },
    {
        id: "vol-9",
        title: "Vol.9: 스팀 겨울 할인 알짜배기 가이드",
        date: "2025.12.24",
        summary: "할인율 75% 이상, 압도적 긍정적 평가를 받은 숨은 명작들을 찾아보세요.",
        thumbnail: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2670&auto=format&fit=crop"
    },
    {
        id: "vol-8",
        title: "Vol.8: TGA 2025 수상작 분석",
        date: "2025.12.15",
        summary: "올해의 게임(GOTY) 수상작과 그 의미, 그리고 놓친 후보작까지.",
        thumbnail: "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?q=80&w=2670&auto=format&fit=crop"
    },
    {
        id: "vol-7",
        title: "Vol.7: 인디 게임의 약진",
        date: "2025.12.01",
        summary: "대형 개발사 못지않은 퀄리티와 재미로 무장한 12월의 인디 게임.",
        thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop"
    }
];
