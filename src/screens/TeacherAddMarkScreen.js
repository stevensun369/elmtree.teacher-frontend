import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addMark } from '../actions/teacherActions'
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

const TeacherAddMarkScreen = ({ match, history }) => {
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

  let currentDate = new Date()
  let currentDateDay = currentDate.getDate()
  let currentDateMonth = currentDate.getMonth()

  const [value, setValue] = useState('1')
  const [dateDay, setDateDay] = useState(
    ('0' + currentDateDay).slice(-2)
  )
  const [dateMonth, setDateMonth] = useState(
    ('0' + (currentDateMonth + 1)).slice(-2)
  )
  const [date, setDate] = useState(`${dateDay}.${dateMonth}`)

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
  const teacherAddMark = useSelector((state) => state.teacherAddMark)

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(
      addMark(
        value,
        date,
        match.params.subjectID,
        match.params.studentID
      )
    )
  }

  const dateDays = [...Array(31).keys()]
  const dateMonths = [...Array(12).keys()]

  useEffect(() => {
    if (authorized) {
      if (Object.entries(teacherAddMark.addMark).length !== 0) {
        history.push(
          `/profesor/${match.params.subjectID}/${match.params.studentID}`
        )
      }
    }
  }, [
    dispatch,
    match.params.subjectID,
    match.params.studentID,
    teacherAddMark.addMark,
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
            <span>Adaug?? o Not??</span>
          </div>

          {teacherAddMark.loading ? (
            <Loader />
          ) : (
            <div className={styles.mainCard}>
              <Form onSubmit={submitHandler}>
                {teacherAddMark.error && (
                  <Message variant='danger'>
                    {teacherAddMark.error}
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
                <label htmlFor='dateDay'>Ziua notei: </label>
                <select
                  className={styles.selectDate}
                  name='dateDay'
                  value={dateDay}
                  onChange={(e) => {
                    setDateDay(e.target.value)
                    setDate(`${e.target.value}.${dateMonth}`)
                  }}
                >
                  {dateDays.map((item) => (
                    <option
                      className={styles.selectDateOption}
                      value={('0' + (item + 1)).slice(-2)}
                      key={('0' + (item + 1)).slice(-2)}
                    >
                      {('0' + (item + 1)).slice(-2)}
                    </option>
                  ))}
                </select>
                <br />
                <br />
                <label htmlFor='dateMonth'>Luna notei: </label>
                <select
                  className={styles.selectDate}
                  name='dateMonth'
                  value={dateMonth}
                  onChange={(e) => {
                    setDateMonth(e.target.value)
                    setDate(`${dateDay}.${e.target.value}`)
                  }}
                >
                  {dateMonths.map((item) => (
                    <option
                      className={styles.selectDateOption}
                      value={('0' + (item + 1)).slice(-2)}
                      key={('0' + (item + 1)).slice(-2)}
                    >
                      {('0' + (item + 1)).slice(-2)}
                    </option>
                  ))}
                </select>
                <br />
                <br />

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
                  value='Adaug?? nota'
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

export default TeacherAddMarkScreen
