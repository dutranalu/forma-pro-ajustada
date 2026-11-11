import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Award, CheckCircle2, ChevronLeft, ChevronRight, PlayCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { courses } from '../data/courses';
import { useCourses } from '../context/CourseContext';

export function CourseLearning() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isEnrolled, getCompletedLessons, markLessonComplete, updateProgress } = useCourses();
  const course = courses.find((item) => item.id === id);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);

  if (!course) {
    return <div className="container mx-auto px-4 py-16">Curso não encontrado.</div>;
  }

  const enrolled = isEnrolled(course.id);
  const completedLessons = getCompletedLessons(course.id);
  const progress = useMemo(() => (completedLessons.length / course.lessons.length) * 100, [completedLessons.length, course.lessons.length]);
  const currentLesson = course.lessons[currentLessonIndex];
  const isLessonCompleted = completedLessons.includes(currentLesson.id);
  const isLastLesson = currentLessonIndex === course.lessons.length - 1;
  const isCourseCompleted = completedLessons.length === course.lessons.length;

  useEffect(() => {
    if (!enrolled) {
      navigate(`/curso/${course.id}`);
    }
  }, [course.id, enrolled, navigate]);

  useEffect(() => {
    updateProgress(course.id, progress);
  }, [course.id, progress, updateProgress]);

  const handleMarkComplete = () => {
    markLessonComplete(course.id, currentLesson.id);
  };

  const handlePrevious = () => setCurrentLessonIndex((prev) => Math.max(0, prev - 1));
  const handleNext = () => setCurrentLessonIndex((prev) => Math.min(course.lessons.length - 1, prev + 1));

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">Ambiente de aula</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">{course.title}</h1>
          </div>
          <Button variant="outline" className="rounded-full" onClick={() => navigate('/my-learning')}>
            Voltar para minha jornada
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <Card className="overflow-hidden border-slate-200 bg-white shadow-sm">
              <div className="flex aspect-video items-center justify-center bg-[linear-gradient(135deg,#0f172a_0%,#1d4ed8_65%,#7c3aed_100%)] text-white">
                <div className="text-center">
                  <PlayCircle className="mx-auto size-20" />
                  <p className="mt-4 text-lg font-medium">Vídeo / conteúdo da aula</p>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-sm font-semibold text-blue-700">Aula {currentLessonIndex + 1}</p>
                <h2 className="mt-2 text-2xl font-bold text-slate-900">{currentLesson.title}</h2>
                <p className="mt-2 text-slate-600">
                  Esta etapa aprofunda o conteúdo principal do módulo e ajuda a consolidar a prática necessária para o projeto.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button variant="outline" className="rounded-full" onClick={handlePrevious} disabled={currentLessonIndex === 0}>
                    <ChevronLeft className="size-4" /> Anterior
                  </Button>
                  {!isLessonCompleted && (
                    <Button className="rounded-full bg-blue-700 hover:bg-blue-800" onClick={handleMarkComplete}>
                      <CheckCircle2 className="size-4" /> Marcar como concluída
                    </Button>
                  )}
                  <Button variant="outline" className="rounded-full" onClick={handleNext} disabled={isLastLesson}>
                    Próxima <ChevronRight className="size-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-slate-900">Progresso do curso</h3>
                <div className="mt-4">
                  <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
                    <span>{completedLessons.length} de {course.lessons.length} aulas concluídas</span>
                    <span className="font-semibold text-slate-900">{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} />
                </div>
                {isCourseCompleted && (
                  <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-center">
                    <Award className="mx-auto size-10 text-emerald-600" />
                    <p className="mt-3 font-semibold text-emerald-900">Curso concluído com sucesso!</p>
                    <p className="mt-1 text-sm text-emerald-700">Pronto para gerar certificado na próxima evolução do projeto.</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-slate-200 bg-white shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-slate-900">Lista de aulas</h3>
                <div className="mt-4 space-y-2">
                  {course.lessons.map((lesson, index) => {
                    const completed = completedLessons.includes(lesson.id);
                    const current = index === currentLessonIndex;
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => setCurrentLessonIndex(index)}
                        className={`w-full rounded-2xl border p-4 text-left transition ${current ? 'border-blue-700 bg-blue-50' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'}`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`mt-1 flex size-6 items-center justify-center rounded-full ${completed ? 'bg-emerald-600 text-white' : 'border border-slate-300 text-slate-400'}`}>
                            {completed ? <CheckCircle2 className="size-4" /> : index + 1}
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">{lesson.title}</p>
                            <p className="mt-1 text-sm text-slate-500">{lesson.duration}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
