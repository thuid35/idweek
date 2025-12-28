import GalleryClient from './GalleryClient';

export const metadata = {
  title: '設計師照片 | 2025 東海工設週',
  description: '查看 2025 東海工設週所有參展設計師、老師與總召的拍立得照片牆。',
};

export default function Page() {
  return <GalleryClient />;
}
