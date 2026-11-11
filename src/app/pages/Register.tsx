import { Link } from 'react-router';
import { BrandLogo } from '../components/BrandLogo';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';

export function Register() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-16">
      <Card className="w-full max-w-lg border-slate-200 shadow-lg">
        <CardHeader className="space-y-4 text-center">
          <BrandLogo variant="auth" className="mx-auto" />
          <div className="mx-auto inline-flex rounded-full bg-slate-100 p-1">
            <Link to="/login" className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900">
              Entrar
            </Link>
            <Link to="/cadastro" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm">
              Cadastrar
            </Link>
          </div>
          <div>
            <CardTitle className="text-3xl">Criar conta</CardTitle>
            <p className="mt-2 text-sm text-slate-600">Cadastre-se para acessar cursos, trilhas e acompanhar seu progresso.</p>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <Input placeholder="Nome" className="h-12 rounded-xl md:col-span-2" />
          <Input placeholder="E-mail" type="email" className="h-12 rounded-xl md:col-span-2" />
          <Input placeholder="Senha" type="password" className="h-12 rounded-xl" />
          <Input placeholder="Confirmar senha" type="password" className="h-12 rounded-xl" />
          <Button className="h-12 rounded-xl bg-blue-700 hover:bg-blue-800 md:col-span-2">Cadastrar</Button>
          <p className="text-center text-sm text-slate-600 md:col-span-2">
            Já tem conta?{' '}
            <Link to="/login" className="font-semibold text-blue-700 hover:underline">
              Entrar
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
