import {
  TEACHER_LOGIN_REQUEST,
  TEACHER_LOGIN_SUCCESS,
  TEACHER_LOGIN_FAIL,
  TEACHER_UPDATE,
  TEACHER_READ_LS,
  TEACHER_LOGOUT,
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
  TEACHER_HOMEROOM_TIMETABLE_REQUEST,
  TEACHER_HOMEROOM_TIMETABLE_SUCCESS,
  TEACHER_HOMEROOM_TIMETABLE_FAIL,
  TEACHER_HOMEROOM_TIMETABLE_TEACHERS_REQUEST,
  TEACHER_HOMEROOM_TIMETABLE_TEACHERS_SUCCESS,
  TEACHER_HOMEROOM_TIMETABLE_TEACHERS_FAIL,
  TEACHER_STUDENTS_REQUEST,
  TEACHER_STUDENTS_SUCCESS,
  TEACHER_STUDENTS_FAIL,
  TEACHER_STUDENTS_DELETE,
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
  TEACHER_ADD_FINAL_MARK_REQUEST,
  TEACHER_ADD_FINAL_MARK_SUCCESS,
  TEACHER_ADD_FINAL_MARK_FAIL,
  TEACHER_ADD_FINAL_MARK_DELETE,
  TEACHER_FINAL_MARKS_REQUEST,
  TEACHER_FINAL_MARKS_SUCCESS,
  TEACHER_FINAL_MARKS_FAIL,
  TEACHER_AVERAGE_MARKS_REQUEST,
  TEACHER_AVERAGE_MARKS_SUCCESS,
  TEACHER_AVERAGE_MARKS_FAIL,
  TEACHER_AVERAGE_MARKS_DELETE,
  TEACHER_TIMETABLE_REQUEST,
  TEACHER_TIMETABLE_SUCCESS,
  TEACHER_TIMETABLE_FAIL,
  TEACHER_SCHOOL_REQUEST,
  TEACHER_SCHOOL_SUCCESS,
  TEACHER_SCHOOL_FAIL,
} from '../constants/teacherConstants'

export const teacherLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case TEACHER_LOGIN_REQUEST:
      return { loading: true }
    case TEACHER_LOGIN_SUCCESS:
      const teacherInfoDestructure = {
        teacherID: action.payload.teacherID,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        cnp: action.payload.cnp,
      }
      return {
        loading: false,
        teacherInfo: teacherInfoDestructure,
        homeroomGrade: action.payload.homeroomGrade,
        subjectList: action.payload.subjectList,
        token: action.payload.token,
      }
    case TEACHER_LOGIN_FAIL:
      return { loading: false, error: action.payload }
    case TEACHER_UPDATE:
      return {
        ...state,
        homeroomGrade: action.payload.homeroomGrade,
        subjectList: action.payload.subjectList,
        token: action.payload.token,
      }
    case TEACHER_READ_LS:
      const teacherInfoDestructureReadLS = {
        teacherID: action.payload.teacherID,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        cnp: action.payload.cnp,
      }
      return {
        ...state,
        teacherInfo: teacherInfoDestructureReadLS,
        homeroomGrade: action.payload.homeroomGrade,
        subjectList: action.payload.subjectList,
        token: action.payload.token,
      }
    case TEACHER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const teacherStudentsReducer = (
  state = { studentsList: {} },
  action
) => {
  switch (action.type) {
    case TEACHER_STUDENTS_REQUEST:
      return { loading: true, studentsList: {} }
    case TEACHER_STUDENTS_SUCCESS:
      return { loading: false, studentsList: action.payload }
    case TEACHER_STUDENTS_FAIL:
      return { loading: false, error: action.payload }
    case TEACHER_STUDENTS_DELETE:
      return { loading: false, studentsList: [] }
    default:
      return state
  }
}

export const teacherHomeroomStudentsReducer = (
  state = { homeroomStudentsList: [] },
  action
) => {
  switch (action.type) {
    case TEACHER_HOMEROOM_STUDENTS_REQUEST:
      return { loading: true, homeroomStudentsList: [] }
    case TEACHER_HOMEROOM_STUDENTS_SUCCESS:
      return { loading: false, homeroomStudentsList: action.payload }
    case TEACHER_HOMEROOM_STUDENTS_FAIL:
      return { loading: false, error: action.payload }
    case TEACHER_HOMEROOM_STUDENTS_DELETE:
      return { loading: false, homeroomStudentsList: [] }
    default:
      return state
  }
}

