import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getSchool,
  getHomeroomTimetable,
  getHomeroomTimetableTeachers,
} from '../actions/teacherActions'
import HeaderBack from '../components/HeaderBack'
import Loader from '../components/Loader'
import styles from '../css/TimetableScreen.module.css'

const TeacherHomeroomTimetableScreen = () => {
  const dispatch = useDispatch()

  const teacherLogin = useSelector((state) => state.teacherLogin)

  const teacherHomeroomTimetable = useSelector(
    (state) => state.teacherHomeroomTimetable
  )
  const { periods } = teacherHomeroomTimetable
  const teacherSchool = useSelector((state) => state.teacherSchool)
  const { teachers } = useSelector(
    (state) => state.teacherHomeroomTimetableTeachers
  )

  const days = [1, 2, 3, 4, 5]

  const intervalsFrame =
    teacherLogin.homeroomGrade.intervals.split('-')
  const intervals = []
  for (let i = intervalsFrame[0]; i <= intervalsFrame[1]; i++) {
    intervals.push(i)
  }

  const daysNames = ['', 'Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri']

  // state
  const [selectedPeriodID, setSelectedPeriodID] = useState('')
  const [room, setRoom] = useState('')
  // const [name, setName] = useState('')
  const [teacherName, setTeacherName] = useState('')

  const onChangeValue = (e) => {
    const value = e.target.value.split(',')
    setSelectedPeriodID(value[0])
    if (value[3] === 'undefined') {
      setRoom('')
    } else {
      setRoom(value[3])
    }

    let day = value[1]
    let interval = value[2]

    const selectedTeachers =
      teachers[
        teacherHomeroomTimetable.periods[day][interval].subject
          .subjectID
      ]
    console.log(selectedTeachers)

    let selectedTeachersNames = ''
    if (selectedTeachers.length > 1) {
      for (let selectedTeacher in selectedTeachers) {
        selectedTeachersNames +=
          '/' + selectedTeachers[selectedTeacher]
      }
      selectedTeachersNames = selectedTeachersNames.substring(
        1,
        selectedTeachersNames.length
      )
      console.log(selectedTeachersNames)
    } else {
      selectedTeachersNames = selectedTeachers[0]
    }
    setTeacherName(selectedTeachersNames)
  }

  useEffect(() => {
    dispatch(getHomeroomTimetable())
    dispatch(getSchool())
    dispatch(getHomeroomTimetableTeachers())
  }, [dispatch])

  return (
    <>
      <HeaderBack backTo={`/diriginte`}>
        Orar - {teacherLogin.homeroomGrade.gradeNumber}
        {teacherLogin.homeroomGrade.gradeLetter}
      </HeaderBack>
      <div className='header-margin-bottom'></div>
      <div className='main-container'>
        <div class='row'>
          {teacherHomeroomTimetable.periods[1] &&
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
                                      +day +
                                      ',' +
                                      interval +
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
                                            .subject.name
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

          {teacherHomeroomTimetable.loading && <Loader></Loader>}
          {selectedPeriodID && !teacherHomeroomTimetable.loading && (
            <>
              <input
                type='text'
                className={styles.homeroomInputValue}
                name='nume'
                placeholder='Numele profesorului'
                value={teacherName}
              />

              <input
                type='text'
                className={styles.homeroomInputValue}
                name='room'
                placeholder='Sala'
                value={room}
              />
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default TeacherHomeroomTimetableScreen
