import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Form } from 'react-bootstrap'

import HeaderBack from '../components/HeaderBack'

import { teacherLogout } from '../actions/teacherActions'

import styles from '../css/ProfileScreen.module.css'

// authURL
import { authURL } from '../env'

const ProfileScreen = ({ history }) => {
  const dispatch = useDispatch()

  // teacher
  const teacherLogin = useSelector((state) => state.teacherLogin)
  const { teacherInfo } = teacherLogin

  if (!teacherInfo) {
    history.push('/')
  }

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(teacherLogout())
    window.location.replace(authURL + '/#/logout')
  }
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
        </div>

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
