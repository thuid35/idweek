import './globals.css';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SmoothScrollProvider from '../components/providers/SmoothScrollProvider';
import Loader from '../components/ui/Loader';

export const metadata = {
  title: 'IDWeek',
  description: 'IDWeek Project',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SmoothScrollProvider>
          <Loader />
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