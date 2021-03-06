import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getSubjectStudentMarksList,
  getSubjectStudentTruancysList,
  addMarkDelete,
  addTruancyDelete,
  motivateTruancyDelete,
  addAverageDelete,
  getAverageMarks,
  getFinalMarks,
  addFinalMarkDelete,
} from '../actions/teacherActions'
import HeaderBack from '../components/HeaderBack'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import {
  protectTeacher,
  protectTeacherStudentID,
} from '../utils/teacherProtect'
import NotAuthorized from '../components/NotAuthorized'
import { Col } from 'react-bootstrap'

import Mark from '../components/Mark'
import TruancyModifiable from '../components/TruancyModifiable'
import MarksTitle from '../components/MarksTitle'
import TruancysTitle from '../components/TruancysTitle'
import FinalMark from '../components/FinalMark'

import styles from '../css/TeacherSubjectStudentScreen.module.css'
import {
  sortStudentInfo,
  sortSubjectInfo,
  sortMarksByTerm,
  sortTruancysByTerm,
  sortAverageMarksByTerm,
} from '../utils/teacherSort'

const TeacherSubjectStudentScreen = ({ match, history }) => {
  const dispatch = useDispatch()

  const teacherLogin = useSelector((state) => state.teacherLogin)

  // if user not logged in
  if (!teacherLogin.teacherInfo) {
    history.push('/')
  } else {
    var authorized = protectTeacher(
      match.params.subjectID,
      teacherLogin.subjectList
    )
  }

  // get average marks
  const teacherAverageMarks = useSelector(
    (state) => state.teacherAverageMarks
  )
  const { averageMarks } = teacherAverageMarks

  const studentAverageMarks = averageMarks[match.params.studentID]

  // teacher subject student marks
  const teacherSubjectStudentMarks = useSelector(
    (state) => state.teacherSubjectStudentMarks
  )
  const { subjectStudentMarksList } = teacherSubjectStudentMarks

  // teacher subject student truancys
  const teacherSubjectStudentTruancys = useSelector(
    (state) => state.teacherSubjectStudentTruancys
  )
  const { subjectStudentTruancysList } = teacherSubjectStudentTruancys

  // subject Info
  var subjectInfo = sortSubjectInfo(
    teacherLogin.subjectList,
    match.params.subjectID
  )

  // finalmarks
  const teacherFinalMarks = useSelector(
    (state) => state.teacherFinalMarks
  )
  const { finalMarks } = teacherFinalMarks

  // new student Info
  const teacherStudents = useSelector(
    (state) => state.teacherStudents
  )
  const { studentsList } = teacherStudents

  const subjectStudentsList = studentsList[match.params.subjectID]

  // subjectStudentInfo
  const subjectStudentInfo = sortStudentInfo(
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

  var loadingCondition, titleCondition

  if (authorized) {
    // get average marks by term
    var { averageMarkTermOne, averageMarkTermTwo } =
      sortAverageMarksByTerm(studentAverageMarks)

    // get marks by term
    var { marksTermOne, marksTermTwo } = sortMarksByTerm(
      subjectStudentMarksList
    )

    // get truancys by term
    var { truancysTermOne, truancysTermTwo } = sortTruancysByTerm(
      subjectStudentTruancysList
    )

    // conditions
    loadingCondition =
      teacherSubjectStudentMarks.loading &&
      teacherSubjectStudentTruancys.loading
    titleCondition = studentsList.length !== 0 && studentAuthorized
  }

  const toAverageMarkTermOne =
    marksTermOne.length < 2
      ? ''
      : `/profesor/${match.params.subjectID}/${match.params.studentID}/medie/1`
  const toAverageMarkTermTwo =
    marksTermTwo.length < 2
      ? ''
      : `/profesor/${match.params.subjectID}/${match.params.studentID}/medie/2`

  useEffect(() => {
    if (authorized && Object.keys(studentsList).length !== 0) {
      dispatch(
        getAverageMarks(match.params.subjectID, subjectStudentsList)
      )
    }
  }, [
    dispatch,
    match.params.subjectID,
    subjectStudentsList,
    studentsList,
    authorized,
  ])

  useEffect(() => {
    if (authorized) {
      dispatch(addMarkDelete())
      dispatch(addTruancyDelete())
      dispatch(motivateTruancyDelete())
      dispatch(addAverageDelete())
      dispatch(addFinalMarkDelete())

      dispatch(
        getSubjectStudentMarksList(
          match.params.subjectID,
          match.params.studentID
        )
      )

      dispatch(
        getSubjectStudentTruancysList(
          match.params.subjectID,
          match.params.studentID
        )
      )
      dispatch(
        getFinalMarks(match.params.subjectID, match.params.studentID)
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
        <HeaderBack backTo={`/profesor/${match.params.subjectID}`}>
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
          <div className={styles.addContainer}>
            <Link
              to={`/profesor/${match.params.subjectID}/${match.params.studentID}/nota`}
            >
              <div className={styles.add}>
                <span>Adaug?? Not??</span>
              </div>
            </Link>

            <Link
              to={`/profesor/${match.params.subjectID}/${match.params.studentID}/absenta`}
            >
              <div className={styles.add}>
                <span>Adaug?? Absen????</span>
              </div>
            </Link>
          </div>

          {loadingCondition ? (
            <Loader />
          ) : (
            <>
              <Col
                xl={6}
                lg={6}
                md={12}
                sm={12}
                xs={12}
                style={{
                  float: 'left',
                  display: 'inline-block',
                  marginBottom: '2vh',
                }}
              >
                <MarksTitle
                  toAverageMark={toAverageMarkTermOne}
                  averageMark={averageMarkTermOne.value}
                >
                  Note - Semestrul I
                </MarksTitle>
                {marksTermOne.length > 0 ? (
                  <>
                    {marksTermOne.map((item) => (
                      <Mark
                        dateDay={item.dateDay}
                        dateMonth={item.dateMonth}
                        key={item.markID}
                      >
                        {item.value}
                      </Mark>
                    ))}

                    {finalMarks[1] && (
                      <FinalMark
                        subjectID={match.params.subjectID}
                        studentID={match.params.studentID}
                        term='1'
                        finalMarks={finalMarks}
                      />
                    )}
                  </>
                ) : (
                  <span className={styles.notExist}>
                    Nu exist?? note inc??
                  </span>
                )}

                <br></br>

                <TruancysTitle>Absen??e - Semestrul I</TruancysTitle>
                {truancysTermOne.length > 0 ? (
                  <>
                    {truancysTermOne.map((item) => (
                      <TruancyModifiable
                        dateDay={item.dateDay}
                        dateMonth={item.dateMonth}
                        motivated={item.motivated}
                        key={item.truancyID}
                        motivateLinkTo={`/profesor/${match.params.subjectID}/${match.params.studentID}/absenta/motivare/${item.truancyID}`}
                      />
                    ))}
                  </>
                ) : (
                  <span className={styles.notExist}>
                    Nu exist?? absen??e inc??
                  </span>
                )}
              </Col>

              <Col
                xl={6}
                lg={6}
                md={12}
                sm={12}
                xs={12}
                style={{
                  float: 'left',
                  display: 'inline-block',
                  marginBottom: '2vh',
                }}
              >
                <MarksTitle
                  toAverageMark={toAverageMarkTermTwo}
                  averageMark={averageMarkTermTwo.value}
                >
                  Note - Semestrul II
                </MarksTitle>
                {marksTermTwo.length > 0 ? (
                  <>
                    {marksTermTwo.map((item) => (
                      <Mark
                        dateDay={item.dateDay}
                        dateMonth={item.dateMonth}
                        key={item.markID}
                      >
                        {item.value}
                      </Mark>
                    ))}

                    {finalMarks[2] && (
                      <FinalMark
                        subjectID={match.params.subjectID}
                        studentID={match.params.studentID}
                        term='2'
                        finalMarks={finalMarks}
                      />
                    )}
                  </>
                ) : (
                  <span className={styles.notExist}>
                    Nu exist?? note inc??
                  </span>
                )}
                <br></br>

                <TruancysTitle>Absen??e - Semestrul II</TruancysTitle>
                {truancysTermTwo.length > 0 ? (
                  <>
                    {truancysTermTwo.map((item) => (
                      <TruancyModifiable
                        dateDay={item.dateDay}
                        dateMonth={item.dateMonth}
                        motivated={item.motivated}
                        key={item.truancyID}
                        motivateLinkTo={`/profesor/${match.params.subjectID}/${match.params.studentID}/absenta/motivare/${item.truancyID}`}
                      />
                    ))}
                  </>
                ) : (
                  <span className={styles.notExist}>
                    Nu exist?? absen??e inc??
                  </span>
                )}
              </Col>
            </>
          )}
        </div>
      </>
    )
  } else if (!authorized || !studentAuthorized) {
    return <NotAuthorized />
  }
}

export default TeacherSubjectStudentScreen
