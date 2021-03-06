import { createStore, combineReducers, applyMiddleware } from 'redux'

import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { authURL } from './env'

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
  teacherTimetableReducer,
  teacherSchoolReducer,
  teacherFinalMarksReducer,
  teacherAddFinalMarkReducer,
  teacherHomeroomTimetableReducer,
  teacherHomeroomTimetableTeachersReducer,
} from './reducers/teacherReducers'

// trying the post message thingie

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
  teacherFinalMarks: teacherFinalMarksReducer,
  teacherAddFinalMark: teacherAddFinalMarkReducer,

  // homeroom teacher reducers
  teacherHomeroomStudents: teacherHomeroomStudentsReducer,
  teacherHomeroomAverageMarks: teacherHomeroomAverageMarksReducer,
  teacherHomeroomTermMarks: teacherHomeroomTermMarksReducer,
  teacherHomeroomAddTermMark: teacherHomeroomAddTermMarkReducer,
  teacherHomeroomStudentSubjects:
    teacherHomeroomStudentSubjectsReducer,
  teacherHomeroomTimetable: teacherHomeroomTimetableReducer,
  teacherHomeroomTimetableTeachers:
    teacherHomeroomTimetableTeachersReducer,

  teacherTimetable: teacherTimetableReducer,
  teacherSchool: teacherSchoolReducer,
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
    email: teacherLoggedIn.email,
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

window.onload = () => {
  var iframe = document.getElementsByTagName('iframe')[0]
  var win
  try {
    win = iframe.contentWindow
  } catch (e) {
    win = iframe.contentWindow
  }
  win.postMessage('', '*')
  let requestData
  window.onmessage = (e) => {
    requestData = e.data
    console.log(requestData.userType)

    if (requestData.userType !== 'teacher' && requestData.userType) {
      window.location.replace(authURL + '/#/')
    }

    var teacherID = localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo')).teacherID
      : null

    if (teacherID !== JSON.parse(requestData.userInfo).teacherID) {
      localStorage.setItem('userType', requestData.userType)
      localStorage.setItem('userInfo', requestData.userInfo)
      store.dispatch({
        type: 'TEACHER_READ_LS',
        payload: JSON.parse(requestData.userInfo),
      })
    }
  }
}

export default store
