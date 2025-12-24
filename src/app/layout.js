import './globals.css';
import { Suspense } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SmoothScrollProvider from '../components/providers/SmoothScrollProvider';
import Loader from '../components/ui/Loader';
import { Analytics } from "@vercel/analytics/next"

export const metadata = {
  title: '2025 東海工設週 | THU IDWEEK',
  description: '《 2025 東海工設週 THU IDWEEK 》官方網站 | ⌏❬ 孵化 ❭ ⌌ * 孕育 * 校驗 * 重生 | 工業設計、展場規劃、互動藝術...',
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW">
      <body>
        <Analytics/>
        <SmoothScrollProvider>
          <Suspense fallback={null}>
            <Loader />
          </Suspense>
          <Header />
          <main style={{ minHeight: '100vh' }}>
            {children}
          </main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
};