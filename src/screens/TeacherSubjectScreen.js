import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteMarksAndTruancys,
  getAverageMarks,
} from '../actions/teacherActions'

import HeaderBack from '../components/HeaderBack'
import SubjectItem from '../components/SubjectItem'
import { protectTeacher } from '../utils/teacherProtect'
import NotAuthorized from '../components/NotAuthorized'
import {
  sortAverageMarks,
  sortSubjectInfo,
} from '../utils/teacherSort'

const TeacherSubjectScreen = ({ match, location, history }) => {
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

  // subjectStudentsList
  const teacherStudents = useSelector(
    (state) => state.teacherStudents
  )
  const { studentsList } = teacherStudents

  var subjectStudentsList = studentsList[match.params.subjectID]

  // average marks
  const teacherAverageMarks = useSelector(
    (state) => state.teacherAverageMarks
  )
  const { averageMarks } = teacherAverageMarks

  var studentAverageMarks = sortAverageMarks(averageMarks)

  // subjectInfo for title
  var subjectInfo = sortSubjectInfo(
    teacherLogin.subjectList,
    match.params.subjectID
  )

  useEffect(() => {
    if (authorized) {
      dispatch(deleteMarksAndTruancys())
      dispatch(
        getAverageMarks(match.params.subjectID, subjectStudentsList)
      )
    }
  }, [
    dispatch,
    authorized,
    match.params.subjectID,
    subjectStudentsList,
    // Object.keys(studentsList).length,
    // Object.keys(averageMarks).length,
  ])

  if (authorized) {
    return (
      <>
        <HeaderBack backTo='/profesor'>
          {subjectInfo.grade.gradeNumber}
          {subjectInfo.grade.gradeLetter} - {subjectInfo.name}
        </HeaderBack>
        <div className='header-margin-bottom'></div>
        <div className='main-container'>
          {subjectStudentsList && studentAverageMarks && (
            <>
              <div className='list-divider'></div>
              {subjectStudentsList.map((item) => (
                <>
                  {studentAverageMarks[item.studentID] && (
                    <SubjectItem
                      linkTo={`/profesor/${subjectInfo.subjectID}/${item.studentID}`}
                      key={item.studentID}
                      averageMarkTermOne={
                        studentAverageMarks[item.studentID][0]
                      }
                      averageMarkTermTwo={
                        studentAverageMarks[item.studentID][1]
                      }
                    >
                      {item.lastName} {item.firstName}
                    </SubjectItem>
                  )}
                </>
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

export default TeacherSubjectScreen
