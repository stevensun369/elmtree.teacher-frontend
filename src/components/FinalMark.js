import React from 'react'

import styles from '../css/FinalMark.module.css'
import { Link } from 'react-router-dom'

const FinalMark = ({ subjectID, studentID, term, finalMarks }) => {
  return (
    <>
      {/* finalMark per se */}
      {finalMarks[term].finalMarkID ? (
        <>
          <div className={styles.listElementContainer}>
            <div className={styles.listElement}>
              <div
                className={styles.listElementDate}
                style={{ color: 'red' }}
              >
                <span className={styles.fontMono}>Teză:</span>
              </div>
              <div
                className={styles.listElementValue}
                style={{ color: 'red' }}
              >
                {finalMarks[term].value}
              </div>
            </div>
          </div>
          <div className='list-divider'></div>
        </>
      ) : (
        <Link to={`/profesor/${subjectID}/${studentID}/teza/${term}`}>
          <div className={styles.toAddFinal}>
            <div className={styles.toAddFinalButton}>
              <span className={styles.toAddFinalButtonSpan}>
                Adauga teză
              </span>
            </div>
          </div>
        </Link>
      )}
    </>
  )
}

export default FinalMark
