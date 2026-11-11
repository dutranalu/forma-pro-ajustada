import { Link } from 'react-router';
import { BrandLogo } from '../components/BrandLogo';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';

export function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-16">
      <Card className="w-full max-w-md border-slate-200 shadow-lg">
        <CardHeader className="space-y-4 text-center">
          <BrandLogo variant="auth" className="mx-auto" />
          <div className="mx-auto inline-flex rounded-full bg-slate-100 p-1">
            <Link to="/login" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm">
              Entrar
            </Link>
            <Link to="/cadastro" className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900">
              Cadastrar
            </Link>
          </div>
          <div>
            <CardTitle className="text-3xl">Entrar na FormaPro</CardTitle>
            <p className="mt-2 text-sm text-slate-600">Acesse sua jornada de aprendizagem e continue de onde parou.</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="E-mail" type="email" className="h-12 rounded-xl" />
          <Input placeholder="Senha" type="password" className="h-12 rounded-xl" />
          <Button className="h-12 w-full rounded-xl bg-blue-700 hover:bg-blue-800">Entrar</Button>
          <p className="text-center text-sm text-slate-600">
            Ainda não tem conta?{' '}
            <Link to="/cadastro" className="font-semibold text-blue-700 hover:underline">
              Cadastre-se
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
