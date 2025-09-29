export const useTranslation = () => {
  return {
    t: (key: string) => {
      const map: Record<string, string> = {
        dateSelect: 'Wybierz datę',
        noEvents: 'Brak wydarzeń',
      };
      return map[key] || key;
    },
  };
};
