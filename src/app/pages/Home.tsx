import { Link } from 'react-router';
import { ArrowRight, BriefcaseBusiness, Clock3, GraduationCap, LayoutGrid, ShieldCheck } from 'lucide-react';
import { courses } from '../data/courses';
import { CourseCard } from '../components/CourseCard';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const featuredCourses = courses.filter((course) => course.featured).slice(0, 4);
const categories = ['Programação', 'Administração', 'Marketing', 'Design', 'Atendimento'];

export function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.18),_transparent_30%),linear-gradient(135deg,#0f172a_0%,#1d4ed8_60%,#7c3aed_100%)] text-white">
        <div className="container mx-auto grid gap-12 px-4 py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:py-28">
          <div>
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
              Plataforma de cursos profissionalizantes
            </span>
            <h1 className="mt-6 max-w-2xl text-5xl font-bold leading-tight sm:text-6xl">
              Aprenda habilidades profissionais e construa seu próximo passo.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-blue-50/90">
              A FormaPro reúne cursos práticos, trilhas organizadas e acompanhamento de progresso para quem quer crescer de verdade no mercado de trabalho.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-full bg-white text-slate-900 hover:bg-slate-100">
                <Link to="/cursos">Explorar cursos</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-white/30 bg-white/10 text-white hover:bg-white/20">
                <Link to="/cadastro">Criar conta</Link>
              </Button>
            </div>
            <div className="mt-10 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                ['+50', 'trilhas futuras'],
                ['+1.000', 'alunos projetados'],
                ['100%', 'online'],
                ['No seu ritmo', 'aprendizado'],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                  <p className="text-2xl font-bold">{value}</p>
                  <p className="mt-1 text-sm text-blue-100">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <Card className="border-white/15 bg-white/10 shadow-2xl backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="rounded-3xl bg-white p-6 text-slate-900 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">Sua trilha</p>
                    <h2 className="mt-1 text-2xl font-bold">Desenvolvimento Full Stack</h2>
                  </div>
                  <div className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">76%</div>
                </div>
                <div className="mt-6 space-y-4">
                  {['Front-end com React', 'Java para APIs', 'Banco de dados e deploy'].map((item, index) => (
                    <div key={item} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex size-9 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                          {index + 1}
                        </div>
                        <span className="font-medium">{item}</span>
                      </div>
                      <span className="text-sm text-slate-500">Aula disponível</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-2xl bg-slate-900 p-5 text-white">
                  <p className="text-sm text-slate-300">Certificado desbloqueável</p>
                  <p className="mt-1 text-lg font-semibold">Conclua a trilha e gere seu certificado de conclusão.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { icon: GraduationCap, title: 'Cursos profissionalizantes', text: 'Conteúdo objetivo, organizado por aulas e pensado para aplicação real.' },
            { icon: Clock3, title: 'Estude no seu tempo', text: 'Continue exatamente de onde parou, com acompanhamento de progresso.' },
            { icon: ShieldCheck, title: 'Aprendizado que abre portas', text: 'Desenvolva competências práticas e prepare-se para novas oportunidades profissionais.' },
          ].map((item) => (
            <Card key={item.title} className="border-slate-200 bg-white shadow-sm">
              <CardContent className="p-6">
                <item.icon className="size-10 text-blue-700" />
                <h3 className="mt-4 text-xl font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">Cursos em destaque</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">As trilhas mais procuradas da FormaPro</h2>
          </div>
          <Button asChild variant="outline" className="hidden rounded-full md:inline-flex">
            <Link to="/cursos">
              Ver catálogo completo
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {featuredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 md:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-700">Áreas de aprendizado</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">Escolha uma rota para começar</h2>
              <p className="mt-3 max-w-2xl text-slate-600">
                A plataforma foi pensada para crescer com novas áreas, novos módulos e novas oportunidades.
              </p>
            </div>
            <Button asChild className="rounded-full bg-slate-900 hover:bg-slate-800">
              <Link to="/cadastro">Começar agora</Link>
            </Button>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {categories.map((category) => (
              <div key={category} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-center">
                <LayoutGrid className="mx-auto size-8 text-blue-700" />
                <p className="mt-3 font-semibold text-slate-900">{category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            { title: '1. Crie sua conta', text: 'Cadastre-se em poucos segundos e acesse sua área do aluno.' },
            { title: '2. Escolha seu curso', text: 'Explore as trilhas e encontre a melhor rota para seu objetivo.' },
            { title: '3. Acompanhe seu progresso', text: 'Marque aulas concluídas e visualize sua evolução.' },
          ].map((step) => (
            <Card key={step.title} className="border-slate-200 bg-white shadow-sm">
              <CardContent className="p-6">
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Passo</p>
                <h3 className="mt-2 text-xl font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-slate-600">{step.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="rounded-[2rem] bg-slate-900 px-8 py-10 text-white md:px-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-300">Pronta para virar projeto real</p>
              <h2 className="mt-3 text-3xl font-bold">Uma base forte para TCC, apresentação e portfólio.</h2>
              <p className="mt-3 max-w-2xl text-slate-300">
                Com identidade visual definida, catálogo de cursos, área do aluno e tela de aula, a FormaPro já tem uma cara muito mais profissional.
              </p>
            </div>
            <div className="flex gap-4">
              <Button asChild size="lg" className="rounded-full bg-white text-slate-900 hover:bg-slate-100">
                <Link to="/cursos">Ver cursos</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-white/20 bg-transparent text-white hover:bg-white/10">
                <Link to="/my-learning">
                  <BriefcaseBusiness className="size-4" />
                  Minha jornada
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
