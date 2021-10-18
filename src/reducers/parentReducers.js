import {
  PARENT_REGISTER_REQUEST,
  PARENT_REGISTER_SUCCESS,
  PARENT_REGISTER_FAIL,
  PARENT_LOGIN_REQUEST,
  PARENT_LOGIN_SUCCESS,
  PARENT_LOGIN_FAIL,
  PARENT_LOGOUT,
  PARENT_STUDENTS_UPDATE,
  PARENT_ADD_STUDENT_REQUEST,
  PARENT_ADD_STUDENT_SUCCESS,
  PARENT_ADD_STUDENT_FAIL,
  PARENT_ADD_STUDENT_DELETE,
  PARENT_MARKS_REQUEST,
  PARENT_MARKS_SUCCESS,
  PARENT_MARKS_FAIL,
  PARENT_MARKS_DELETE,
  PARENT_TRUANCYS_REQUEST,
  PARENT_TRUANCYS_SUCCESS,
  PARENT_TRUANCYS_FAIL,
  PARENT_TRUANCYS_DELETE,
  PARENT_GET_AVERAGE_REQUEST,
  PARENT_GET_AVERAGE_SUCCESS,
  PARENT_GET_AVERAGE_FAIL,
  PARENT_GET_TERM_MARKS_REQUEST,
  PARENT_GET_TERM_MARKS_SUCCESS,
  PARENT_GET_TERM_MARKS_FAIL,
} from '../constants/parentConstants'

export const parentLoginReducer = (state = {}, action) => {
  var parentInfoDestructure
  switch (action.type) {
    // parent register
    case PARENT_REGISTER_REQUEST:
      return { loading: true }
    case PARENT_REGISTER_SUCCESS:
      parentInfoDestructure = {
        parentID: action.payload.parentID,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        cnp: action.payload.cnp,
        token: action.payload.token,
      }
      return {
        loading: false,
        parentInfo: parentInfoDestructure,
        students: action.payload.students,
      }

    case PARENT_REGISTER_FAIL:
      return { loading: false, error: action.payload }

    // parent login
    case PARENT_LOGIN_REQUEST:
      return { loading: true }
    case PARENT_LOGIN_SUCCESS:
      parentInfoDestructure = {
        parentID: action.payload.parentID,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        cnp: action.payload.cnp,
        token: action.payload.token,
      }
      return {
        loading: false,
        parentInfo: parentInfoDestructure,
        students: action.payload.students,
        addedStudentFlag: [],
      }
    case PARENT_LOGIN_FAIL:
      return { loading: false, error: action.payload }

    // students
    case PARENT_STUDENTS_UPDATE:
      return { ...state, students: action.payload }

    case PARENT_ADD_STUDENT_REQUEST:
      return { ...state, loading: true }
    case PARENT_ADD_STUDENT_SUCCESS:
      return {
        ...state,
        loading: false,
        students: action.payload,
        addedStudentFlag: action.payload,
      }
    case PARENT_ADD_STUDENT_FAIL:
      return { ...state, loading: false, error: action.payload }
    case PARENT_ADD_STUDENT_DELETE:
      return { ...state, addedStudentFlag: [] }

    // logout
    case PARENT_LOGOUT:
      return { addedStudentFlag: [] }

    default:
      return state
  }
}

export const parentMarksReducer = (state = {}, action) => {
  switch (action.type) {
    case PARENT_MARKS_REQUEST:
      return { loading: true, marksList: [] }
    case PARENT_MARKS_SUCCESS:
      return { loading: false, marksList: action.payload }
    case PARENT_MARKS_FAIL:
      return { loading: false, error: action.payload }
    case PARENT_MARKS_DELETE:
      return { loading: true, marksList: [] }
    default:
      return state
  }
}

export const parentTruancysReducer = (state = {}, action) => {
  switch (action.type) {
    case PARENT_TRUANCYS_REQUEST:
      return { loading: true, truancysList: [] }
    case PARENT_TRUANCYS_SUCCESS:
      return { loading: false, truancysList: action.payload }
    case PARENT_TRUANCYS_FAIL:
      return { loading: false, error: action.payload }
    case PARENT_TRUANCYS_DELETE:
      return { loading: true, truancysList: [] }
    default:
      return state
  }
}

export const parentAverageMarksReducer = (
  state = { averageMarks: {} },
  action
) => {
  switch (action.type) {
    case PARENT_GET_AVERAGE_REQUEST:
      return { loading: true, averageMarks: {} }
    case PARENT_GET_AVERAGE_SUCCESS:
      return { loading: false, averageMarks: action.payload }
    case PARENT_GET_AVERAGE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const parentTermMarksReducer = (state = { termMarks: {} }, action) => {
  switch (action.type) {
    case PARENT_GET_TERM_MARKS_REQUEST:
      return { loading: true, termMarks: {} }
    case PARENT_GET_TERM_MARKS_SUCCESS:
      return { loading: false, termMarks: action.payload }
    case PARENT_GET_TERM_MARKS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
