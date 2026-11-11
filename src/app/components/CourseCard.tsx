import { Link } from 'react-router';
import { ArrowRight, BarChart3, Clock3, Star, Users } from 'lucide-react';
import { Course } from '../types/course';
import { Badge } from './ui/badge';
import { Card, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';

interface CourseCardProps {
  course: Course;
}

const levelStyles: Record<string, string> = {
  Iniciante: 'bg-emerald-100 text-emerald-700',
  Intermediário: 'bg-amber-100 text-amber-700',
  Avançado: 'bg-rose-100 text-rose-700',
};

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link to={`/curso/${course.id}`}>
      <Card className="group flex h-full flex-col overflow-hidden border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        <div className="aspect-video overflow-hidden bg-slate-200">
          <img
            src={course.image}
            alt={course.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <CardContent className="flex-1 space-y-4 p-5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
              {course.category}
            </Badge>
            <Badge className={levelStyles[course.level] ?? 'bg-slate-100 text-slate-700'}>{course.level}</Badge>
          </div>

          <div>
            <h3 className="line-clamp-2 text-xl font-semibold text-slate-900">{course.title}</h3>
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{course.description}</p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-600">
            <p className="font-medium text-slate-800">Professor(a): {course.instructor}</p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <span className="flex items-center gap-2">
                <Star className="size-4 fill-amber-400 text-amber-400" /> {course.rating}
              </span>
              <span className="flex items-center gap-2">
                <Users className="size-4" /> {course.students.toLocaleString('pt-BR')}
              </span>
              <span className="flex items-center gap-2">
                <Clock3 className="size-4" /> {course.duration}
              </span>
              <span className="flex items-center gap-2">
                <BarChart3 className="size-4" /> {course.level}
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-5 pt-0">
          <Button className="w-full rounded-full bg-slate-900 hover:bg-slate-800">
            Ver curso
            <ArrowRight className="size-4" />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
