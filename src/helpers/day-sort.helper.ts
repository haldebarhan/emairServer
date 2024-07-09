const jourMapping = {
  Lundi: 1,
  Mardi: 2,
  Mercredi: 3,
  Jeudi: 4,
  Vendredi: 5,
  Samedi: 6,
  Dimanche: 7,
};

export function sortByJour(data: any[]) {
  return data.sort((a, b) => jourMapping[a.jour] - jourMapping[b.jour]);
}
