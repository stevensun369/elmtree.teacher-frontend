import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addTruancy } from '../actions/teacherActions'
import HeaderBack from '../components/HeaderBack'
import styles from '../css/TeacherAddTruancyScreen.module.css'
import Loader from '../components/Loader'
import {
  protectTeacher,
  protectTeacherStudentID,
} from '../utils/teacherProtect'
import NotAuthorized from '../components/NotAuthorized'
import {
  sortStudentInfo,
  sortSubjectInfo,
} from '../utils/teacherSort'

const TeacherAddTruancy = ({ match, history }) => {
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

  let currentDate = new Date()
  let currentDateDay = currentDate.getDate()
  let currentDateMonth = currentDate.getMonth()

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

  // subject student list
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

  // truancy info
  const teacherAddTruancy = useSelector(
    (state) => state.teacherAddTruancy
  )

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(
      addTruancy(date, match.params.subjectID, match.params.studentID)
    )
  }

  const dateDays = [...Array(31).keys()]
  const dateMonths = [...Array(12).keys()]

  useEffect(() => {
    if (authorized) {
      if (Object.entries(teacherAddTruancy.addTruancy).length !== 0) {
        history.push(
          `/profesor/${match.params.subjectID}/${match.params.studentID}`
        )
      }
    }
  }, [
    dispatch,
    match.params.subjectID,
    match.params.studentID,
    teacherAddTruancy.addTruancy,
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
            <span>Adaugă o Absență</span>
          </div>

          {teacherAddTruancy.loading ? (
            <Loader />
          ) : (
            <div className={styles.mainCard}>
              <Form onSubmit={submitHandler}>
                <label htmlFor='dateDay'>Ziua absenței: </label>
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

                <label htmlFor='dateMonth'>Luna absenței: </label>
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

                <input
                  className={styles.submitButton}
                  type='submit'
                  value='Adaugă absența'
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

export default TeacherAddTruancy
