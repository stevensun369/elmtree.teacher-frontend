import { createStore, combineReducers, applyMiddleware } from 'redux'

import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

// reducers
import {
  teacherLoginReducer,
  teacherStudentsReducer,
  teacherHomeroomStudentsReducer,
  teacherHomeroomStudentSubjectsReducer,
  teacherSubjectStudentMarksReducer,
  teacherSubjectStudentTruancysReducer,
  teacherAddMarkReducer,
  teacherAddTruancyReducer,
  teacherMotivateTruancyReducer,
  teacherAddAverageReducer,
  teacherGetAverageReducer,
  teacherHomeroomGetAverageReducer,
  teacherHomeroomGetTermMarksReducer,
  teacherHomeroomAddTermMarkReducer,
} from './reducers/teacherReducers'

import {
  studentLoginReducer,
  studentSubjectMarksReducer,
  studentSubjectTruancysReducer,
  studentAverageMarksReducer,
  studentTermMarksReducer,
} from './reducers/studentReducers'

import {
  parentLoginReducer,
  parentMarksReducer,
  parentTruancysReducer,
  parentAverageMarksReducer,
  parentTermMarksReducer,
} from './reducers/parentReducers'

const reducer = combineReducers({
  // teacher only reducers
  teacherLogin: teacherLoginReducer,
  teacherStudents: teacherStudentsReducer,
  teacherSubjectStudentMarks: teacherSubjectStudentMarksReducer,
  teacherSubjectStudentTruancys: teacherSubjectStudentTruancysReducer,
  teacherAddMark: teacherAddMarkReducer,
  teacherAddTruancy: teacherAddTruancyReducer,
  teacherMotivateTruancy: teacherMotivateTruancyReducer,
  teacherAddAverage: teacherAddAverageReducer,
  teacherGetAverage: teacherGetAverageReducer,

  // homeroom teacher reducers
  teacherHomeroomStudents: teacherHomeroomStudentsReducer,
  teacherHomeroomGetAverage: teacherHomeroomGetAverageReducer,
  teacherHomeroomGetTermMarks: teacherHomeroomGetTermMarksReducer,
  teacherHomeroomAddTermMark: teacherHomeroomAddTermMarkReducer,
  teacherHomeroomStudentSubjects:
    teacherHomeroomStudentSubjectsReducer,

  // student reducers
  studentLogin: studentLoginReducer,
  studentSubjectMarks: studentSubjectMarksReducer,
  studentSubjectTruancys: studentSubjectTruancysReducer,
  studentAverageMarks: studentAverageMarksReducer,
  studentTermMarks: studentTermMarksReducer,

  // parent reducers
  parentLogin: parentLoginReducer,
  parentMarks: parentMarksReducer,
  parentTruancys: parentTruancysReducer,
  parentAverageMarks: parentAverageMarksReducer,
  parentTermMarks: parentTermMarksReducer,
})

const userTypeFromStorage = localStorage.getItem('userType')

const userFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null
// teacher Logged in
var teacherLoggedIn
var teacherLoggedInInfo
var teacherLoggedInHomeroomGrade
var teacherLoggedInSubjectList
var teacherLoggedInToken

// student Logged in
var studentLoggedIn
var studentLoggedInInfo
var studentLoggedInGrade
var studentLoggedInSubjectList

// parent Logged in
var parentLoggedIn
var parentLoggedInInfo
var parentStudents

if (userTypeFromStorage === 'teacher') {
  teacherLoggedIn = userFromStorage
  teacherLoggedInInfo = {
    teacherID: teacherLoggedIn.teacherID,
    firstName: teacherLoggedIn.firstName,
    lastName: teacherLoggedIn.lastName,
    cnp: teacherLoggedIn.cnp,
    // token: teacherLoggedIn.token,
  }
  teacherLoggedInHomeroomGrade = teacherLoggedIn.homeroomGrade
  teacherLoggedInSubjectList = teacherLoggedIn.subjectList
  teacherLoggedInToken = teacherLoggedIn.token
} else if (userTypeFromStorage === 'student') {
  studentLoggedIn = userFromStorage
  studentLoggedInInfo = {
    studentID: studentLoggedIn.studentID,
    firstName: studentLoggedIn.firstName,
    dadInitials: studentLoggedIn.dadInitials,
    lastName: studentLoggedIn.lastName,
    cnp: studentLoggedIn.cnp,
    token: studentLoggedIn.token,
  }
  studentLoggedInGrade = studentLoggedIn.grade
  studentLoggedInSubjectList = studentLoggedIn.subjectList
} else if (userTypeFromStorage === 'parent') {
  parentLoggedIn = userFromStorage
  parentLoggedInInfo = {
    parentID: parentLoggedIn.parentID,
    studentID: parentLoggedIn.studentID,
    firstName: parentLoggedIn.firstName,
    lastName: parentLoggedIn.lastName,
    cnp: parentLoggedIn.cnp,
    token: parentLoggedIn.token,
  }
  parentStudents = parentLoggedIn.students
}

const initialState = {
  teacherLogin: {
    teacherInfo: teacherLoggedInInfo,
    homeroomGrade: teacherLoggedInHomeroomGrade,
    subjectList: teacherLoggedInSubjectList,
    token: teacherLoggedInToken,
  },
  studentLogin: {
    studentInfo: studentLoggedInInfo,
    grade: studentLoggedInGrade,
    subjectList: studentLoggedInSubjectList,
  },
  parentLogin: {
    parentInfo: parentLoggedInInfo,
    students: parentStudents,
    addedStudentFlag: [],
  },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
