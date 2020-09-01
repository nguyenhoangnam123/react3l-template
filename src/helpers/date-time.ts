import {
  STANDARD_DATE_FORMAT_INVERSE,
  STANDARD_DATE_REGEX,
  STANDARD_DATE_TIME_FORMAT_VIEW,
  STANDARD_DATE_TIME_REGEX,
  STANDARD_DATE_TIME_REGEX_WITHOUT_TIMEZONE,
  STANDARD_TIME_FORMAT,
  STANDARD_TIME_REGEX,
} from "config/consts";
import moment, { Moment } from "moment";

export function formatDate(
  date: Moment,
  dateFormat: string = STANDARD_DATE_FORMAT_INVERSE,
) {
  if (date) {
    if (typeof date === "object" && "format" in date) {
      return date.format(dateFormat);
    }
  }
  return moment(date).format(dateFormat);
}

export function formatTime(
  time: Moment,
  timeFormat: string = STANDARD_TIME_FORMAT,
) {
  if (typeof time === "object" && "format" in time) {
    return time.format(timeFormat);
  }
  return moment(time).format(timeFormat);
}

export function formatDateTime(
  time: Moment,
  dateTimeFormat: string = STANDARD_DATE_TIME_FORMAT_VIEW,
) {
  if (typeof time === "object" && "format" in time) {
    return time.format(dateTimeFormat);
  }
  return moment(time).format(dateTimeFormat);
}

export function isDateValue(date?: string) {
  return date?.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/);
}

export function isTimeValue(time?: string) {
  return time?.match(/[0-9]{2}:[0-9]{2}/);
}

export function isDateTimeValue(time?: string) {
  return (
    time?.match(STANDARD_DATE_TIME_REGEX_WITHOUT_TIMEZONE) ||
    time?.match(STANDARD_DATE_TIME_REGEX) ||
    time?.match(STANDARD_DATE_REGEX) ||
    time?.match(STANDARD_TIME_REGEX)
  );
}
