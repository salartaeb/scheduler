export default function getAppointmentsForDay(state, day) {
  const dayMatch = state.days.map(day => day.name);
  if (!day || !dayMatch.includes(day)) return [];

  return state.days
    .filter(appointment => appointment.name === day)[0]
    .appointments.map(apptId => state.appointments[apptId]);
}

// module.exports = getAppointmentsForDay;