/** 13位时间戳转“YYYY-MM-DD"格式日期字符串 */
export const TimestampToDate = (timestamp: number): string => {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
};

/** 13位时间戳转“YYYY-MM-DD hh:mm:ss"格式日期字符串 */
export const TimestampToDateMore = (timestamp: number): string => {
  if (!timestamp) return '-';
  const date = new Date(timestamp);
  const year = date.getFullYear() + '-';
  const month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  const day = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
  const h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  const m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  const s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  return year + month + day + h + m + s;
};

/** "YYYYMMDD"字符串转“YYYY-MM-DD"格式日期字符串 */
export const YyyymmddToDate = (str: string) => {
  if (!str) {
    return undefined;
  }
  const newDate = str.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3');
  return newDate;
};

/**
 * 对‘yyyy-mm-dd’格式的string类型数组，进行排序
 * @param data 原始数据
 * @param isDesc 是否降序排序，默认升序
 * @returns
 */
export const SortByDate = (data: Array<string>, isDesc: boolean) => {
  const numberData: Array<number> = [];
  const otherData: Array<string> = []; // 非标准的yyyy-mm-dd数据，直接push到结果数据中
  data.map((item) => {
    const numDate = Number(item.replace(/-/g, ''));
    if (isNaN(numDate)) {
      otherData.push(item);
    } else {
      numberData.push(numDate);
    }
  });
  numberData.sort((a, b) => {
    if (isDesc) return b - a;
    return a - b;
  });
  return numberData.map((num) => YyyymmddToDate(num.toString())).concat(otherData);
};

/**
 * 计算时间差值（天，时，分，秒）
 * @param start_date 开始时间时间戳
 * @param end_date 结束时间时间戳
 * @returns
 */
export const GetResidueDate = (start_date: number, end_date: number) => {
  const residue = end_date - start_date;
  const days: any = Math.floor(residue / 1000 / 60 / 60 / 24);
  const hours: any = Math.floor((residue / 1000 / 60 / 60) % 24);
  const minutes: any = Math.floor((residue / 1000 / 60) % 60);
  const seconds: any = Math.floor((residue / 1000) % 60);
  // 不需要补零的话，这部分就可以不用了
  // days = days < 10 ? '0' + days : days;
  // hours = hours < 10 ? '0' + hours : hours;
  // minutes = minutes < 10 ? '0' + minutes : minutes;
  // seconds = seconds < 10 ? '0' + seconds : seconds;
  let str = '';
  if (days > 0) {
    str += days + '天';
  }
  if (hours > 0) {
    str += hours + '小时';
  }
  if (minutes > 0) {
    str += minutes + '分';
  }
  str += seconds + '秒';
  return str;
};

/**
 * 时间（秒）：将“秒”转换成“时分秒”
 * @param avgDuration 秒数
 * @returns string
 */
export const SecondToDate = (avgDuration: number) => {
  let hour = 0;
  let minute = 0;
  let second = 0;
  if (avgDuration > 60) {
    minute = Math.floor(avgDuration / 60);
  }
  second = avgDuration - 60 * minute;
  if (minute > 60) {
    hour = Math.floor(minute / 60);
    minute = minute - hour * 60;
  }
  let avgDurationStr = '';
  if (hour) {
    avgDurationStr = hour + '小时' + minute + '分' + second + '秒';
  } else {
    avgDurationStr = minute ? minute + '分' + second + '秒' : avgDuration + '秒';
  }
  return avgDurationStr;
};
