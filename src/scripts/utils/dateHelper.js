export function getMaxDay(month, year) {
  switch (month) {
    case 2:
      return (year % 4 === 0 && year % 100) || year % 400 == 0 ? 29 : 28;

      break;

    case 4:
    case 6:
    case 9:
    case 11:
      return 30;
      break;

    default:
      return 31;
      break;
  }
}