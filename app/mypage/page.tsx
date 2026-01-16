import MyPageClient from './MyPageClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '마이페이지 - 파밍레터',
    description: '나만의 게임 컬렉션과 설정을 관리하세요.',
};

export default function MyPage() {
    return <MyPageClient />;
}
