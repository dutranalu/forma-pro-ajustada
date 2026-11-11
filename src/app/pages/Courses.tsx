import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { courses } from '../data/courses';
import { CourseCard } from '../components/CourseCard';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

export function Courses() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const categories = ['Todos', ...new Set(courses.map((course) => course.category))];

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesCategory = selectedCategory === 'Todos' || course.category === selectedCategory;
      const matchesSearch = `${course.title} ${course.description} ${course.category}`
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">Catálogo</p>
          <h1 className="mt-2 text-4xl font-bold text-slate-900">Encontre o curso certo para a sua meta profissional</h1>
          <p className="mt-4 text-lg text-slate-600">
            Explore áreas em crescimento e escolha uma trilha para desenvolver novas competências.
          </p>
        </div>

        <div className="mt-8 rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Busque por curso, categoria ou habilidade"
                className="h-12 rounded-full border-slate-200 pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  className={`rounded-full ${selectedCategory === category ? 'bg-blue-700 hover:bg-blue-800' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>
    </div>
  );
}
