import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  protectHomeroom,
  protectHomeroomStudentID,
} from '../utils/homeroomProtect'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Form } from 'react-bootstrap'
import HeaderBack from '../components/HeaderBack'
import styles from '../css/TeacherAddMarkScreen.module.css'
import {
  addHomeroomTermMark,
  getHomeroomStudentsList,
} from '../actions/teacherActions'
import NotAuthorized from '../components/NotAuthorized'
import { sortStudentInfo } from '../utils/teacherSort'

const TeacherHomeroomAddTermMarkScreen = ({ history, match }) => {
  const dispatch = useDispatch()

  const teacherLogin = useSelector((state) => state.teacherLogin)
  if (!teacherLogin.teacherInfo) {
    history.push('/')
  }

  const { homeroomGrade } = teacherLogin
  var authorized = protectHomeroom(homeroomGrade)

  // term state
  const [term, setTerm] = useState(1)

  // student info
  const teacherHomeroomStudents = useSelector(
    (state) => state.teacherHomeroomStudents
  )
  const { homeroomStudentsList } = teacherHomeroomStudents

  // student Info
  var studentInfo = sortStudentInfo(
    homeroomStudentsList,
    homeroomStudentsList,
    match.params.studentID
  )

  // student authorized
  if (homeroomStudentsList.length !== 0) {
    var studentAuthorized = protectHomeroomStudentID(
      match.params.studentID,
      homeroomStudentsList
    )
  }

  // add term mark
  const teacherHomeroomAddTermMark = useSelector(
    (state) => state.teacherHomeroomAddTermMark
  )

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(addHomeroomTermMark(match.params.studentID, term))
  }

  useEffect(() => {
    if (authorized) {
      if (Object.entries(teacherHomeroomAddTermMark.termMark).length !== 0) {
        history.push(`/diriginte/${match.params.studentID}`)
      }
    }
  }, [
    dispatch,
    authorized,
    teacherHomeroomAddTermMark.termMark,
    match.params.studentID,
    history,
  ])

  useEffect(() => {
    if (homeroomStudentsList.length === 0) {
      dispatch(getHomeroomStudentsList())
    }
  }, [dispatch, homeroomStudentsList.length, authorized])

  const titleCondition = studentAuthorized

  if (authorized && studentAuthorized) {
    return (
      <>
        <HeaderBack backTo={`/diriginte/${match.params.studentID}`}>
          {titleCondition && (
            <>
              {studentInfo.lastName} {studentInfo.firstName} - Medie semestriala
            </>
          )}
        </HeaderBack>
        <div className='header-margin-bottom'></div>
        <div className='main-container'>
          <div className={styles.title}>
            <span>Adaugă medie semestrială</span>
          </div>

          {teacherHomeroomAddTermMark.loading ? (
            <Loader />
          ) : (
            <div className={styles.mainCard}>
              <Form onSubmit={submitHandler}>
                {teacherHomeroomAddTermMark.error && (
                  <Message variant='danger'>
                    {teacherHomeroomAddTermMark.error}
                  </Message>
                )}

                <label htmlFor='term'>Semestrul: </label>
                <select
                  className={styles.selectDate}
                  name='term'
                  value={term}
                  onChange={(e) => {
                    setTerm(e.target.value)
                  }}
                >
                  <option className={styles.selectDateOption} value='1' key='1'>
                    1
                  </option>
                  <option className={styles.selectDateOption} value='2' key='2'>
                    2
                  </option>
                </select>
                <input
                  className={styles.submitButton}
                  type='submit'
                  value='Incheie media semestrială'
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

export default TeacherHomeroomAddTermMarkScreen