export const teacherHomeroomStudentSubjectsReducer = (
  state = { homeroomStudentSubjectsList: [] },
  action
) => {
  switch (action.type) {
    case TEACHER_HOMEROOM_STUDENT_SUBJECTS_REQUEST:
      return { loading: true, homeroomStudentSubjectsList: [] }
    case TEACHER_HOMEROOM_STUDENT_SUBJECTS_SUCCESS:
      return {
        loading: false,
        homeroomStudentSubjectsList: action.payload,
      }
    case TEACHER_HOMEROOM_STUDENT_SUBJECTS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const teacherHomeroomAverageMarksReducer = (
  state = { averageMarks: {} },
  action
) => {
  switch (action.type) {
    case TEACHER_HOMEROOM_AVERAGE_MARKS_REQUEST:
      return { loading: true, averageMarks: {} }
    case TEACHER_HOMEROOM_AVERAGE_MARKS_SUCCESS:
      return { loading: false, averageMarks: action.payload }
    case TEACHER_HOMEROOM_AVERAGE_MARKS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const teacherHomeroomTermMarksReducer = (
  state = { termMarks: {} },
  action
) => {
  switch (action.type) {
    case TEACHER_HOMEROOM_TERM_MARKS_REQUEST:
      return { loading: true, termMarks: {} }
    case TEACHER_HOMEROOM_TERM_MARKS_SUCCESS:
      return { loading: false, termMarks: action.payload }
    case TEACHER_HOMEROOM_TERM_MARKS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const teacherHomeroomAddTermMarkReducer = (
  state = { termMark: {} },
  action
) => {
  switch (action.type) {
    case TEACHER_HOMEROOM_ADD_TERM_MARK_REQUEST:
      return { loading: true, termMark: {} }
    case TEACHER_HOMEROOM_ADD_TERM_MARK_SUCCESS:
      return { loading: false, termMark: action.payload }
    case TEACHER_HOMEROOM_ADD_TERM_MARK_FAIL:
      return { ...state, loading: false, error: action.payload }
    case TEACHER_HOMEROOM_ADD_TERM_MARK_DELETE:
      return { loading: false, termMark: {} }
    default:
      return state
  }
}

export const teacherHomeroomTimetableReducer = (
  state = { periods: [] },
  action
) => {
  switch (action.type) {
    case TEACHER_HOMEROOM_TIMETABLE_REQUEST:
      return { loading: true, periods: [] }
    case TEACHER_HOMEROOM_TIMETABLE_SUCCESS:
      return { loading: false, periods: action.payload }
    case TEACHER_HOMEROOM_TIMETABLE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const teacherHomeroomTimetableTeachersReducer = (
  state = { teachers: [] },
  action
) => {
  switch (action.type) {
    case TEACHER_HOMEROOM_TIMETABLE_TEACHERS_REQUEST:
      return { loading: true, teachers: [] }
    case TEACHER_HOMEROOM_TIMETABLE_TEACHERS_SUCCESS:
      return { loading: false, teachers: action.payload }
    case TEACHER_HOMEROOM_TIMETABLE_TEACHERS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const teacherSubjectStudentMarksReducer = (
  state = { subjectStudentMarksList: [] },
  action
) => {
  switch (action.type) {
    case TEACHER_SUBJECT_STUDENT_MARKS_REQUEST:
      return { loading: true, subjectStudentMarksList: [] }
    case TEACHER_SUBJECT_STUDENT_MARKS_SUCCESS:
      return {
        loading: false,
        subjectStudentMarksList: action.payload,
      }
    case TEACHER_SUBJECT_STUDENT_MARKS_FAIL:
      return { loading: false, error: action.payload }
    case TEACHER_SUBJECT_STUDENT_MARKS_DELETE:
      return { loading: true, subjectStudentMarksList: [] }
    default:
      return state
  }
}

export const teacherSubjectStudentTruancysReducer = (
  state = { subjectStudentTruancysList: [] },
  action
) => {
  switch (action.type) {
    case TEACHER_SUBJECT_STUDENT_TRUANCYS_REQUEST:
      return { loading: true, subjectStudentTruancysList: [] }
    case TEACHER_SUBJECT_STUDENT_TRUANCYS_SUCCESS:
      return {
        loading: false,
        subjectStudentTruancysList: action.payload,
      }
    case TEACHER_SUBJECT_STUDENT_TRUANCYS_FAIL:
      return { loading: false, error: action.payload }
    case TEACHER_SUBJECT_STUDENT_TRUANCYS_DELETE:
      return { loading: true, subjectStudentTruancysList: [] }
    default:
      return state
  }
}

export const teacherAddMarkReducer = (
  state = { addMark: {} },
  action
) => {
  switch (action.type) {
    case TEACHER_ADD_MARK_REQUEST:
      return { loading: true, addMark: {} }
    case TEACHER_ADD_MARK_SUCCESS:
      return { loading: false, addMark: action.payload }
    case TEACHER_ADD_MARK_FAIL:
      return { ...state, loading: false, error: action.payload }
    case TEACHER_ADD_MARK_DELETE:
      return { loading: false, addMark: {} }
    default:
      return state
  }
}

export const teacherAddTruancyReducer = (
  state = { addTruancy: {} },
  action
) => {
  switch (action.type) {
    case TEACHER_ADD_TRUANCY_REQUEST:
      return { loading: true, addTruancy: {} }
    case TEACHER_ADD_TRUANCY_SUCCESS:
      return { loading: false, addTruancy: action.payload }
    case TEACHER_ADD_TRUANCY_FAIL:
      return { loading: false, error: action.payload }
    case TEACHER_ADD_TRUANCY_DELETE:
      return { loading: false, addTruancy: {} }
    default:
      return state
  }
}

export const teacherMotivateTruancyReducer = (
  state = { motivateTruancy: {} },
  action
) => {
  switch (action.type) {
    case TEACHER_MOTIVATE_TRUANCY_REQUEST:
      return { loading: true, motivateTruancy: {} }
    case TEACHER_MOTIVATE_TRUANCY_SUCCESS:
      return { loading: false, motivateTruancy: action.payload }
    case TEACHER_MOTIVATE_TRUANCY_FAIL:
      return { loading: false, error: action.payload }
    case TEACHER_MOTIVATE_TRUANCY_DELETE:
      return { loading: false, motivateTruancy: {} }
    default:
      return state
  }
}

export const teacherAddAverageReducer = (
  state = { average: {} },
  action
) => {
  switch (action.type) {
    case TEACHER_ADD_AVERAGE_REQUEST:
      return { loading: true, average: {} }
    case TEACHER_ADD_AVERAGE_SUCCESS:
      return { loading: false, average: action.payload }
    case TEACHER_ADD_AVERAGE_FAIL:
      return { loading: false, error: action.payload }
    case TEACHER_ADD_AVERAGE_DELETE:
      return { loading: false, average: {} }
    default:
      return state
  }
}

export const teacherAverageMarksReducer = (
  state = { averageMarks: {} },
  action
) => {
  switch (action.type) {
    case TEACHER_AVERAGE_MARKS_REQUEST:
      return { loading: true, averageMarks: {} }
    case TEACHER_AVERAGE_MARKS_SUCCESS:
      return { loading: false, averageMarks: action.payload }
    case TEACHER_AVERAGE_MARKS_FAIL:
      return { loading: false, error: action.payload }
    case TEACHER_AVERAGE_MARKS_DELETE:
      return { loading: false, averageMarks: {} }
    default:
      return state
  }
}

export const teacherTimetableReducer = (
  state = { periods: {} },
  action
) => {
  switch (action.type) {
    case TEACHER_TIMETABLE_REQUEST:
      return { loading: true, periods: {} }
    case TEACHER_TIMETABLE_SUCCESS:
      return { loading: false, periods: action.payload }
    case TEACHER_TIMETABLE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const teacherSchoolReducer = (
  state = { school: {} },
  action
) => {
  switch (action.type) {
    case TEACHER_SCHOOL_REQUEST:
      return { loading: true, school: {} }
    case TEACHER_SCHOOL_SUCCESS:
      return { loading: false, school: action.payload }
    case TEACHER_SCHOOL_FAIL:
      return { loading: false, error: action.payload, school: {} }
    default:
      return state
  }
}

export const teacherFinalMarksReducer = (
  state = { finalMarks: {} },
  action
) => {
  switch (action.type) {
    case TEACHER_FINAL_MARKS_REQUEST:
      return { loading: true, finalMarks: {} }
    case TEACHER_FINAL_MARKS_SUCCESS:
      return { loading: false, finalMarks: action.payload }
    case TEACHER_FINAL_MARKS_FAIL:
      return { loading: false, error: action.payload, finalMarks: {} }
    default:
      return state
  }
}

export const teacherAddFinalMarkReducer = (
  state = { addFinalMark: {} },
  action
) => {
  switch (action.type) {
    case TEACHER_ADD_FINAL_MARK_REQUEST:
      return { loading: true, addFinalMark: {}, flag: false }
    case TEACHER_ADD_FINAL_MARK_SUCCESS:
      return {
        loading: false,
        addFinalMark: action.payload,
        flag: true,
      }
    case TEACHER_ADD_FINAL_MARK_FAIL:
      return {
        loading: false,
        error: action.payload,
        addFinalMark: {},
        flag: false,
      }
    case TEACHER_ADD_FINAL_MARK_DELETE:
      return {
        loading: false,
        addFinalMark: {},
        flag: false,
      }
    default:
      return state
  }
}
