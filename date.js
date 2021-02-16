import { date } from 'quasar'
import Vue from 'vue'

const interval = {
  second: 1000,
  minute: 60000
}

const qtime = {}

const localeRu = {
  days: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
  daysShort: ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'],
  months: ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'],
  monthsShort: ['янв.', 'фев.', 'марта', 'апр.', 'май', 'июня', 'июля', 'авг.', 'сент.', 'окт.', 'ноября', 'дек.']
}

function between (x, min, max) {
  return x >= min && x <= max
}

function declinationRu (number) {
  const numberEnd = number > 10 ? parseInt(String(number)[1]) : number
  let end = ''
  if (numberEnd === 1 && number !== 11) {
    end = 'у'
  } else if (between(numberEnd, 2, 4) && !between(number, 10, 15)) {
    end = 'ы'
  }
  return end
}

function getTimeFromNow (now, time, delta) {
  if (delta < 60) {
    return [interval.second, `${delta} секунд${declinationRu(delta)} назад`]
  } else {
    const minDate = date.getDateDiff(now, time, 'minutes')
    return [interval.minute, `${minDate} минут${declinationRu(minDate)} назад`]
  }
}

function getCalendarTime (now, time) {
  const day = date.isSameDate(now, time, 'day') ? 'сегодня ' : 'вчера '
  return day + date.formatDate(time, 'HH:mm', localeRu)
}

function getDayOfWeek (time) {
  return date.formatDate(time, 'dddd HH:mm', localeRu)
}

function getDateTime (unixTime) {
  const unixTimeMs = unixTime * 1000
  const dateNow = new Date()
  const datePost = new Date(unixTimeMs)
  const delta = date.getDateDiff(dateNow, datePost, 'seconds')
  if (delta < 3600) {
    return getTimeFromNow(dateNow, datePost, delta)
  } else if (delta > 172800) {
    if (delta > 604800) {
      return [null, date.formatDate(unixTimeMs, 'DD MMM YY, HH:mm', localeRu)]
    } else {
      return [null, getDayOfWeek(datePost)]
    }
  } else {
    return [null, getCalendarTime(dateNow, datePost)]
  }
}

function getDate (func, objTime) {
  function wrapper (id, date) {
    const [updateTime, time] = getDateTime(date)
    if (updateTime) {
      if (this[objTime][id]) {
        this[objTime][id] = time
      } else {
        this.$set(this[objTime], id, time)
      }
      setTimeout(() => this[func](id, date), updateTime)
    } else {
      return time
    }
  }
  return wrapper
}

export default getDate

qtime.getDateTime = getDateTime

Vue.prototype.$qtime = qtime
