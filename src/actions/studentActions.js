import {
  STUDENT_LOGIN_REQUEST,
  STUDENT_LOGIN_SUCCESS,
  STUDENT_LOGIN_FAIL,
  STUDENT_UPDATE_GRADE,
  STUDENT_UPDATE_SUBJECT_LIST,
  STUDENT_LOGOUT,
  STUDENT_SUBJECT_MARKS_REQUEST,
  STUDENT_SUBJECT_MARKS_SUCCESS,
  STUDENT_SUBJECT_MARKS_FAIL,
  STUDENT_SUBJECT_MARKS_DELETE,
  STUDENT_SUBJECT_TRUANCYS_REQUEST,
  STUDENT_SUBJECT_TRUANCYS_SUCCESS,
  STUDENT_SUBJECT_TRUANCYS_FAIL,
  STUDENT_SUBJECT_TRUANCYS_DELETE,
  STUDENT_GET_AVERAGE_REQUEST,
  STUDENT_GET_AVERAGE_SUCCESS,
  STUDENT_GET_AVERAGE_FAIL,
  STUDENT_GET_TERM_MARKS_REQUEST,
  STUDENT_GET_TERM_MARKS_SUCCESS,
  STUDENT_GET_TERM_MARKS_FAIL,
} from '../constants/studentConstants'
// import apiURL from '../apiURL'
import axios from 'axios'

const apiURL = 'http://localhost:5000'

export const login = (cnp, password) => async (dispatch) => {
  try {
    dispatch({
      type: STUDENT_LOGIN_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      `${apiURL}/api/student/login`,
      { cnp, password },
      config
    )

    dispatch({
      type: STUDENT_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
    localStorage.setItem('userType', 'student')
  } catch (error) {
    dispatch({
      type: STUDENT_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const studentLogout = () => async (dispatch) => {
  dispatch({
    type: STUDENT_LOGOUT,
  })

  localStorage.removeItem('userInfo')
  localStorage.removeItem('userType')
}

export const studentUpdate = () => async (dispatch, getState) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          getState().studentLogin.studentInfo.token
        }`,
      },
    }

    var ls = JSON.parse(localStorage.getItem('userInfo'))

    const grade = await axios.get(
      `${apiURL}/api/student/grade/info`,
      config
    )

    const subjectList = await axios.get(
      `${apiURL}/api/student/subjects`,
      config
    )

    dispatch({
      type: STUDENT_UPDATE_GRADE,
      payload: grade.data,
    })
    ls.grade = grade.data

    dispatch({
      type: STUDENT_UPDATE_SUBJECT_LIST,
      payload: subjectList.data,
    })
    ls.subjectList = subjectList.data

    localStorage.setItem('userInfo', JSON.stringify(ls))
  } catch (error) {}
}

export const getStudentSubjectMarksList =
  (subjectID) => async (dispatch, getState) => {
    try {
      dispatch({
        type: STUDENT_SUBJECT_MARKS_REQUEST,
      })

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${
            getState().studentLogin.studentInfo.token
          }`,
        },
      }

      const { data } = await axios.get(
        `${apiURL}/api/student/mark/${subjectID}`,
        config
      )

      dispatch({
        type: STUDENT_SUBJECT_MARKS_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: STUDENT_SUBJECT_MARKS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const getStudentSubjectTruancysList =
  (subjectID) => async (dispatch, getState) => {
    try {
      dispatch({
        type: STUDENT_SUBJECT_TRUANCYS_REQUEST,
      })

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${
            getState().studentLogin.studentInfo.token
          }`,
        },
      }

      const { data } = await axios.get(
        `${apiURL}/api/student/truancy/${subjectID}`,
        config
      )

      dispatch({
        type: STUDENT_SUBJECT_TRUANCYS_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: STUDENT_SUBJECT_TRUANCYS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const deleteMarksAndTruancys = () => async (dispatch) => {
  dispatch({
    type: STUDENT_SUBJECT_MARKS_DELETE,
  })

  dispatch({
    type: STUDENT_SUBJECT_TRUANCYS_DELETE,
  })
}

export const studentGetAverageMarks =
  () => async (dispatch, getState) => {
    try {
      dispatch({
        type: STUDENT_GET_AVERAGE_REQUEST,
      })

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${
            getState().studentLogin.studentInfo.token
          }`,
        },
      }

      const { data } = await axios.get(
        `${apiURL}/api/student/average`,
        config
      )

      var subjectList = getState().studentLogin.subjectList
      var subject

      var subjectIDList = []
      for (subject in subjectList) {
        subjectIDList.push(subjectList[subject].subjectID)
      }

      var averageMarks = {}

      for (subject in subjectIDList) {
        averageMarks[subjectIDList[subject]] = []

        var subjectID = subjectIDList[subject]

        for (var averageMark in data) {
          if (data[averageMark].subject.subjectID === subjectID) {
            averageMarks[subjectIDList[subject]].push(
              data[averageMark]
            )
          }
        }
      }

      dispatch({
        type: STUDENT_GET_AVERAGE_SUCCESS,
        payload: averageMarks,
      })
    } catch (error) {
      dispatch({
        type: STUDENT_GET_AVERAGE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const studentGetTermMarks =
  () => async (dispatch, getState) => {
    try {
      dispatch({
        type: STUDENT_GET_TERM_MARKS_REQUEST,
      })

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${
            getState().studentLogin.studentInfo.token
          }`,
        },
      }

      const { data } = await axios.get(
        `${apiURL}/api/student/term`,
        config
      )

      var termMarks = []
      for (var termMark in data) {
        if (data[termMark].term === 1) {
          termMarks[0] = data[termMark].value
        }
        if (data[termMark].term === 2) {
          termMarks[1] = data[termMark].value
        }
      }

      dispatch({
        type: STUDENT_GET_TERM_MARKS_SUCCESS,
        payload: termMarks,
      })
    } catch (error) {
      dispatch({
        type: STUDENT_GET_TERM_MARKS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
