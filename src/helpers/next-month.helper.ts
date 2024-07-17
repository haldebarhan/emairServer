export function getNextMonth(dateIsoString: string): string {
  // Convertir la chaîne de caractères ISO en objet Date
  const date = new Date(dateIsoString);

  // Récupérer le mois actuel et l'année actuelle
  let month = date.getMonth(); // Les mois sont indexés de 0 à 11
  let year = date.getFullYear();

  // Incrémenter le mois
  month++;

  // Si le mois est supérieur à 11 (décembre), passer à janvier de l'année suivante
  if (month > 11) {
    month = 0; // Janvier
    year++; // Année suivante
  }

  // Créer un nouvel objet Date avec le mois suivant et l'année (les jours ne changent pas ici)
  const nextMonthDate = new Date(year, month, 1);

  // Retourner la date en format ISO string
  return nextMonthDate.toISOString();
}

