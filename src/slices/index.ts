import { combineReducers } from 'redux';

// Login
import LoginReducer from './auth/reducer.ts';

// Course
import CoursesReducer from './courses/reducer.ts';

// Students
import StudentsReducer from './students/reducer.ts';

// FeedBacks
import FeedbackReducer from './feedback/reducer.ts';

const rootReducer = combineReducers({
  Login: LoginReducer,
  Course: CoursesReducer,
  Students: StudentsReducer,
  Feedback: FeedbackReducer,
});

export default rootReducer;
