import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { Form } from 'react-bootstrap'

import HeaderBack from '../components/HeaderBack'

import { teacherLogout } from '../actions/teacherActions'
import { studentLogout } from '../actions/studentActions'
import {
  addStudentDelete,
  parentLogout,
} from '../actions/parentActions'

import styles from '../css/ProfileScreen.module.css'

const ProfileScreen = ({ history }) => {
  const dispatch = useDispatch()

  // teacher
  const teacherLogin = useSelector((state) => state.teacherLogin)
  const { teacherInfo } = teacherLogin

  // student
  const studentLogin = useSelector((state) => state.studentLogin)
  const { studentInfo } = studentLogin

  // parent
  const parentLogin = useSelector((state) => state.parentLogin)
  const { parentInfo } = parentLogin

  if (!teacherInfo && !studentInfo && !parentInfo) {
    history.push('/')
  }
  const submitHandler = (e) => {
    e.preventDefault()

    // teacher
    if (teacherInfo) {
      dispatch(teacherLogout())
    }

    // student
    if (studentInfo) {
      dispatch(studentLogout())
    }

    // parent
    if (parentInfo) {
      dispatch(parentLogout())
    }
  }

  useEffect(() => {
    if (parentLogin.addedStudentFlag.length !== 0) {
      dispatch(addStudentDelete())
    }
  }, [dispatch, parentLogin.addedStudentFlag.length])

  return (
    <>
      <HeaderBack backTo='/profesor'>Profil</HeaderBack>
      <div className='header-margin-bottom'></div>
      <div className='main-container'>
        <div className={styles.fields}>
          {/* profesor */}
          {teacherInfo && (
            <>
              {/* nume */}
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Nume:</span>
                {teacherInfo.lastName}
              </div>

              {/* prenume */}
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Prenume:</span>{' '}
                {teacherInfo.firstName}
              </div>

              {/* dirigentie */}
              {Object.keys(teacherLogin.homeroomGrade).length !==
                0 && (
                <div className={styles.field}>
                  <span className={styles.fieldLabel}>
                    Clasa de Dirigenție:
                  </span>
                  {teacherLogin.homeroomGrade.gradeNumber}
                  {teacherLogin.homeroomGrade.gradeLetter}
                </div>
              )}
            </>
          )}

          {/* elev */}
          {studentInfo && (
            <>
              {/* nume */}
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Nume:</span>
                {studentInfo.lastName}
              </div>

              {/* initiale tata*/}
              <div className={styles.field}>
                <span className={styles.fieldLabel}>
                  Inițialele Tatălui:
                </span>{' '}
                {studentInfo.dadInitials}
              </div>

              {/* prenume */}
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Prenume:</span>{' '}
                {studentInfo.firstName}
              </div>

              {/* clasa */}
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Clasa:</span>
                {studentLogin.grade.gradeNumber}
                {studentLogin.grade.gradeLetter}
              </div>
            </>
          )}

          {/* parinte */}
          {parentInfo && (
            <>
              {/* nume */}
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Nume:</span>
                {parentInfo.lastName}
              </div>

              {/* prenume */}
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Prenume:</span>{' '}
                {parentInfo.firstName}
              </div>
            </>
          )}
        </div>

        {parentInfo && (
          <Link
            to='/adauga?redirect=/profil'
            style={{
              textDecoration: 'none',
              color: 'white',
              display: 'block',
            }}
          >
            <div className={styles.addStudentButton}>
              Adăugați un elev
            </div>
          </Link>
        )}

        <Form onSubmit={submitHandler}>
          <input
            type='submit'
            className={styles.logoutButton}
            value='Deconectare'
          />
        </Form>
      </div>
    </>
  )
}

export default ProfileScreen
