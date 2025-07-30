import { APIClient } from './api_helpers.ts';

import * as url from './url_helper';

const api = new APIClient();

//auth courses
export const postLogin = (data: any) => api.create(url.POST_LOGIN, data);

// get all courses
export const getAllCourses = () => api.get(url.GET_ALL_COURSES);
// add New courses
export const addNewCourses = (course: any) =>
  api.create(url.ADD_NEW_COURSES, course);
// delete course
export const deleteCourses = (course: any) =>
  api.delete(url.ADD_NEW_COURSES + '/' + course);
// update course
export const updateCourses = (course: any) =>
  api.put(url.ADD_NEW_COURSES + '/' + course.id, course);

// get all student
export const getAllStudents = () => api.get(url.GET_ALL_STUDENT);

// get all feedbacks
export const getAllFeedBacks = () => api.get(url.GET_ALL_FEEDBACK);
// add New feedBacks
export const addNewFeedBacks = (feedback: any) =>
  api.create(url.ADD_NEW_FEEDBACK, feedback);
// approver feedbacks
export const approvedFeedBack = (feedback: any) =>
  api.put(url.FEEDBACK_APPROVED + '/' + feedback, feedback);
