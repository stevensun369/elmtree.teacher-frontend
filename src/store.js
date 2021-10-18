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
  teacherAverageMarksReducer,
  teacherHomeroomAverageMarksReducer,
  teacherHomeroomTermMarksReducer,
  teacherHomeroomAddTermMarkReducer,
} from './reducers/teacherReducers'

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
  teacherAverageMarks: teacherAverageMarksReducer,

  // homeroom teacher reducers
  teacherHomeroomStudents: teacherHomeroomStudentsReducer,
  teacherHomeroomAverageMarks: teacherHomeroomAverageMarksReducer,
  teacherHomeroomTermMarks: teacherHomeroomTermMarksReducer,
  teacherHomeroomAddTermMark: teacherHomeroomAddTermMarkReducer,
  teacherHomeroomStudentSubjects:
    teacherHomeroomStudentSubjectsReducer,
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
}

const initialState = {
  teacherLogin: {
    teacherInfo: teacherLoggedInInfo,
    homeroomGrade: teacherLoggedInHomeroomGrade,
    subjectList: teacherLoggedInSubjectList,
    token: teacherLoggedInToken,
  },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
