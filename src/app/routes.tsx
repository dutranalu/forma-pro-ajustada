import { createBrowserRouter } from 'react-router';
import { Root } from './Root';
import { Home } from './pages/Home';
import { CourseDetail } from './pages/CourseDetail';
import { MyLearning } from './pages/MyLearning';
import { CourseLearning } from './pages/CourseLearning';
import { Courses } from './pages/Courses';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: 'cursos', Component: Courses },
      { path: 'curso/:id', Component: CourseDetail },
      { path: 'my-learning', Component: MyLearning },
      { path: 'learn/:id', Component: CourseLearning },
      { path: 'login', Component: Login },
      { path: 'cadastro', Component: Register },
    ],
  },
]);
