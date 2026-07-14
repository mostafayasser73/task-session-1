const MIN_ATTENDANCE = 75;

function evaluateStudent(student) {
  const { studentName, attendancePercent, midtermScore, finalExamScore, assignmentScore, hasPaidTuition } = student;

  console.log(`\n--- ACADEMIC RECORD: ${studentName.toUpperCase()} ---`);

  if (!hasPaidTuition) {
    console.log("Status: ACADEMIC HOLD.");
    return "Error: Cannot view results. Outstanding tuition balance must be paid.";
  }

  if (attendancePercent < MIN_ATTENDANCE) {
    console.log(`Attendance: ${attendancePercent}% (Minimum required: ${MIN_ATTENDANCE}%)`);
    console.log("Status: FAIL (Insufficient Attendance).");
    return "Failed";
  }

  const totalScore = midtermScore + finalExamScore + assignmentScore;
  
  let letterGrade = 'F';
  if (totalScore >= 90) letterGrade = 'A';
  else if (totalScore >= 80) letterGrade = 'B';
  else if (totalScore >= 70) letterGrade = 'C';
  else if (totalScore >= 60) letterGrade = 'D';

  console.log(`Attendance: ${attendancePercent}%`);
  console.log(`Total Score: ${totalScore}/100`);
  console.log(`Letter Grade: ${letterGrade}`);
  
  const status = totalScore >= 60 ? "PASS" : "FAIL";
  console.log(`Status: ${status}`);
  
  return status;
}

const student1 = {
  studentName: "Charlie Brown",
  attendancePercent: 80,
  midtermScore: 25,
  finalExamScore: 45,
  assignmentScore: 18,
  hasPaidTuition: true
};

const student2 = {
  studentName: "Diana Prince",
  attendancePercent: 95,
  midtermScore: 28,
  finalExamScore: 48,
  assignmentScore: 20,
  hasPaidTuition: false
};

const student3 = {
  studentName: "Evan Wright",
  attendancePercent: 60,
  midtermScore: 30,
  finalExamScore: 50,
  assignmentScore: 20,
  hasPaidTuition: true
};

evaluateStudent(student1);
console.log(evaluateStudent(student2));
evaluateStudent(student3);
