export const sortSubjectInfo = (subjectList, subjectID) => {
  var subjectInfo
  for (var subject in subjectList) {
    if (subjectList[subject].subjectID === subjectID) {
      subjectInfo = subjectList[subject]
    }
  }

  return subjectInfo
}

export const sortAverageMarks = (averageMarks) => {
  // 'item' could either be a student of a subject
  var itemAverageMarks = {}

  for (var item in averageMarks) {
    itemAverageMarks[item] = []

    for (var subjectAverageMark in averageMarks[item]) {
      if (averageMarks[item][subjectAverageMark].term === 1) {
        itemAverageMarks[item][0] =
          averageMarks[item][subjectAverageMark].value
      }

      if (averageMarks[item][subjectAverageMark].term === 2) {
        itemAverageMarks[item][1] =
          averageMarks[item][subjectAverageMark].value
      }
    }
  }

  return itemAverageMarks
}

export const sortStudentInfo = (
  studentsList,
  subjectStudentsList,
  studentID
) => {
  var subjectStudentInfo

  if (studentsList.length !== 0) {
    for (var student in subjectStudentsList) {
      if (subjectStudentsList[student].studentID === studentID) {
        subjectStudentInfo = subjectStudentsList[student]
      }
    }
  }

  return subjectStudentInfo
}

export const sortMarksByTerm = (marksList) => {
  var marksTermOne = []
  var marksTermTwo = []

  for (var mark in marksList) {
    if (marksList[mark].term === 1) {
      marksTermOne.push(marksList[mark])
    } else if (marksList[mark].term === 2) {
      marksTermTwo.push(marksList[mark])
    }
  }

  return { marksTermOne, marksTermTwo }
}

export const sortTruancysByTerm = (truancysList) => {
  var truancysTermOne = []
  var truancysTermTwo = []
  for (var truancy in truancysList) {
    if (truancysList[truancy].term === 1) {
      truancysTermOne.push(truancysList[truancy])
    } else if (truancysList[truancy].term === 2) {
      truancysTermTwo.push(truancysList[truancy])
    }
  }

  return { truancysTermOne, truancysTermTwo }
}

export const sortAverageMarksByTerm = (averageMarksList) => {
  var averageMarkTermOne = {}
  var averageMarkTermTwo = {}
  for (var averageMark in averageMarksList) {
    if (averageMarksList[averageMark].term === 1) {
      averageMarkTermOne = averageMarksList[averageMark]
    } else if (averageMarksList[averageMark].term === 2) {
      averageMarkTermTwo = averageMarksList[averageMark]
    }
  }

  return { averageMarkTermOne, averageMarkTermTwo }
}

export const calculateAverageMark = (marks, term, finalMark) => {
  if (finalMark) {
    let markValuesCounter = 0.0
    let marksCounter = 0.0

    for (let markIndex in marks) {
      let mark = marks[markIndex]
      if (mark.term === term) {
        markValuesCounter += mark.value
        marksCounter += 1
      }
    }

    let marksValue = markValuesCounter / marksCounter
    let marksValueFormat = Math.floor(marksValue * 100) / 100

    let value = Math.round(
      (marksValueFormat * 3 + finalMark.value) / 4
    )

    return value
  } else {
    let markValuesCounter = 0.0
    let marksCounter = 0.0

    for (let markIndex in marks) {
      let mark = marks[markIndex]

      if (mark.term === term) {
        markValuesCounter += mark.value
        marksCounter += 1
      }
    }

    let marksValue = markValuesCounter / marksCounter
    let value = Math.round(marksValue)

    return value
  }
}

export const sortTruancyInfo = (truancysList, truancyID) => {
  var truancyInfo

  if (truancysList.length !== 0) {
    for (var truancy in truancysList) {
      if (truancysList[truancy].truancyID === truancyID) {
        truancyInfo = truancysList[truancy]
      }
    }
  }

  return truancyInfo
}
