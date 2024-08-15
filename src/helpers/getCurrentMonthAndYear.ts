export const getCurrentMonthAndYear = (dateStr: string) => {
  const date = new Date(dateStr);
  const month = date.getMonth();
  const year = date.getFullYear();
  return { year, month };
};
