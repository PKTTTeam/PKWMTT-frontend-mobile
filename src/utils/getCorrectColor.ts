export function getCorrectColor(color: string): string {
  let newColor: string;
  switch (color) {
    case 'W':
      newColor = '#c45f0d';
      break;
    case 'L':
      newColor = '#1d7693';
      break;
    case 'Ć':
      newColor = '#4a9211';
      break;
    case 'P':
      newColor = '#8f1722';
      break;
    case 'K':
      newColor = '#8a6b00';
      break;
    case 'S':
      newColor = '#8a1fbf';
      break;
    case 'I':
      newColor = '#3a49a3';
      break;
    default:
      newColor = '';
  }
  return newColor;
}
