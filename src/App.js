import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import TeacherIndex from './screens/TeacherIndex'
import TeacherHomeScreen from './screens/TeacherHomeScreen'
import TimetableScreen from './screens/TimetableScreen'
import TeacherSubjectScreen from './screens/TeacherSubjectScreen'
import TeacherSubjectStudentScreen from './screens/TeacherSubjectStudentScreen'
import TeacherHomeroomScreen from './screens/TeacherHomeroomScreen'
import TeacherHomeroomStudentScreen from './screens/TeacherHomeroomStudentScreen'
import TeacherHomeroomStudentSubjectScreen from './screens/TeacherHomeroomStudentSubjectScreen'
import TeacherHomeroomMotivateTruancyScreen from './screens/TeacherHomeroomMotivateTruancyScreen'
import TeacherHomeroomAddTermMarkScreen from './screens/TeacherHomeroomAddTermMarkScreen'
import TeacherAddMarkScreen from './screens/TeacherAddMarkScreen'
import TeacherAddTruancyScreen from './screens/TeacherAddTruancyScreen'
import TeacherMotivateTruancyScreen from './screens/TeacherMotivateTruancyScreen'
import TeacherAddAverageMarkScreen from './screens/TeacherAddAverageMarkScreen'

// profile
import ProfileScreen from './screens/ProfileScreen'
import { authURL } from './env'

// teacher update action
import {
  teacherUpdate,
  getStudentsList,
} from './actions/teacherActions'
import TeacherAddFinalMarkScreen from './screens/TeacherAddFinalMarkScreen'
import TeacherHomeroomTimetableScreen from './screens/TeacherHomeroomTimetableScreen'

function App() {
  const dispatch = useDispatch()

  const teacherLogin = useSelector((state) => state.teacherLogin)

  useEffect(() => {
    if (teacherLogin.teacherInfo) {
      dispatch(getStudentsList())
      dispatch(teacherUpdate())
    }
  }, [dispatch, teacherLogin.teacherInfo])

  return (
    <>
      <iframe
        src={`${authURL}/#/auth`}
        frameborder='0'
        width='0'
        height='0'
        title='auth'
      ></iframe>
      <Router>
        {/* teacher */}
        <Route path='/' component={TeacherIndex} exact />
        <Route path='/orar' component={TimetableScreen} exact />

        <Route path='/profesor' component={TeacherHomeScreen} exact />
        <Route
          path='/profesor/:subjectID'
          component={TeacherSubjectScreen}
          exact
        />
        <Route
          path='/profesor/:subjectID/:studentID'
          component={TeacherSubjectStudentScreen}
          exact
        />

        <Route
          path='/profesor/:subjectID/:studentID/nota'
          component={TeacherAddMarkScreen}
          exact
        />
        <Route
          path='/profesor/:subjectID/:studentID/absenta'
          component={TeacherAddTruancyScreen}
          exact
        />
        <Route
          path='/profesor/:subjectID/:studentID/absenta/motivare/:truancyID'
          component={TeacherMotivateTruancyScreen}
          exact
        />
        <Route
          path='/profesor/:subjectID/:studentID/medie/:term'
          component={TeacherAddAverageMarkScreen}
          exact
        />
        <Route
          path='/profesor/:subjectID/:studentID/teza/:term'
          component={TeacherAddFinalMarkScreen}
          exact
        />

        {/* homeroom teacher */}
        <Route
          path='/diriginte'
          component={TeacherHomeroomScreen}
          exact
        />
        <Route
          path='/orar/diriginte'
          component={TeacherHomeroomTimetableScreen}
          exact
        />
        <Route
          path='/diriginte/:studentID'
          component={TeacherHomeroomStudentScreen}
          exact
        />
        <Route
          path='/diriginte/:studentID/0/semestru'
          component={TeacherHomeroomAddTermMarkScreen}
          exact
        />
        <Route
          path='/diriginte/:studentID/:subjectID'
          component={TeacherHomeroomStudentSubjectScreen}
          exact
        />
        <Route
          path='/diriginte/:studentID/:subjectID/absenta/motivare/:truancyID'
          component={TeacherHomeroomMotivateTruancyScreen}
          exact
        />

        {/* profil */}
        <Route path='/profil' component={ProfileScreen} exact />
      </Router>
    </>
  )
}

export default App
