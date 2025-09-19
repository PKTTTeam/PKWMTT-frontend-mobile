export function getExamColor(examName: string): string {
  let newColor: string = '';
  switch (examName) {
    case 'Kolokwium':
      newColor = '#b9bb58';
      break;
    case 'Egzamin końcowy':
      newColor = '#bd4122';
      break;
    case 'Projekt':
      newColor = '#315391';
      break;
  }
  return newColor;
}
