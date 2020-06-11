export default class Utils {
  getGreeting() {
    const time = new Date()
      .toLocaleString('en-GB')
      .split(',')[1]
      .trim()
      .split(':')[0];
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

  getDay() {
    var options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    var printDate = new Date().toLocaleDateString('en-UK', options);
    return printDate.split(',')[0];
  }

  getDate() {
    var options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    var printDate = new Date().toLocaleDateString('en-UK', options);
    const day_numeric = printDate.split(',')[1].trim().split(' ')[1];
    const month = printDate.split(',')[1].split(' ')[1];
    return day_numeric + ' ' + month;
  }
}
