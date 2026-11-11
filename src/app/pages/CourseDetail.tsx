import { useNavigate, useParams } from 'react-router';
import { Award, Clock3, PlayCircle, Star, Users } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { courses } from '../data/courses';
import { useCourses } from '../context/CourseContext';

const levelStyles: Record<string, string> = {
  Iniciante: 'bg-emerald-100 text-emerald-700',
  Intermediário: 'bg-amber-100 text-amber-700',
  Avançado: 'bg-rose-100 text-rose-700',
};

export function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isEnrolled, enrollInCourse } = useCourses();
  const course = courses.find((item) => item.id === id);

  if (!course) {
    return <div className="container mx-auto px-4 py-16">Curso não encontrado.</div>;
  }

  const enrolled = isEnrolled(course.id);

  const handleEnroll = () => {
    enrollInCourse(course.id);
    navigate(`/learn/${course.id}`);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-slate-900 py-14 text-white">
        <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-blue-100 text-blue-700">{course.category}</Badge>
              <Badge className={levelStyles[course.level]}>{course.level}</Badge>
            </div>
            <h1 className="mt-5 text-4xl font-bold leading-tight">{course.title}</h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">{course.description}</p>
            <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-300">
              <span className="flex items-center gap-2">
                <Star className="size-4 fill-amber-400 text-amber-400" /> {course.rating}
              </span>
              <span className="flex items-center gap-2">
                <Users className="size-4" /> {course.students.toLocaleString('pt-BR')} alunos
              </span>
              <span className="flex items-center gap-2">
                <Clock3 className="size-4" /> {course.duration}
              </span>
            </div>
            <p className="mt-4 text-slate-300">Professor(a): {course.instructor}</p>
          </div>

          <Card className="overflow-hidden border-slate-800 bg-white text-slate-900 shadow-2xl">
            <div className="aspect-video overflow-hidden bg-slate-200">
              <img src={course.image} alt={course.title} className="h-full w-full object-cover" />
            </div>
            <CardContent className="space-y-5 p-6">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Matrículas abertas</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Acesse todas as aulas imediatamente e avance no seu ritmo dentro da plataforma.
                </p>
              </div>
              <Button onClick={handleEnroll} className="h-12 w-full rounded-xl bg-blue-700 hover:bg-blue-800" disabled={enrolled}>
                {enrolled ? 'Você já está matriculada' : 'Matricular agora'}
              </Button>
              {enrolled && (
                <Button onClick={() => navigate(`/learn/${course.id}`)} variant="outline" className="h-12 w-full rounded-xl">
                  Ir para as aulas
                </Button>
              )}
              <div className="space-y-3 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                <p className="flex items-center gap-2">
                  <PlayCircle className="size-4" /> {course.lessons.length} aulas disponíveis
                </p>
                <p className="flex items-center gap-2">
                  <Clock3 className="size-4" /> Acesso online imediato
                </p>
                <p className="flex items-center gap-2">
                  <Award className="size-4" /> Projeto preparado para certificado
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container mx-auto grid gap-10 px-4 py-14 lg:grid-cols-[1fr_300px]">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Conteúdo do curso</h2>
          <p className="mt-2 text-slate-600">Veja o que você vai estudar em cada etapa.</p>
          <Accordion type="single" collapsible className="mt-6 rounded-3xl bg-white p-3 shadow-sm ring-1 ring-slate-200">
            {course.lessons.map((lesson, index) => (
              <AccordionItem key={lesson.id} value={lesson.id}>
                <AccordionTrigger className="px-4 hover:no-underline">
                  <div className="flex items-center gap-3 text-left">
                    <div className="flex size-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{lesson.title}</p>
                      <p className="text-sm text-slate-500">{lesson.duration}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 text-slate-600">
                  Aula prática focada em aplicação real da habilidade trabalhada nesse módulo.
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <Card className="h-fit border-slate-200 bg-white shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-slate-900">Por que esse curso vale a pena?</h3>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              <li>• Estrutura clara para quem está começando ou evoluindo.</li>
              <li>• Linguagem objetiva e pensada para TCC e portfólio.</li>
              <li>• Interface organizada para simular uma plataforma real.</li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
