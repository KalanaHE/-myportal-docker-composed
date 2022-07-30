import moment from "moment";
import { DAYS, MONTHS } from "../constants/commonConstants";

export const eventNameGenerator = (domain) => (action) => `${domain}/${action}`;

export const cloneArray = (input = []) => {
  const out = [];
  input.forEach((element) => {
    out.push({ ...element });
  });
  return out;
};

export const concatNames = ({ firstName, lastName }) => `${firstName} ${lastName}`;

export const countryToFlag = (isoCode) => {
  return typeof String.fromCodePoint !== "undefined"
    ? isoCode.toUpperCase().replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
    : isoCode;
};

const formatMonth = (month) => (month < 9 ? `0${month + 1}` : `${month}`);
const formatDay = (day) => (day < 10 ? `0${day}` : `${day}`);
export const formatDate = (date = new Date()) => {
  if (date) {
    return `${date.getFullYear()}-${formatMonth(date.getMonth())}-${formatDay(date.getDate())}`;
  }
  return "";
};

export const isEmpty = (value) => value === undefined || value === null || value === "";

export const calculateAge = (dateOfBirth) => {
  const {
    _data: { years, months, days },
  } = moment.duration(moment().diff(dateOfBirth));
  return `${years} years, ${months} months, ${days} days`;
};
export const extractDate = (dateStr) => {
  if (dateStr) {
    const split = dateStr.split("T");
    if (split && split.length > 0) {
      return split[0];
    }
  }
  return dateStr;
};

export const extractDateStr = (date = new Date()) => extractDate(date.toISOString());

export const getEndOfDay = (date = new Date()) => moment(date).endOf("day").toISOString();

const adjustDigits = (value) => {
  if (value < 10) {
    return `0${value}`;
  }
  return `${value}`;
};

export const initTime = (timeStr) => {
  const now = new Date();
  const year = now.getFullYear();
  const month = adjustDigits(now.getMonth() + 1);
  const date = adjustDigits(now.getDate());
  return new Date(`${year}-${month}-${date} ${timeStr}`);
};

export const extractTime = (date = new Date()) => {
  return `${adjustDigits(date.getHours())}:${adjustDigits(date.getMinutes())}`;
};

export const excuteAfterGivenDelay = (task, timeout = 0) => setTimeout(task, timeout);

export const updateObjectProp = (object = {}, propery = "", value) => {
  const obj = { ...object };
  const levels = propery.split(".");
  switch (levels.length) {
    case 1:
      obj[levels[0]] = value;
      break;
    case 2:
      obj[levels[0]][levels[1]] = value;
      break;
    default:
  }
  return obj;
};

export const removeArrayElement = (array, indexToBeRemoved) => {
  const copiedArray = [...array];
  const sliceBefore = copiedArray.slice(0, indexToBeRemoved);
  const sliceAfter = copiedArray.slice(indexToBeRemoved + 1, array.length);
  return [...sliceBefore, ...sliceAfter];
};

export const getDaysOfTheWeek = () => DAYS;

export const getMonthsOfTheYear = () => MONTHS;

export const dayMapper = (dayValue) => {
  const day = DAYS.find((d) => d.value === dayValue);
  if (day) {
    return day.label;
  }
  return "-";
};

export const monthMapper = (monthValue) => {
  const month = MONTHS.find((m) => m.value === monthValue);
  if (month) {
    return month.label;
  }
  return "-";
};

const getAvailabilityMapper = (type) => {
  if (type === "days") {
    return dayMapper;
  }
  if (type === "months") {
    return monthMapper;
  }
  return (k) => `${k}`;
};
export const formatAvailabilityData = (data, type) => {
  const mapper = getAvailabilityMapper(type);
  return data.map(mapper).join(", ");
};

export const getYears = (numberOfPastYears = 2, numberOfFutureYears = 5) => {
  const currentYear = new Date().getFullYear();
  const futureYears = [];
  const pastYears = [];
  for (let i = numberOfPastYears; i > 0; i--) {
    pastYears.push(currentYear - i);
  }
  for (let i = 1; i <= numberOfFutureYears; i++) {
    futureYears.push(currentYear + i);
  }
  return [...pastYears, currentYear, ...futureYears];
};

export const isEmptyObject = (object = {}) => Object.keys(object).length === 0;

export const isEmptyArray = (array = []) => array.length === 0;

export const iff = (condition, then, otherwise) => (condition ? then : otherwise);
