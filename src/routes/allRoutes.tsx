import { Navigate } from 'react-router-dom';
import FormElements from '../pages/Form/FormElements.tsx';
import FormLayout from '../pages/Form/FormLayout.tsx';
import Tables from '../pages/Tables.tsx';
import Settings from '../pages/Settings.tsx';
import Alerts from '../pages/UiElements/Alerts.tsx';
import Buttons from '../pages/UiElements/Buttons.tsx';
import SignIn from '../pages/Authentication/SignIn.tsx';
import SignUp from '../pages/Authentication/SignUp.tsx';
import Courses from '../pages/Courses/Courses.tsx';
import Students from '../pages/Students/Students.tsx';
import FeedBacks from '../pages/FeedBack/FeedBacks.tsx';

const authProtectedRoutes = [
  // Courses
  { path: '/courses', component: <Courses />, title: 'courses' },

  //Students
  { path: '/students', component: <Students />, title: 'students' },

  //FeedBacks
  { path: '/feedbacks', component: <FeedBacks />, title: 'feedbacks' },

  // Forms
  { path: '/forms/form-elements', component: <FormElements /> },
  { path: '/forms/form-layout', component: <FormLayout /> },

  // Tables
  { path: '/tables', component: <Tables /> },

  // Settings
  { path: '/settings', component: <Settings /> },

  // Ui
  { path: '/ui/alerts', component: <Alerts /> },
  { path: '/ui/buttons', component: <Buttons /> },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: '/',
    exact: true,
    component: <Navigate to="/dashboard" />,
  },
  { path: '*', component: <Navigate to="/dashboard" /> },
];

const publicRoutes = [
  { path: '/signIn', component: <SignIn /> },
  { path: '/login', component: <SignIn /> },
  { path: '/register', component: <SignUp /> },
];

export { authProtectedRoutes, publicRoutes };
