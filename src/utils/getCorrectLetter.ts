export default function getCorrectLetter(lesson: string): string {
  switch (lesson) {
    case 'PROJECT':
      return 'P';
    case 'COMPUTER_LABORATORY':
      return 'K';
    case 'LABORATORY':
      return 'L';
    case 'LECTURE':
      return 'W';
    case 'EXERCISES':
      return 'Ć';
    case 'SEMINAR':
      return 'S';
    case 'OTHER':
      return 'I';
    default:
      return '';
  }
}
