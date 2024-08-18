export const findLastBalance = (
  table: Array<number>,
  index: number,
): number => {
  if (index < 0 || index >= table.length) {
    return 0;
  }

  let last_balance = table[index];
  while (index >= 0 && last_balance === 0) {
    index--;
    if (index >= 0) {
      last_balance = table[index];
    }
  }

  return last_balance;
};
