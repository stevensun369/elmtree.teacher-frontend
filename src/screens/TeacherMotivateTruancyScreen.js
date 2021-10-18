import React, { useEffect } from 'react'
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
  motivateTruancy,
  getSubjectStudentTruancysList,
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
  sortTruancyInfo,
} from '../utils/teacherSort'

const TeacherMotivateTruancyScreen = ({ match, history }) => {
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

  // teacher truancys
  const teacherSubjectStudentTruancys = useSelector(
    (state) => state.teacherSubjectStudentTruancys
  )
  const { subjectStudentTruancysList } = teacherSubjectStudentTruancys

  // truancy info
  var truancyInfo = sortTruancyInfo(
    subjectStudentTruancysList,
    match.params.truancyID
  )

  // conditions
  const truancyCondition = subjectStudentTruancysList.length !== 0
  const titleCondition =
    studentsList.length !== 0 && studentAuthorized

  const teacherMotivateTruancy = useSelector(
    (state) => state.teacherMotivateTruancy
  )

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(motivateTruancy(match.params.truancyID))
  }

  useEffect(() => {
    if (authorized) {
      if (
        Object.entries(teacherMotivateTruancy.motivateTruancy)
          .length !== 0
      ) {
        history.push(
          `/profesor/${match.params.subjectID}/${match.params.studentID}`
        )
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
    teacherMotivateTruancy.motivateTruancy,
    subjectStudentTruancysList.length,
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
            {truancyCondition && (
              <span>
                Motivează absența de pe data de {truancyInfo.dateDay}.
                {truancyInfo.dateMonth}
              </span>
            )}
          </div>
          {/* value : {value} on date {dateDay} - {dateMonth} =&gt; {date} */}

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
  } else if (!authorized || !studentAuthorized) {
    return <NotAuthorized />
  }
}

export default TeacherMotivateTruancyScreen
