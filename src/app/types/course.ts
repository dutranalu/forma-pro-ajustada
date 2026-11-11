export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  image: string;
  duration: string;
  level: 'Iniciante' | 'Intermediário' | 'Avançado';
  category: string;
  rating: number;
  students: number;
  price: number;
  featured?: boolean;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  videoUrl?: string;
}

export interface EnrolledCourse {
  courseId: string;
  enrolledDate: string;
  progress: number;
  lastAccessed?: string;
}
