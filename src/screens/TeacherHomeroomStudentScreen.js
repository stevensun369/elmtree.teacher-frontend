import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import HeaderBack from '../components/HeaderBack'
import SubjectItem from '../components/SubjectItem'

import NotAuthorized from '../components/NotAuthorized'
import {
  protectHomeroom,
  protectHomeroomStudentID,
} from '../utils/homeroomProtect'
import {
  addHomeroomTermMarkDelete,
  getHomeroomAverageMarks,
  getHomeroomStudentsList,
  getHomeroomTermMarks,
} from '../actions/teacherActions'
import { Link } from 'react-router-dom'
import styles from '../css/TeacherHomeroomStudentScreen.module.css'
import { sortAverageMarks, sortStudentInfo } from '../utils/teacherSort'

const TeacherHomeroomStudentScreen = ({ match, history }) => {
  const dispatch = useDispatch()

  const teacherLogin = useSelector((state) => state.teacherLogin)
  if (!teacherLogin.teacherInfo) {
    history.push('/')
  }

  const { homeroomGrade } = teacherLogin
  var authorized = protectHomeroom(homeroomGrade)

  // student info
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

  // homeroom student subjects list
  if (homeroomStudentsList.length !== 0) {
    var homeroomStudentSubjectsList = studentInfo.subjectList
  }

  // average marks
  const teacherHomeroomGetAverage = useSelector(
    (state) => state.teacherHomeroomGetAverage
  )
  const { averageMarks } = teacherHomeroomGetAverage

  const studentAverageMarks = averageMarks[match.params.studentID]
  var subjectAverageMarks = sortAverageMarks(studentAverageMarks)

  // term marks
  const teacherHomeroomGetTermMarks = useSelector(
    (state) => state.teacherHomeroomGetTermMarks
  )
  const { termMarks } = teacherHomeroomGetTermMarks

  // the two term marks by term
  if (Object.keys(termMarks).length !== 0) {
    var termMarkTermOne = termMarks[match.params.studentID][0]
    var termMarkTermTwo = termMarks[match.params.studentID][1]
  }

  const titleCondition = homeroomStudentsList.length !== 0 && studentAuthorized

  useEffect(() => {
    if (authorized) {
      dispatch(addHomeroomTermMarkDelete())
      if (homeroomStudentsList.length === 0) {
        dispatch(getHomeroomStudentsList())
      }

      if (homeroomStudentsList.length !== 0) {
        dispatch(getHomeroomAverageMarks())
        dispatch(getHomeroomTermMarks())
      }
    }
  }, [dispatch, authorized, homeroomStudentsList.length])

  if (authorized && studentAuthorized) {
    return (
      <>
        <HeaderBack backTo='/diriginte'>
          {titleCondition && (
            <>
              {studentInfo.lastName} {studentInfo.firstName}
            </>
          )}
        </HeaderBack>
        <div className='header-margin-bottom'></div>
        <div className='main-container'>
          <span className={styles.termMarksTitle}>Mediile Semestriale:</span>
          <div className={styles.termMarks}>
            <div className={styles.termMarksTermContainer}>
              <div className={styles.termMarksTerm}>
                <div className={styles.termMarksTermSpan}>Sem. I:</div>
                <div className={styles.termMark}>
                  <span className={styles.termMarkSpan}>
                    {termMarkTermOne !== 0 && termMarkTermOne ? (
                      <>{termMarkTermOne}</>
                    ) : (
                      <>-</>
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.termMarksTermContainer}>
              <div className={styles.termMarksTerm}>
                <div className={styles.termMarksTermSpan}>Sem. II:</div>
                <div className={styles.termMark}>
                  <span className={styles.termMarkSpan}>
                    {termMarkTermTwo !== 0 && termMarkTermTwo ? (
                      <>{termMarkTermTwo}</>
                    ) : (
                      <>-</>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <Link to={`/diriginte/${match.params.studentID}/0/semestru`}>
            <div className={styles.toAddTermMark}>
              <span className={styles.toAddTermMarkSpan}>
                Incheie media semestrială
              </span>
            </div>
          </Link>

          <div className='list-divider'></div>

          {homeroomStudentSubjectsList.map((item) => (
            <div key={item.subjectID}>
              {subjectAverageMarks[item.subjectID] && (
                <SubjectItem
                  key={item.subjectID}
                  linkTo={`/diriginte/${match.params.studentID}/${item.subjectID}`}
                  averageMarkTermOne={subjectAverageMarks[item.subjectID][0]}
                  averageMarkTermTwo={subjectAverageMarks[item.subjectID][1]}
                >{`${item.name}`}</SubjectItem>
              )}
            </div>
          ))}
        </div>
      </>
    )
  } else if (!authorized || !studentAuthorized) {
    return <NotAuthorized />
  }
}

export default TeacherHomeroomStudentScreen
