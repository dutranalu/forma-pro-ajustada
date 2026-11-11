import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { EnrolledCourse } from '../types/course';

interface CourseContextType {
  enrolledCourses: EnrolledCourse[];
  enrollInCourse: (courseId: string) => void;
  isEnrolled: (courseId: string) => boolean;
  updateProgress: (courseId: string, progress: number) => void;
  markLessonComplete: (courseId: string, lessonId: string) => void;
  getCompletedLessons: (courseId: string) => string[];
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export function CourseProvider({ children }: { children: ReactNode }) {
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>(() => {
    const saved = localStorage.getItem('enrolledCourses');
    return saved ? JSON.parse(saved) : [];
  });

  const [completedLessons, setCompletedLessons] = useState<Record<string, string[]>>(() => {
    const saved = localStorage.getItem('completedLessons');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
  }, [enrolledCourses]);

  useEffect(() => {
    localStorage.setItem('completedLessons', JSON.stringify(completedLessons));
  }, [completedLessons]);

  const enrollInCourse = (courseId: string) => {
    if (!enrolledCourses.find(e => e.courseId === courseId)) {
      setEnrolledCourses([
        ...enrolledCourses,
        {
          courseId,
          enrolledDate: new Date().toISOString(),
          progress: 0,
        }
      ]);
    }
  };

  const isEnrolled = (courseId: string) => {
    return enrolledCourses.some(e => e.courseId === courseId);
  };

  const updateProgress = (courseId: string, progress: number) => {
    setEnrolledCourses(prev =>
      prev.map(e =>
        e.courseId === courseId
          ? { ...e, progress, lastAccessed: new Date().toISOString() }
          : e
      )
    );
  };

  const markLessonComplete = (courseId: string, lessonId: string) => {
    setCompletedLessons(prev => {
      const current = prev[courseId] || [];
      if (current.includes(lessonId)) {
        return prev;
      }
      return {
        ...prev,
        [courseId]: [...current, lessonId]
      };
    });
  };

  const getCompletedLessons = (courseId: string): string[] => {
    return completedLessons[courseId] || [];
  };

  return (
    <CourseContext.Provider
      value={{
        enrolledCourses,
        enrollInCourse,
        isEnrolled,
        updateProgress,
        markLessonComplete,
        getCompletedLessons,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
}

export function useCourses() {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourses must be used within CourseProvider');
  }
  return context;
}
