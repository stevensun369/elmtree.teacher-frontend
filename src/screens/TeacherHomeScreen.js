import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import HeaderFull from '../components/HeaderFull'
import ListItem from '../components/ListItem'
import Loader from '../components/Loader'

import { protectHomeroom } from '../utils/homeroomProtect'

import styles from '../css/TeacherHomeScreen.module.css'
import { getAverageMarksDelete } from '../actions/teacherActions'

const TeacherHomeScreen = ({ history }) => {
  const dispatch = useDispatch()
  const loading = false

  const teacherLogin = useSelector((state) => state.teacherLogin)
  const { teacherInfo, homeroomGrade, subjectList } = teacherLogin
  const homeroom = protectHomeroom(homeroomGrade)

  // // if user is not logged in
  // if (!teacherLogin.teacherInfo) {
  //   window.history.replace('https://google.com')
  // }

  // this averageMarksDelete makes sense,
  // because when we make request to retrieve averageMarks,
  // we only get averageMarks for the subject chosen
  useEffect(() => {
    dispatch(getAverageMarksDelete())
  }, [dispatch])

  return (
    <>
      {teacherInfo && (
        <>
          <HeaderFull />
          <div className='header-margin-bottom'></div>
          <div className='main-container'>
            {teacherInfo.teacherID && (
              <>
                {homeroom && (
                  <>
                    <Link to='/diriginte'>
                      <div className={styles.toHomeroom}>
                        <span>
                          &gt;&gt; către pagina de dirigenție
                        </span>
                      </div>
                    </Link>
                    <div style={{ marginTop: '2vh' }}></div>
                  </>
                )}
                {loading ? (
                  <Loader />
                ) : (
                  <>
                    <div className='list-divider'></div>

                    {subjectList.map((item) => (
                      <ListItem
                        linkTo={`/profesor/${item.subjectID}`}
                        key={item.subjectID}
                      >{`${item.grade.gradeNumber}${item.grade.gradeLetter} - ${item.name}`}</ListItem>
                    ))}
                  </>
                )}
              </>
            )}
          </div>
        </>
      )}
    </>
  )
}

export default TeacherHomeScreen
