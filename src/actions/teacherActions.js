import {
  TEACHER_LOGIN_REQUEST,
  TEACHER_LOGIN_SUCCESS,
  TEACHER_LOGIN_FAIL,
  TEACHER_UPDATE_HOMEROOM_GRADE,
  TEACHER_UPDATE_SUBJECT_LIST,
  TEACHER_LOGOUT,
  TEACHER_STUDENTS_REQUEST,
  TEACHER_STUDENTS_SUCCESS,
  TEACHER_STUDENTS_FAIL,
  TEACHER_STUDENTS_DELETE,
  TEACHER_HOMEROOM_STUDENTS_REQUEST,
  TEACHER_HOMEROOM_STUDENTS_SUCCESS,
  TEACHER_HOMEROOM_STUDENTS_FAIL,
  TEACHER_HOMEROOM_STUDENTS_DELETE,
  TEACHER_HOMEROOM_AVERAGE_MARKS_REQUEST,
  TEACHER_HOMEROOM_AVERAGE_MARKS_SUCCESS,
  TEACHER_HOMEROOM_AVERAGE_MARKS_FAIL,
  TEACHER_HOMEROOM_TERM_MARKS_REQUEST,
  TEACHER_HOMEROOM_TERM_MARKS_SUCCESS,
  TEACHER_HOMEROOM_TERM_MARKS_FAIL,
  TEACHER_HOMEROOM_ADD_TERM_MARK_REQUEST,
  TEACHER_HOMEROOM_ADD_TERM_MARK_SUCCESS,
  TEACHER_HOMEROOM_ADD_TERM_MARK_FAIL,
  TEACHER_HOMEROOM_ADD_TERM_MARK_DELETE,
  TEACHER_HOMEROOM_STUDENT_SUBJECTS_REQUEST,
  TEACHER_HOMEROOM_STUDENT_SUBJECTS_SUCCESS,
  TEACHER_HOMEROOM_STUDENT_SUBJECTS_FAIL,
  TEACHER_SUBJECT_STUDENT_MARKS_REQUEST,
  TEACHER_SUBJECT_STUDENT_MARKS_SUCCESS,
  TEACHER_SUBJECT_STUDENT_MARKS_FAIL,
  TEACHER_SUBJECT_STUDENT_TRUANCYS_REQUEST,
  TEACHER_SUBJECT_STUDENT_TRUANCYS_SUCCESS,
  TEACHER_SUBJECT_STUDENT_TRUANCYS_FAIL,
  TEACHER_SUBJECT_STUDENT_MARKS_DELETE,
  TEACHER_SUBJECT_STUDENT_TRUANCYS_DELETE,
  TEACHER_ADD_MARK_REQUEST,
  TEACHER_ADD_MARK_SUCCESS,
  TEACHER_ADD_MARK_FAIL,
  TEACHER_ADD_MARK_DELETE,
  TEACHER_ADD_TRUANCY_REQUEST,
  TEACHER_ADD_TRUANCY_SUCCESS,
  TEACHER_ADD_TRUANCY_FAIL,
  TEACHER_ADD_TRUANCY_DELETE,
  TEACHER_MOTIVATE_TRUANCY_REQUEST,
  TEACHER_MOTIVATE_TRUANCY_SUCCESS,
  TEACHER_MOTIVATE_TRUANCY_FAIL,
  TEACHER_MOTIVATE_TRUANCY_DELETE,
  TEACHER_ADD_AVERAGE_REQUEST,
  TEACHER_ADD_AVERAGE_SUCCESS,
  TEACHER_ADD_AVERAGE_FAIL,
  TEACHER_ADD_AVERAGE_DELETE,
  TEACHER_AVERAGE_MARKS_REQUEST,
  TEACHER_AVERAGE_MARKS_SUCCESS,
  TEACHER_AVERAGE_MARKS_FAIL,
  TEACHER_AVERAGE_MARKS_DELETE,
} from '../constants/teacherConstants'
// import apiURL from '../apiURL'
import axios from 'axios'

const apiURL = 'http://127.0.0.1:1000'

