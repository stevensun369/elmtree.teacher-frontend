import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import WelcomeScreen from './screens/WelcomeScreen'

// teacher
import TeacherLoginScreen from './screens/TeacherLoginScreen'
import TeacherHomeScreen from './screens/TeacherHomeScreen'
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

// teacher update action
import {
  teacherUpdate,
  getStudentsList,
} from './actions/teacherActions'

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
    <Router>
      {/* teacher */}
      <Route
        path='/conectare/profesor'
        component={TeacherLoginScreen}
        exact
      />
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

      {/* homeroom teacher */}
      <Route
        path='/diriginte'
        component={TeacherHomeroomScreen}
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
  )
}

export default App
