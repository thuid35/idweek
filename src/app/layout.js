import './globals.css';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SmoothScrollProvider from '../components/providers/SmoothScrollProvider';

export const metadata = {
  title: 'IDWeek',
  description: 'IDWeek Project',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SmoothScrollProvider>
          <Header />
          <main style={{ minHeight: '100vh', paddingTop: '80px' }}>
            {children}
          </main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
