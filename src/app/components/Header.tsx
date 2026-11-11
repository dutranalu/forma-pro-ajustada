import { Link, useLocation } from 'react-router';
import { BookOpen, Menu, Search, User } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { Button, buttonVariants } from './ui/button';
import { Input } from './ui/input';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';

const navItems = [
  { path: '/', label: 'Início' },
  { path: '/cursos', label: 'Cursos' },
  { path: '/my-learning', label: 'Minha jornada' },
];

export function Header() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="container mx-auto flex h-18 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-3">
          <BrandLogo variant="header" />
        </Link>

        <div className="mx-8 hidden max-w-md flex-1 items-center lg:flex">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <Input
              type="search"
              placeholder="Buscar cursos, áreas e habilidades"
              className="h-11 rounded-full border-slate-200 bg-slate-50 pl-10"
            />
          </div>
        </div>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path} className={isActive(item.path) ? 'text-blue-700' : 'hover:text-slate-900'}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Abrir menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="border-l-slate-200 bg-white">
              <SheetHeader className="border-b border-slate-200 pb-4">
                <BrandLogo variant="header" className="w-fit" />
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>Navegue pelos cursos e acesse sua conta.</SheetDescription>
              </SheetHeader>

              <nav className="flex flex-1 flex-col gap-2 px-4">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.path}>
                    <Link
                      to={item.path}
                      className={`rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${
                        isActive(item.path) ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>

              <SheetFooter className="border-t border-slate-200">
                <SheetClose asChild>
                  <Link to="/login" className={`${buttonVariants({ variant: 'outline' })} w-full rounded-full border-slate-200`}>
                    Entrar
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link to="/cadastro" className={`${buttonVariants({ variant: 'default' })} w-full rounded-full bg-blue-700 hover:bg-blue-800`}>
                    <User className="size-4" />
                    Cadastrar
                  </Link>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          <Button asChild variant="ghost" className="hidden rounded-full text-slate-700 hover:text-slate-900 lg:inline-flex">
            <Link to="/my-learning">
              <BookOpen className="size-4" />
              Minha área
            </Link>
          </Button>
          <Button asChild variant="outline" className="hidden rounded-full border-slate-200 sm:inline-flex">
            <Link to="/login">Entrar</Link>
          </Button>
          <Button asChild className="rounded-full bg-blue-700 hover:bg-blue-800">
            <Link to="/cadastro">
              <User className="size-4" />
              Cadastrar
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
