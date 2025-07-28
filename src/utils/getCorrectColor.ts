export function getCorrectColor(color: string): string {
  let newColor: string;
  switch (color) {
    case 'W':
      newColor = '#e35c22';
      break;
    case 'L':
      newColor = '#3bbee5';
      break;
    case 'Ć':
      newColor = '#82d32f';
      break;
    case 'P':
      newColor = '#d22e2f';
      break;
    case 'K':
      newColor = '#cf2fee';
      break;
    default:
      newColor = 'white';
  }
  return newColor;
}
