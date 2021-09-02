import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat);

export function toISODate(date: dayjs.ConfigType) {
  return dayjs(date).toISOString();
}

export function toFullDate(date: dayjs.ConfigType) {
  return dayjs(date).format('LL');
}
