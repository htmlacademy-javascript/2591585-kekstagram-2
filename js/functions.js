/*const getTimeInMinutes = (timeString) => {
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours * 60 + minutes;
};

const convertTimesToMinutes = (...timeStrings) => timeStrings.map(getTimeInMinutes);

const countingWorkingTime = (startWorking, endWorking, startMeeting, durationMeeting) => {
  const [startWorkingInMinutes, endWorkingInMinutes, startMeetingInMinutes] =
  convertTimesToMinutes(startWorking, endWorking, startMeeting);

  const endMeetingInMinutes = startMeetingInMinutes + durationMeeting;

  return startMeetingInMinutes >= startWorkingInMinutes && endMeetingInMinutes <= endWorkingInMinutes;
};
*/
/*-------------Проверка функции-----------------*/
//console.log(countingWorkingTime('08:00', '17:30', '14:00', 90)); // true
//console.log(countingWorkingTime('8:0', '10:0', '8:0', 120)); // true
//console.log(countingWorkingTime('08:00', '14:30', '14:00', 90)); // false
//console.log(countingWorkingTime('14:00', '17:30', '08:0', 90)); // false
//console.log(countingWorkingTime('8:00', '17:30', '08:00', 900)); // false
