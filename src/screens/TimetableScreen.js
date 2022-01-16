import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTimetable, getSchool } from '../actions/teacherActions'
import HeaderBack from '../components/HeaderBack'
import Loader from '../components/Loader'
import styles from '../css/TimetableScreen.module.css'

const TimetableScreen = () => {
  const dispatch = useDispatch()

  const teacherTimetable = useSelector(
    (state) => state.teacherTimetable
  )
  const { periods } = teacherTimetable
  const teacherSchool = useSelector((state) => state.teacherSchool)

  const days = [1, 2, 3, 4, 5]
  const intervals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

  const daysNames = ['', 'Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri']

  // state
  const [selectedPeriodID, setSelectedPeriodID] = useState('')
  const [room, setRoom] = useState('')

  const onChangeValue = (e) => {
    const value = e.target.value.split(',')
    setSelectedPeriodID(value[0])
    if (value[1] === 'undefined') {
      setRoom('')
    } else {
      setRoom(value[1])
    }

    // if (value[2] === 'undefined') {
    //   setName('')
    // } else {
    //   setName(value[2])
    // }

    // if (value[3] === 'undefined') {
    //   setTeacherName('')
    // } else {
    //   setTeacherName(value[3])
    // }
  }

  useEffect(() => {
    dispatch(getTimetable())
    dispatch(getSchool())
  }, [dispatch])

  return (
    <>
      <HeaderBack backTo={`/profesor`}>Orar</HeaderBack>
      <div className='header-margin-bottom'></div>
      <div style={{ marginTop: '5vh' }}></div>
      <div className={styles.inputValueContainer}>
        <input
          type='text'
          className={styles.inputValue}
          name='room'
          placeholder='Sala'
          value={room}
        />
      </div>
      <div className='main-container'>
        <div class='row'>
          {teacherTimetable.periods[1] &&
            teacherSchool.school.schoolID && (
              <>
                {days.map((day) => (
                  <div
                    class='col-6 col-sm-6 col-md-6 col-lg-4 col-xl'
                    style={{
                      float: 'left',
                    }}
                  >
                    <table>
                      <thead>
                        <th scope='col' className={styles.thFirst}>
                          <span className={styles.thSpan}>Ora</span>
                        </th>
                        <th scope='col' className={styles.thLast}>
                          <span className={styles.thSpan}>
                            {daysNames[day]}
                          </span>
                        </th>
                      </thead>
                      <tbody onChange={onChangeValue}>
                        {intervals.map((interval) => (
                          <>
                            {periods[day][interval] ? (
                              <tr>
                                <th scope='row'>
                                  <span className={styles.thSpan}>
                                    {
                                      teacherSchool.school.intervals[
                                        interval
                                      ]
                                    }
                                  </span>
                                </th>
                                <td
                                  className={
                                    selectedPeriodID ===
                                    periods[day][interval].periodID
                                      ? styles.tableCellSelected
                                      : styles.tableCell
                                  }
                                >
                                  <input
                                    type='radio'
                                    id={
                                      periods[day][interval].periodID
                                    }
                                    name='period'
                                    value={
                                      periods[day][interval]
                                        .periodID +
                                      ',' +
                                      periods[day][interval].room +
                                      ',' +
                                      periods[day][interval].subject
                                        .name +
                                      ','
                                    }
                                  />
                                  <label
                                    for={
                                      periods[day][interval].periodID
                                    }
                                    className={styles.label}
                                  >
                                    <span
                                      className={styles.labelSpan}
                                    >
                                      {periods[day][interval].subject
                                        .name
                                        ? periods[day][interval]
                                            .subject.name +
                                          ' - ' +
                                          periods[day][interval].grade
                                            .gradeNumber +
                                          periods[day][interval].grade
                                            .gradeLetter
                                        : '-'}
                                    </span>
                                  </label>
                                </td>
                              </tr>
                            ) : (
                              <tr>
                                <th scope='row'>
                                  <span className={styles.thSpan}>
                                    {
                                      teacherSchool.school.intervals[
                                        interval
                                      ]
                                    }
                                  </span>
                                </th>
                                <td className={styles.tableCell}>
                                  <div className={styles.label}>
                                    {' '}
                                    -{' '}
                                  </div>
                                </td>
                              </tr>
                            )}
                          </>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </>
            )}

          <div style={{ marginTop: '2vh' }}></div>

          {teacherTimetable.loading && <Loader></Loader>}
        </div>
      </div>
    </>
  )
}

export default TimetableScreen
