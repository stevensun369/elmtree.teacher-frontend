import React, { useEffect } from 'react'
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
  addAverage,
  getSubjectStudentMarksList,
} from '../actions/teacherActions'
import HeaderBack from '../components/HeaderBack'
import styles from '../css/TeacherMotivateTruancyScreen.module.css'
import Loader from '../components/Loader'
import {
  protectTeacher,
  protectTeacherStudentID,
} from '../utils/teacherProtect'
import NotAuthorized from '../components/NotAuthorized'
import {
  sortStudentInfo,
  sortSubjectInfo,
  sortTermMarkValues,
} from '../utils/teacherSort'

const TeacherAddAverageMarkScreen = ({ match, history }) => {
  const dispatch = useDispatch()

  const teacherLogin = useSelector((state) => state.teacherLogin)
  if (!teacherLogin.teacherInfo) {
    history.push('/')
  } else {
    var authorized = protectTeacher(
      match.params.subjectID,
      teacherLogin.subjectList
    )
  }

  // subject Info
  var subjectInfo = sortSubjectInfo(
    teacherLogin.subjectList,
    match.params.subjectID
  )

  // student
  const teacherStudents = useSelector(
    (state) => state.teacherStudents
  )
  const { studentsList } = teacherStudents

  var subjectStudentsList = studentsList[match.params.subjectID]

  var subjectStudentInfo = sortStudentInfo(
    studentsList,
    subjectStudentsList,
    match.params.studentID
  )

  if (studentsList.length !== 0) {
    var studentAuthorized = protectTeacherStudentID(
      match.params.studentID,
      subjectStudentsList
    )
  }

  // add average
  const teacherAddAverage = useSelector(
    (state) => state.teacherAddAverage
  )
  const { average } = teacherAddAverage

  // marks
  const teacherSubjectStudentMarks = useSelector(
    (state) => state.teacherSubjectStudentMarks
  )
  const { subjectStudentMarksList } = teacherSubjectStudentMarks

  // get termMarkValues and averageMarkValue
  var { termMarkValues, averageMarkValue } = sortTermMarkValues(
    subjectStudentMarksList,
    Number(match.params.term)
  )

  // condition
  const titleCondition =
    studentsList.length !== 0 && studentAuthorized

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(
      addAverage(
        match.params.subjectID,
        match.params.studentID,
        match.params.term
      )
    )
  }

  useEffect(() => {
    if (authorized) {
      if (average.averageMarkID) {
        history.push(
          `/profesor/${match.params.subjectID}/${match.params.studentID}`
        )
      }
    }
  }, [
    dispatch,
    match.params.subjectID,
    match.params.studentID,
    average.averageMarkID,
    authorized,
    history,
  ])

  useEffect(() => {
    if (authorized) {
      dispatch(
        getSubjectStudentMarksList(
          match.params.subjectID,
          match.params.studentID
        )
      )
    }
  }, [
    dispatch,
    match.params.subjectID,
    match.params.studentID,
    authorized,
  ])

  if (authorized && studentAuthorized) {
    return (
      <>
        <HeaderBack
          backTo={`/profesor/${match.params.subjectID}/${match.params.studentID}`}
        >
          {titleCondition && (
            <>
              {subjectStudentInfo.lastName}{' '}
              {subjectStudentInfo.firstName} -{' '}
              {subjectInfo.grade.gradeNumber}
              {subjectInfo.grade.gradeLetter} {subjectInfo.name}
            </>
          )}
        </HeaderBack>
        <div className='header-margin-bottom'></div>
        <div className='main-container'>
          {termMarkValues !== 0 && averageMarkValue ? (
            <>
              <div className={styles.title}>
                <span>
                  Incheie media {averageMarkValue} pe semestrul{' '}
                  {match.params.term}
                </span>
              </div>

              {teacherAddAverage.loading ? (
                <Loader />
              ) : (
                <div className={styles.mainCard}>
                  <Form onSubmit={submitHandler}>
                    <input
                      className={styles.submitButton}
                      type='submit'
                      value={`Incheie media ${averageMarkValue}`}
                    />
                  </Form>
                </div>
              )}
            </>
          ) : (
            <></>
          )}
        </div>
      </>
    )
  } else if (!authorized || !studentAuthorized) {
    return <NotAuthorized />
  }
}

export default TeacherAddAverageMarkScreen
