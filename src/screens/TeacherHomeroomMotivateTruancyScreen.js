import React, { useEffect } from 'react'
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
  getHomeroomStudents,
  getHomeroomStudentSubjectsList,
  getSubjectStudentTruancysList,
  motivateTruancy,
} from '../actions/teacherActions'
import HeaderBack from '../components/HeaderBack'
import styles from '../css/TeacherHomeroomMotivateTruancyScreen.module.css'
import Loader from '../components/Loader'
import {
  protectHomeroom,
  protectHomeroomStudentID,
  protectHomeroomSubjectID,
} from '../utils/homeroomProtect'
import NotAuthorized from '../components/NotAuthorized'
import {
  sortStudentInfo,
  sortSubjectInfo,
  sortTruancyInfo,
} from '../utils/teacherSort'

const TeacherHomeroomMotivateTruancy = ({ match, history }) => {
  const dispatch = useDispatch()

  const teacherLogin = useSelector((state) => state.teacherLogin)
  if (!teacherLogin.teacherInfo) {
    history.push('/')
  }

  const { homeroomGrade } = teacherLogin
  var authorized = protectHomeroom(homeroomGrade)

  // homeroom student subjects
  const teacherHomeroomStudentSubjects = useSelector(
    (state) => state.teacherHomeroomStudentSubjects
  )
  const { homeroomStudentSubjectsList } =
    teacherHomeroomStudentSubjects

  // subject info
  var subjectInfo = sortSubjectInfo(
    homeroomStudentSubjectsList,
    match.params.subjectID
  )

  // subject authorized
  for (var subject in homeroomStudentSubjectsList) {
    var subjectAuthorized = protectHomeroomSubjectID(
      match.params.subjectID,
      homeroomStudentSubjectsList
    )
  }

  // homeroom students
  const teacherHomeroomStudents = useSelector(
    (state) => state.teacherHomeroomStudents
  )
  const { homeroomStudentsList } = teacherHomeroomStudents

  // student info
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

  // truancy info
  const teacherSubjectStudentTruancys = useSelector(
    (state) => state.teacherSubjectStudentTruancys
  )
  const { subjectStudentTruancysList } = teacherSubjectStudentTruancys

  var truancyInfo = sortTruancyInfo(
    subjectStudentTruancysList,
    match.params.truancyID
  )

  // conditions
  const truancyCondition = subjectStudentTruancysList.length !== 0
  const titleCondition =
    homeroomStudentsList.length !== 0 &&
    homeroomStudentSubjectsList.length !== 0

  // motivate truancy
  const teacherMotivateTruancy = useSelector(
    (state) => state.teacherMotivateTruancy
  )

  console.log(
    Object.keys(teacherMotivateTruancy.motivateTruancy).length !== 0
  )

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(motivateTruancy(match.params.truancyID))
  }

  useEffect(() => {
    if (authorized) {
      // if (Object.keys(teacherMotivateTruancy.motivateTruancy).length !== 0) {
      //   history.push(
      //     `/diriginte/${match.params.studentID}/${match.params.subjectID}`
      //   )
      // }

      if (homeroomStudentSubjectsList.length === 0) {
        dispatch(
          getHomeroomStudentSubjectsList(match.params.studentID)
        )
      }

      if (homeroomStudentsList.length === 0) {
        dispatch(getHomeroomStudents())
      }

      if (subjectStudentTruancysList.length === 0) {
        dispatch(
          getSubjectStudentTruancysList(
            match.params.subjectID,
            match.params.studentID
          )
        )
      }
    }
  }, [
    dispatch,
    match.params.subjectID,
    match.params.studentID,
    match.params.truancyID,
    history,
    authorized,
  ])

  useEffect(() => {
    if (
      Object.keys(teacherMotivateTruancy.motivateTruancy).length !== 0
    ) {
      history.push(
        `/diriginte/${match.params.studentID}/${match.params.subjectID}`
      )
    }
  }, [Object.keys(teacherMotivateTruancy.motivateTruancy).length])

  if (authorized && studentAuthorized && subjectAuthorized) {
    return (
      <>
        <HeaderBack
          backTo={`/diriginte/${match.params.studentID}/${match.params.subjectID}`}
        >
          {titleCondition && (
            <>
              {studentInfo.lastName} {studentInfo.firstName} -{' '}
              {subjectInfo.name}
            </>
          )}
        </HeaderBack>
        <div className='header-margin-bottom'></div>
        <div className='main-container'>
          <div className={styles.title}>
            {truancyCondition && (
              <span>
                Motivează absența de pe data de {truancyInfo.dateDay}.
                {truancyInfo.dateMonth}
              </span>
            )}
          </div>

          {teacherMotivateTruancy.loading ? (
            <Loader />
          ) : (
            <div className={styles.mainCard}>
              <Form onSubmit={submitHandler}>
                <input
                  className={styles.submitButton}
                  type='submit'
                  value='Motivează absența'
                />
              </Form>
            </div>
          )}
        </div>
      </>
    )
  } else if (
    !authorized ||
    !studentAuthorized ||
    !subjectAuthorized
  ) {
    return <NotAuthorized />
  }
}

export default TeacherHomeroomMotivateTruancy
