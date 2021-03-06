import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getSubjectStudentMarksList,
  getSubjectStudentTruancysList,
  getHomeroomStudents,
  motivateTruancyDelete,
  getHomeroomAverageMarks,
  getFinalMarks,
} from '../actions/teacherActions'
import HeaderBack from '../components/HeaderBack'
import Mark from '../components/Mark'
import Loader from '../components/Loader'
import NotAuthorized from '../components/NotAuthorized'
import FinalMarkRead from '../components/FinalMarkRead'
import {
  protectHomeroom,
  protectHomeroomStudentID,
  protectHomeroomSubjectID,
} from '../utils/homeroomProtect'

import { Col } from 'react-bootstrap'
import MarksTitle from '../components/MarksTitle'
import TruancysTitle from '../components/TruancysTitle'

import TeacherSubjectStudentTruancy from '../components/TruancyModifiable'

import styles from '../css/TeacherSubjectStudentScreen.module.css'
import {
  sortAverageMarksByTerm,
  sortMarksByTerm,
  sortStudentInfo,
  sortSubjectInfo,
  sortTruancysByTerm,
} from '../utils/teacherSort'

const TeacherHomeroomStudentSubjectScreen = ({ match, history }) => {
  const dispatch = useDispatch()

  const teacherLogin = useSelector((state) => state.teacherLogin)
  if (!teacherLogin.teacherInfo) {
    history.push('/')
  }

  // homeroom grade
  const { homeroomGrade } = teacherLogin
  var authorized = protectHomeroom(homeroomGrade)

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

  // student info
  const teacherHomeroomStudents = useSelector(
    (state) => state.teacherHomeroomStudents
  )
  const { homeroomStudentsList } = teacherHomeroomStudents

  // final marks
  const teacherFinalMarks = useSelector(
    (state) => state.teacherFinalMarks
  )
  const { finalMarks } = teacherFinalMarks

  var subjectStudentInfo = sortStudentInfo(
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

  // new teacher homeroom student subjects
  if (homeroomStudentsList.length !== 0) {
    var homeroomStudentSubjectsList = subjectStudentInfo.subjectList
  }

  // subject Info
  var subjectInfo = sortSubjectInfo(
    homeroomStudentSubjectsList,
    match.params.subjectID
  )

  var subjectAuthorized = protectHomeroomSubjectID(
    match.params.subjectID,
    homeroomStudentSubjectsList
  )

  // average marks
  const teacherHomeroomAverageMarks = useSelector(
    (state) => state.teacherHomeroomAverageMarks
  )
  const { averageMarks } = teacherHomeroomAverageMarks

  var subjectAverageMarks = {}

  if (Object.keys(averageMarks).length !== 0) {
    subjectAverageMarks =
      averageMarks[match.params.studentID][match.params.subjectID]
  }

  var loadingCondition, titleCondition

  const teacherMotivateTruancy = useSelector(
    (state) => state.teacherMotivateTruancy
  )

  console.log(
    Object.keys(teacherMotivateTruancy.motivateTruancy).length
  )

  if (authorized && studentAuthorized && subjectAuthorized) {
    // average marks
    var { averageMarkTermOne, averageMarkTermTwo } =
      sortAverageMarksByTerm(subjectAverageMarks)

    // marks by term
    var { marksTermOne, marksTermTwo } = sortMarksByTerm(
      subjectStudentMarksList
    )

    // truancys by term
    var { truancysTermOne, truancysTermTwo } = sortTruancysByTerm(
      subjectStudentTruancysList
    )

    // conditions
    loadingCondition =
      teacherSubjectStudentMarks.loading &&
      teacherSubjectStudentTruancys.loading
    titleCondition = homeroomStudentsList.length !== 0
  }

  useEffect(() => {
    if (authorized) {
      dispatch(motivateTruancyDelete())

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

  useEffect(() => {
    if (homeroomStudentsList.length === 0) {
      dispatch(getHomeroomStudents())
    }

    if (
      homeroomStudentsList.length !== 0 &&
      Object.keys(averageMarks).length === 0
    ) {
      dispatch(getHomeroomAverageMarks())
    }
  }, [
    dispatch,
    homeroomStudentsList.length,
    authorized,
    averageMarks,
  ])

  if (authorized && studentAuthorized && subjectAuthorized) {
    return (
      <>
        <HeaderBack backTo={`/diriginte/${match.params.studentID}`}>
          {titleCondition && (
            <>
              {subjectStudentInfo.lastName}{' '}
              {subjectStudentInfo.firstName} - {subjectInfo.name}
            </>
          )}
        </HeaderBack>
        <div className='header-margin-bottom'></div>
        <div className='main-container'>
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
                  toAverageMark=''
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
                      <FinalMarkRead
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
                      <TeacherSubjectStudentTruancy
                        dateDay={item.dateDay}
                        dateMonth={item.dateMonth}
                        key={item.truancyID}
                        motivated={item.motivated}
                        motivateLinkTo={`/diriginte/${match.params.studentID}/${match.params.subjectID}/absenta/motivare/${item.truancyID}`}
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
                  toAverageMark=''
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
                      <FinalMarkRead
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

                <TruancysTitle>Absen??e - Semestrul II</TruancysTitle>
                {truancysTermTwo.length > 0 ? (
                  <>
                    {truancysTermTwo.map((item) => (
                      <TeacherSubjectStudentTruancy
                        dateDay={item.dateDay}
                        dateMonth={item.dateMonth}
                        key={item.truancyID}
                        motivated={item.motivated}
                        motivateLinkTo={`/diriginte/${match.params.studentID}/${match.params.subjectID}/absenta/motivare/${item.truancyID}`}
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
  } else if (
    !authorized ||
    !studentAuthorized ||
    !subjectAuthorized
  ) {
    return <NotAuthorized />
  }
}

export default TeacherHomeroomStudentSubjectScreen
