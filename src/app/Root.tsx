import { Outlet, useLocation } from 'react-router';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CourseProvider } from './context/CourseContext';
import { Toaster } from './components/ui/sonner';

export function Root() {
  const location = useLocation();
  const authPage = location.pathname === '/login' || location.pathname === '/cadastro';

  return (
    <CourseProvider>
      <div className="min-h-screen flex flex-col">
        {!authPage && <Header />}
        <main className="flex-1">
          <Outlet />
        </main>
        {!authPage && <Footer />}
        <Toaster />
      </div>
    </CourseProvider>
  );
}
