function isLeapYear(year) {
  return year % 100 !== 0 && year % 4 === 0 || year % 400 === 0
}

function getMaxDay(year, month) {
  year = parseFloat(year)
  month = parseFloat(month)
  if (month === 2) {
    return isLeapYear(year) ? 29 : 28
  }
  return [4, 6, 9, 11].indexOf(month) >= 0 ? 30 : 31
}

function getYears(startDate, endDate) {
  let startYear = startDate.getFullYear()
  const endYear = endDate.getFullYear()
  let rs = []
  while (startYear <= endYear) {
    rs.push(startYear)
    startYear++
  }
  return {
    minYear: rs[0],
    maxYear: rs[rs.length - 1]
  }
}

function getMonths(startDate, endDate, year) {
  const startYear = startDate.getFullYear()
  const endYear = endDate.getFullYear()
  const startMonth = startDate.getMonth() + 1
  const endMonth = endDate.getMonth() + 1
  let start = 1
  let end = 12
  if (year === startYear) {
    start = startMonth
  }
  if (year === endYear) {
    end = endMonth
  }
  return {
    minMonth: start,
    maxMonth: end
  }
}

function getDays(startDate, endDate, year, month) {
  const startYear = startDate.getFullYear()
  const endYear = endDate.getFullYear()
  const startMonth = startDate.getMonth() + 1
  const endMonth = endDate.getMonth() + 1
  const startDay = startDate.getDate()
  const endDay = endDate.getDate()

  let start = 1
  let end = getMaxDay(year, month)

  if (year === startYear && month === startMonth) {
    start = startDay
  }
  if (year === endYear && month === endMonth) {
    end = endDay
  }
  return {
    minDay: start,
    maxDay: end
  }
}
function getHours(startDate, endDate, date) {
  // const startYear = startDate.getFullYear()
  let minHour = 0, maxHour = 24;
  // console.log('startDate=', startDate.getFullYear())
  // console.log('startDate=', startDate.getMonth())
  // console.log('startDate=', startDate.getDate())
  // console.log('date=', date)
  if (startDate.getFullYear() == date.year
    && startDate.getMonth() + 1 == date.month
    && startDate.getDate() == date.day
  ) {
    // alert('ss')
    minHour = startDate.getHours();
  }

  return {
    minHour: minHour,
    maxHour: maxHour
  }
}
function getMinute(startDate, endDate, date) {
  // const startYear = startDate.getFullYear()
  let minMinute = 0, maxMinute = 59;
  console.log('startDate=', startDate.getFullYear())
  console.log('startDate=', startDate.getMonth())
  console.log('startDate=', startDate.getDate())
  console.log('startDate=', startDate.getHours())
  console.log('startDate=', startDate.getMinutes())
  console.log('date=', date)
  if ((startDate.getFullYear() == date.year
    && startDate.getMonth() + 1 == date.month
    && startDate.getDate() == date.day
    && startDate.getHours() == date.hour
  )||date.minute=='mm') {
   
    minMinute = startDate.getMinutes();
  }else{
    console.log(minMinute)
  }

  return {
    minMinute: minMinute,
    maxMinute: maxMinute
  }
}
export {
  getYears,
  getMonths,
  getHours,
  getMinute,
  getDays
}