export const login = (cnp, password) => async (dispatch) => {
  try {
    dispatch({
      type: TEACHER_LOGIN_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      `${apiURL}/api/teacher/login`,
      { cnp, password },
      config
    )

    dispatch({
      type: TEACHER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
    localStorage.setItem('userType', 'teacher')
  } catch (error) {
    dispatch({
      type: TEACHER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const teacherUpdate = () => async (dispatch, getState) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().teacherLogin.token}`,
      },
    }

    var ls = JSON.parse(localStorage.getItem('userInfo'))

    const homeroomGrade = await axios.get(
      `${apiURL}/api/teacher/homeroom/info`,
      config
    )

    const subjectList = await axios.get(
      `${apiURL}/api/teacher/subjects`,
      config
    )

    dispatch({
      type: TEACHER_UPDATE_HOMEROOM_GRADE,
      payload: homeroomGrade.data,
    })
    ls.homeroomGrade = homeroomGrade.data

    dispatch({
      type: TEACHER_UPDATE_SUBJECT_LIST,
      payload: subjectList.data,
    })
    ls.subjectList = subjectList.data.subjectList
    ls.token = subjectList.data.token

    localStorage.setItem('userInfo', JSON.stringify(ls))
  } catch (error) {}
}

export const teacherLogout = () => async (dispatch) => {
  dispatch({
    type: TEACHER_LOGOUT,
  })
  localStorage.removeItem('userInfo')
  localStorage.removeItem('userType')

  // we need to clear the students list
  dispatch({ type: TEACHER_HOMEROOM_STUDENTS_DELETE })
  dispatch({ type: TEACHER_STUDENTS_DELETE })
}

export const getHomeroomStudents =
  () => async (dispatch, getState) => {
    try {
      dispatch({
        type: TEACHER_HOMEROOM_STUDENTS_REQUEST,
      })

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().teacherLogin.token}`,
        },
      }

      const { data } = await axios.get(
        `${apiURL}/api/teacher/homeroom`,
        config
      )

      dispatch({
        type: TEACHER_HOMEROOM_STUDENTS_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: TEACHER_HOMEROOM_STUDENTS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const getHomeroomAverageMarks =
  () => async (dispatch, getState) => {
    try {
      dispatch({
        type: TEACHER_HOMEROOM_AVERAGE_MARKS_REQUEST,
      })

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().teacherLogin.token}`,
        },
      }

      const { data } = await axios.get(
        `${apiURL}/api/teacher/homeroom/average`,
        config
      )

      const homeroomStudents =
        getState().teacherHomeroomStudents.homeroomStudentsList

      var averageMarks = {}

      for (var homeroomStudent in homeroomStudents) {
        var homeroomStudentID =
          homeroomStudents[homeroomStudent].studentID
        averageMarks[homeroomStudentID] = {}

        var subjectList =
          homeroomStudents[homeroomStudent].subjectList

        for (var subject in subjectList) {
          var subjectID = subjectList[subject].subjectID
          averageMarks[homeroomStudentID][subjectID] = []

          for (var averageMark in data) {
            if (
              data[averageMark].studentID === homeroomStudentID &&
              data[averageMark].subject.subjectID === subjectID
            ) {
              averageMarks[homeroomStudentID][subjectID].push(
                data[averageMark]
              )
            }
          }
        }
      }

      dispatch({
        type: TEACHER_HOMEROOM_AVERAGE_MARKS_SUCCESS,
        payload: averageMarks,
      })
    } catch (error) {
      dispatch({
        type: TEACHER_HOMEROOM_AVERAGE_MARKS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const getHomeroomTermMarks =
  () => async (dispatch, getState) => {
    try {
      dispatch({
        type: TEACHER_HOMEROOM_TERM_MARKS_REQUEST,
      })

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().teacherLogin.token}`,
        },
      }

      const { data } = await axios.get(
        `${apiURL}/api/teacher/homeroom/term`,
        config
      )

      const homeroomStudents =
        getState().teacherHomeroomStudents.homeroomStudentsList

      var termMarks = {}

      for (var homeroomStudent in homeroomStudents) {
        var homeroomStudentID =
          homeroomStudents[homeroomStudent].studentID
        termMarks[homeroomStudentID] = []

        for (var termMark in data) {
          if (
            data[termMark].term === 1 &&
            data[termMark].studentID === homeroomStudentID
          ) {
            termMarks[homeroomStudentID][0] = data[termMark].value
          }

          if (
            data[termMark].term === 2 &&
            data[termMark].studentID === homeroomStudentID
          ) {
            termMarks[homeroomStudentID][1] = data[termMark].value
          }
        }
      }

      dispatch({
        type: TEACHER_HOMEROOM_TERM_MARKS_SUCCESS,
        payload: termMarks,
      })
    } catch (error) {
      dispatch({
        type: TEACHER_HOMEROOM_TERM_MARKS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const addHomeroomTermMark =
  (studentID, term) => async (dispatch, getState) => {
    try {
      dispatch({
        type: TEACHER_HOMEROOM_ADD_TERM_MARK_REQUEST,
      })

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().teacherLogin.token}`,
        },
      }

      const { data } = await axios.post(
        `${apiURL}/api/teacher/homeroom/term`,
        { studentID, term },
        config
      )

      dispatch({
        type: TEACHER_HOMEROOM_ADD_TERM_MARK_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: TEACHER_HOMEROOM_ADD_TERM_MARK_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const addHomeroomTermMarkDelete = () => async (dispatch) => {
  dispatch({
    type: TEACHER_HOMEROOM_ADD_TERM_MARK_DELETE,
  })
}

export const getHomeroomStudentSubjectsList =
  (studentID) => async (dispatch, getState) => {
    try {
      dispatch({
        type: TEACHER_HOMEROOM_STUDENT_SUBJECTS_REQUEST,
      })

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().teacherLogin.token}`,
        },
      }

      const { data } = await axios.get(
        `${apiURL}/api/teacher/homeroom/${studentID}`,
        config
      )

      dispatch({
        type: TEACHER_HOMEROOM_STUDENT_SUBJECTS_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: TEACHER_HOMEROOM_STUDENT_SUBJECTS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const getStudentsList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: TEACHER_STUDENTS_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().teacherLogin.token}`,
      },
    }

    const { data } = await axios.get(
      `${apiURL}/api/teacher/students`,
      config
    )

    var subjectList = getState().teacherLogin.subjectList
    var subject

    var subjectIDList = []
    for (subject in subjectList) {
      subjectIDList.push(subjectList[subject].subjectID)
    }

    var students = {}

    for (subject in subjectIDList) {
      var subjectID = subjectIDList[subject]
      students[subjectID] = []

      for (var student in data) {
        var studentSubjectList = data[student].subjectList
        for (var studentSubject in studentSubjectList) {
          var studentSubjectID =
            studentSubjectList[studentSubject].subjectID
          if (subjectID === studentSubjectID) {
            students[subjectIDList[subject]].push(data[student])
          }
        }
      }
    }

    dispatch({
      type: TEACHER_STUDENTS_SUCCESS,
      payload: students,
    })
  } catch (error) {
    dispatch({
      type: TEACHER_STUDENTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getSubjectStudentMarksList =
  (subjectID, studentID) => async (dispatch, getState) => {
    try {
      dispatch({
        type: TEACHER_SUBJECT_STUDENT_MARKS_REQUEST,
      })

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().teacherLogin.token}`,
        },
      }

      const { data } = await axios.get(
        `${apiURL}/api/teacher/mark/${subjectID}/${studentID}`,
        config
      )

      dispatch({
        type: TEACHER_SUBJECT_STUDENT_MARKS_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: TEACHER_SUBJECT_STUDENT_MARKS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const getSubjectStudentTruancysList =
  (subjectID, studentID) => async (dispatch, getState) => {
    try {
      dispatch({
        type: TEACHER_SUBJECT_STUDENT_TRUANCYS_REQUEST,
      })

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().teacherLogin.token}`,
        },
      }

      const { data } = await axios.get(
        `${apiURL}/api/teacher/truancy/${subjectID}/${studentID}`,
        config
      )

      dispatch({
        type: TEACHER_SUBJECT_STUDENT_TRUANCYS_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: TEACHER_SUBJECT_STUDENT_TRUANCYS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const deleteMarksAndTruancys = () => async (dispatch) => {
  dispatch({
    type: TEACHER_SUBJECT_STUDENT_MARKS_DELETE,
  })

  dispatch({
    type: TEACHER_SUBJECT_STUDENT_TRUANCYS_DELETE,
  })
}

export const addMark =
  (value, date, subjectID, studentID) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: TEACHER_ADD_MARK_REQUEST,
      })

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().teacherLogin.token}`,
        },
      }

      const { data } = await axios.post(
        `${apiURL}/api/teacher/mark`,
        { value, date, subjectID, studentID },
        config
      )

      dispatch({
        type: TEACHER_ADD_MARK_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: TEACHER_ADD_MARK_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const addMarkDelete = () => async (dispatch) => {
  dispatch({
    type: TEACHER_ADD_MARK_DELETE,
  })
}

export const addTruancy =
  (date, subjectID, studentID) => async (dispatch, getState) => {
    try {
      dispatch({
        type: TEACHER_ADD_TRUANCY_REQUEST,
      })

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().teacherLogin.token}`,
        },
      }

      const { data } = await axios.post(
        `${apiURL}/api/teacher/truancy`,
        { date, subjectID, studentID },
        config
      )

      dispatch({
        type: TEACHER_ADD_TRUANCY_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: TEACHER_ADD_TRUANCY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const addTruancyDelete = () => async (dispatch) => {
  dispatch({
    type: TEACHER_ADD_TRUANCY_DELETE,
  })
}

export const motivateTruancy =
  (truancyID) => async (dispatch, getState) => {
    try {
      dispatch({
        type: TEACHER_MOTIVATE_TRUANCY_REQUEST,
      })

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().teacherLogin.token}`,
        },
      }

      const { data } = await axios.put(
        `${apiURL}/api/teacher/truancy/motivate`,
        { truancyID },
        config
      )

      dispatch({
        type: TEACHER_MOTIVATE_TRUANCY_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: TEACHER_MOTIVATE_TRUANCY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const motivateTruancyDelete = () => async (dispatch) => {
  dispatch({
    type: TEACHER_MOTIVATE_TRUANCY_DELETE,
  })
}

export const addAverage =
  (subjectID, studentID, term) => async (dispatch, getState) => {
    try {
      dispatch({
        type: TEACHER_ADD_AVERAGE_REQUEST,
      })

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().teacherLogin.token}`,
        },
      }

      const { data } = await axios.post(
        `${apiURL}/api/teacher/average`,
        { subjectID, studentID, term },
        config
      )

      dispatch({
        type: TEACHER_ADD_AVERAGE_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: TEACHER_ADD_AVERAGE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const addAverageDelete = () => async (dispatch) => {
  dispatch({
    type: TEACHER_ADD_AVERAGE_DELETE,
  })
}

export const getAverageMarks =
  (subjectID, students) => async (dispatch, getState) => {
    try {
      dispatch({
        type: TEACHER_AVERAGE_MARKS_REQUEST,
      })

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().teacherLogin.token}`,
        },
      }

      const { data } = await axios.get(
        `${apiURL}/api/teacher/average/${subjectID}`,
        config
      )

      var averageMarks = {}
      for (var student in students) {
        var studentID = students[student].studentID
        averageMarks[studentID] = []
        for (var averageMark in data) {
          if (data[averageMark].studentID === studentID) {
            averageMarks[studentID].push(data[averageMark])
          }
        }
      }

      console.log(data)
      console.log(students)
      console.log(averageMarks)

      dispatch({
        type: TEACHER_AVERAGE_MARKS_SUCCESS,
        payload: averageMarks,
      })
    } catch (error) {
      dispatch({
        type: TEACHER_AVERAGE_MARKS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const getAverageMarksDelete = () => async (dispatch) => {
  dispatch({
    type: TEACHER_AVERAGE_MARKS_DELETE,
  })
}
