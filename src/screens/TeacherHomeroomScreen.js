import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getHomeroomStudents,
  getHomeroomTermMarks,
} from '../actions/teacherActions'

import HeaderBack from '../components/HeaderBack'
import SubjectItem from '../components/SubjectItem'
import Loader from '../components/Loader'
import Message from '../components/Message'

import NotAuthorized from '../components/NotAuthorized'
import { protectHomeroom } from '../utils/homeroomProtect'

const TeacherHomeroomScreen = ({ history }) => {
  const dispatch = useDispatch()

  const teacherLogin = useSelector((state) => state.teacherLogin)
  if (!teacherLogin.teacherInfo) {
    history.push('/')
  }

  const { homeroomGrade } = teacherLogin
  var authorized = protectHomeroom(homeroomGrade)

  // homeroom students
  const teacherHomeroomStudents = useSelector(
    (state) => state.teacherHomeroomStudents
  )
  const { loading, error, homeroomStudentsList } =
    teacherHomeroomStudents

  var studentsLoaded

  // term marks
  const teacherHomeroomTermMarks = useSelector(
    (state) => state.teacherHomeroomTermMarks
  )
  const { termMarks } = teacherHomeroomTermMarks

  useEffect(() => {
    if (authorized) {
      if (homeroomStudentsList.length === 0) {
        dispatch(getHomeroomStudents())
        studentsLoaded = true
      }
    }
  }, [dispatch, authorized])

  useEffect(() => {
    if (authorized) {
      if (studentsLoaded) {
        dispatch(getHomeroomTermMarks())
      }
    }
  }, [dispatch, studentsLoaded])

  if (authorized) {
    return (
      <>
        <HeaderBack backTo='/profesor'>Dirigenție</HeaderBack>
        <div className='header-margin-bottom'></div>
        <div className='main-container'>
          <div className='list-divider'></div>
          {loading && <Loader />}
          {error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <>
              {homeroomStudentsList.map((item) => (
                <div key={item.studentID}>
                  {termMarks[item.studentID] && (
                    <SubjectItem
                      linkTo={`/diriginte/${item.studentID}`}
                      key={item.studentID}
                      averageMarkTermOne={
                        termMarks[item.studentID][0]
                      }
                      averageMarkTermTwo={
                        termMarks[item.studentID][1]
                      }
                    >{`${item.lastName} ${item.firstName}`}</SubjectItem>
                  )}
                </div>
              ))}
            </>
          )}
        </div>
      </>
    )
  } else if (!authorized) {
    return <NotAuthorized />
  }
}

export default TeacherHomeroomScreen
