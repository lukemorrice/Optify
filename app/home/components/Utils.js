Date.prototype.getWeekDay = function () {
  var weekday = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  return weekday[this.getDay()];
};

Date.prototype.getMonthAsString = function () {
  var months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return months[this.getMonth()];
};

export default class Utils {
  getGreeting() {
    const time = new Date().getUTCHours();
    var msg = '';
    if (time >= 5 && time < 12) {
      msg = 'Good morning';
    } else if (time >= 12 && time <= 17) {
      msg = 'Good afternoon';
    } else {
      msg = 'Good evening';
    }
    return msg;
  }

  getDayOfWeek() {
    return new Date().getWeekDay();
  }

  getMonthAsString() {
    return new Date().getMonthAsString();
  }

  getDateOfMonth() {
    return new Date().getDate();
  }
}
