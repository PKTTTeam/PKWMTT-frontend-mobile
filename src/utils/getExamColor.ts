export function getExamColor(examName: string): string {
  let newColor: string = '';
  switch (examName) {
    case 'Kolokwium':
      newColor = '#92c748';
      break;
    case 'Egzamin końcowy':
      newColor = '#bd4122';
      break;
    case 'Projekt':
      newColor = '#c54927';
      break;
  }
  return newColor;
}
