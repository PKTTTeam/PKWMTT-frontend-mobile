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
    case 'S':
      newColor = '#aaaa15';
      break;
    case 'O':
      newColor = '#6e6e6e';
      break;
    default:
      newColor = '';
  }
  return newColor;
}
