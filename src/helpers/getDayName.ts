export const getDayName = (
  year: number,
  month: number,
  day: number,
): string => {
  const date = new Date(year, month, day);
  let jourSemaine = date.getDay();
  let joursSemaine = [
    'Dimanche',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
  ];
  let nomJourSemaine = joursSemaine[jourSemaine];
  return nomJourSemaine;
};
