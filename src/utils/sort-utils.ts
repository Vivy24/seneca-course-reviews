type DateAble = number | string | Date;

export function sortAlphabet(a: string, b: string) {
  return a.localeCompare(b);
}

export function sortDate(a: DateAble, b: DateAble) {
  return new Date(a).getTime() - new Date(b).getTime();
}
