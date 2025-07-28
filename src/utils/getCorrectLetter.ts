export default function getCorrectLetter(lesson: string) {
  switch (lesson) {
    case 'PROJECT':
      return 'P';
    case 'COMPUTER_LABORATORY':
      return 'K';
    case 'LABORATORY':
      return 'P';
    case 'LECTURE':
      return 'W';
    default:
      return '';
  }
}
