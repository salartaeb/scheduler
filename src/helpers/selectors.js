export  function getAppointmentsForDay(state, day) {
  const dayMatch = state.days.map(day => day.name);
  if (!day || !dayMatch.includes(day)) return [];

  return state.days
    .filter(appointment => appointment.name === day)[0]
    .appointments.map(apptId => state.appointments[apptId]);
};

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const interviewerInfo = state.interviewers[interview.interviewer];
  return {
    student: interview.student,
    interviewer: interviewerInfo
  }
}

export function getInterviewersForDay(state, day){
  let result = [];
  let days = state.days;
  let interviewersForStateDay;

  //Checks validity of state.days
  if(state.days.length < 1){
    return [];
  }

  //Retrieves interviewers for day
  for(const stateDay of days){
    if(stateDay.name === day){
      interviewersForStateDay = stateDay.interviewers;
    }
  }

  //if no day is found, return empty []
  if(!interviewersForStateDay){
    return [];
  }

  //Push interviewer objects to results;
  for(const id of interviewersForStateDay){
    let interviewer = state.interviewers[id];
    result.push(interviewer);
  }

  return result;
}
