import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addFinalMark } from '../actions/teacherActions'
import HeaderBack from '../components/HeaderBack'
import styles from '../css/TeacherAddMarkScreen.module.css'
import Loader from '../components/Loader'
import Message from '../components/Message'

import {
  protectTeacher,
  protectTeacherStudentID,
} from '../utils/teacherProtect'
import NotAuthorized from '../components/NotAuthorized'
import {
  sortStudentInfo,
  sortSubjectInfo,
} from '../utils/teacherSort'

const TeacherAddFinalMarkScreen = ({ match, history }) => {
  const dispatch = useDispatch()

  // authorization
  const teacherLogin = useSelector((state) => state.teacherLogin)

  if (!teacherLogin.teacherInfo) {
    history.push('/')
  } else {
    var authorized = protectTeacher(
      match.params.subjectID,
      teacherLogin.subjectList
    )
  }

  const [value, setValue] = useState('1')

  // subject Info
  var subjectInfo = sortSubjectInfo(
    teacherLogin.subjectList,
    match.params.subjectID
  )

  // students
  const teacherStudents = useSelector(
    (state) => state.teacherStudents
  )
  const { studentsList } = teacherStudents

  // subject students list
  var subjectStudentsList = studentsList[match.params.subjectID]

  // subject student info
  var subjectStudentInfo = sortStudentInfo(
    studentsList,
    subjectStudentsList,
    match.params.studentID
  )

  // student authorized
  if (studentsList.length !== 0) {
    var studentAuthorized = protectTeacherStudentID(
      match.params.studentID,
      subjectStudentsList
    )
  }

  // condition
  const titleCondition =
    studentsList.length !== 0 && studentAuthorized

  // mark info
  const teacherAddFinalMark = useSelector(
    (state) => state.teacherAddFinalMark
  )

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(
      addFinalMark(
        value,
        match.params.subjectID,
        match.params.studentID,
        match.params.term
      )
    )
  }

  useEffect(() => {
    if (authorized) {
      if (teacherAddFinalMark.flag) {
        history.push(
          `/profesor/${match.params.subjectID}/${match.params.studentID}`
        )
      }
    }
  }, [
    dispatch,
    match.params.subjectID,
    match.params.studentID,
    teacherAddFinalMark.flag,
    authorized,
    history,
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
          <div className={styles.title}>
            <span>Adaugă o nota de teză</span>
          </div>

          {teacherAddFinalMark.loading ? (
            <Loader />
          ) : (
            <div className={styles.mainCard}>
              <Form onSubmit={submitHandler}>
                {teacherAddFinalMark.error && (
                  <Message variant='danger'>
                    {teacherAddFinalMark.error}
                  </Message>
                )}
                <input
                  type='number'
                  className={styles.inputValue}
                  name='value'
                  placeholder='Valoarea notei'
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value)
                  }}
                />
                {value !== '' && value < 1 && (
                  <Message variant='danger'>
                    Valoarea notei este prea mica
                  </Message>
                )}
                {value > 10 && (
                  <Message variant='danger'>
                    Valoarea notei este prea mare
                  </Message>
                )}
                <input
                  className={styles.submitButton}
                  type='submit'
                  value='Adaugă nota de teză'
                  disabled={
                    Number(value) > 10 ||
                    Number(value) < 1 ||
                    value === ''
                  }
                />
              </Form>
            </div>
          )}
        </div>
      </>
    )
  } else if (!authorized || !studentAuthorized) {
    return <NotAuthorized />
  }
}

export default TeacherAddFinalMarkScreen
