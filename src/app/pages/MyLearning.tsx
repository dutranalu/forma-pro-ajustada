import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { courses } from '../data/courses';
import { useCourses } from '../context/CourseContext';
import { BookOpen, Clock3, GraduationCap } from 'lucide-react';

export function MyLearning() {
  const { enrolledCourses } = useCourses();
  const enrolledDetails = enrolledCourses
    .map((enrollment) => {
      const course = courses.find((item) => item.id === enrollment.courseId);
      return course ? { course, enrollment } : null;
    })
    .filter(Boolean) as { course: (typeof courses)[number]; enrollment: (typeof enrolledCourses)[number] }[];

  const averageProgress = enrolledCourses.length
    ? Math.round(enrolledCourses.reduce((acc, item) => acc + item.progress, 0) / enrolledCourses.length)
    : 0;

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">Área do aluno</p>
            <h1 className="mt-2 text-4xl font-bold text-slate-900">Minha jornada</h1>
            <p className="mt-3 max-w-2xl text-slate-600">Acompanhe seus cursos, o quanto já concluiu e volte rapidamente para a próxima aula.</p>
          </div>
          <Button asChild className="rounded-full bg-blue-700 hover:bg-blue-800">
            <Link to="/cursos">Explorar mais cursos</Link>
          </Button>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            { icon: GraduationCap, label: 'Cursos matriculados', value: enrolledCourses.length },
            { icon: BookOpen, label: 'Aulas em andamento', value: enrolledDetails.reduce((acc, item) => acc + item.course.lessons.length, 0) },
            { icon: Clock3, label: 'Progresso médio', value: `${averageProgress}%` },
          ].map((item) => (
            <Card key={item.label} className="border-slate-200 bg-white shadow-sm">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="rounded-2xl bg-blue-50 p-3 text-blue-700"><item.icon className="size-6" /></div>
                <div>
                  <p className="text-sm text-slate-500">{item.label}</p>
                  <p className="text-3xl font-bold text-slate-900">{item.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 space-y-6">
          {enrolledDetails.length === 0 ? (
            <Card className="border-dashed border-slate-300 bg-white">
              <CardContent className="py-14 text-center">
                <h2 className="text-2xl font-semibold text-slate-900">Você ainda não se matriculou em nenhum curso</h2>
                <p className="mt-3 text-slate-600">Escolha uma trilha e comece a montar sua plataforma com cara de projeto real.</p>
                <Button asChild className="mt-6 rounded-full bg-blue-700 hover:bg-blue-800">
                  <Link to="/cursos">Ver catálogo</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            enrolledDetails.map(({ course, enrollment }) => (
              <Card key={course.id} className="overflow-hidden border-slate-200 bg-white shadow-sm">
                <div className="grid gap-0 lg:grid-cols-[280px_1fr]">
                  <img src={course.image} alt={course.title} className="h-full min-h-56 w-full object-cover" />
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div>
                        <p className="text-sm font-semibold text-blue-700">{course.category}</p>
                        <h2 className="mt-1 text-2xl font-bold text-slate-900">{course.title}</h2>
                        <p className="mt-2 text-slate-600">{course.description}</p>
                      </div>
                      <Button asChild className="rounded-full bg-slate-900 hover:bg-slate-800">
                        <Link to={`/learn/${course.id}`}>Continuar</Link>
                      </Button>
                    </div>
                    <div className="mt-6">
                      <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
                        <span>Progresso</span>
                        <span className="font-semibold text-slate-900">{Math.round(enrollment.progress)}%</span>
                      </div>
                      <Progress value={enrollment.progress} />
                    </div>
                    <p className="mt-4 text-sm text-slate-500">
                      Matrícula em {new Date(enrollment.enrolledDate).toLocaleDateString('pt-BR')}
                    </p>
                  </CardContent>
                </div>
              </Card>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
