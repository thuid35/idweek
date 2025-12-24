import './globals.css';
import { Suspense } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SmoothScrollProvider from '../components/providers/SmoothScrollProvider';
import Loader from '../components/ui/Loader';
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata = {
  metadataBase: new URL('https://idweek.thuid.net'),
  title: {
    default: '2025 東海工設週 | THU IDWEEK',
    template: '%s | 2025 東海工設週',
  },
  description: '《 2025 東海工設週 THU IDWEEK 》官方網站 | ⌏❬ 孵化 ❭ ⌌ * 孕育 * 校驗 * 重生 | 工業設計、展場規劃、互動藝術、產品設計、3D列印',
  keywords: ['東海工設週', 'THU IDWEEK', '工業設計', '展覽', '設計', '東海大學', '畢業製作', '設計展', '孵化', 'INKUBATION'],
  authors: [{ name: 'THU IDWEEK Team' }],
  creator: 'THU IDWEEK Team',
  publisher: 'THU IDWEEK',
  openGraph: {
    title: '2025 東海工設週 | THU IDWEEK',
    description: '《 2025 東海工設週 THU IDWEEK 》官方網站 | ⌏❬ 孵化 ❭ ⌌ * 孕育 * 校驗 * 重生',
    url: 'https://idweek.thuid.net',
    siteName: '2025 東海工設週 | THU IDWEEK',
    locale: 'zh_TW',
    type: 'website',
    images: [
      {
        url: '/weblogo.png',
        width: 800,
        height: 600,
        alt: 'THU IDWEEK Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '2025 東海工設週 | THU IDWEEK',
    description: '《 2025 東海工設週 THU IDWEEK 》官方網站 | ⌏❬ 孵化 ❭ ⌌ * 孕育 * 校驗 * 重生',
    images: ['/weblogo.png'],
  },
  icons: {
    icon: '/weblogo.png',
    shortcut: '/weblogo.png',
    apple: '/weblogo.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport = {
  themeColor: '#1a1a1a',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW">
      <body>
        <SmoothScrollProvider>
          <Suspense fallback={null}>
            <Loader/>
          </Suspense>
          <Header/>
          <main style={{ minHeight: '100vh' }}>
            {children}
          </main>
          <Footer/>
        </SmoothScrollProvider>
        <Analytics/>
        <SpeedInsights/>
      </body>
    </html>
  );
};