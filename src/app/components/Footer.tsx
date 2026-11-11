import { Link } from 'react-router';
import { Instagram, Linkedin, Mail } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

export function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="container mx-auto grid gap-10 px-4 py-12 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <BrandLogo variant="footer" />
          <p className="mt-4 max-w-md text-sm leading-6 text-slate-600">
            Plataforma de cursos profissionalizantes com foco em prática, empregabilidade e evolução contínua.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-900">Navegação</h3>
          <div className="mt-4 flex flex-col gap-3 text-sm text-slate-600">
            <Link to="/">Início</Link>
            <Link to="/cursos">Cursos</Link>
            <Link to="/my-learning">Minha jornada</Link>
            <Link to="/login">Entrar</Link>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-900">Contato</h3>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <p className="flex items-center gap-2"><Mail className="size-4" /> contato@formapro.com.br</p>
            <p className="flex items-center gap-2"><Instagram className="size-4" /> @formapro</p>
            <p className="flex items-center gap-2"><Linkedin className="size-4" /> FormaPro Educação</p>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-200 py-4 text-center text-sm text-slate-500">
        © 2026 FormaPro. Projeto acadêmico e portfólio.
      </div>
    </footer>
  );
}
