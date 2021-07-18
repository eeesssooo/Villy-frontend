//category-filter-condition
export const makeCondition = filterState => {
  const filterMatch = {
    bone: 1,
    hair: 2,
    growth: 3,
    skin: 4,
  };

  const filtered = Object.entries(filterState).reduce((acc, [key, value]) => {
    if (!acc && value) {
      return acc + `efficacy=${filterMatch[key]}`;
    }

    if (value) {
      return acc + `&efficacy=${filterMatch[key]}`;
    }
    return acc;
  }, '');

  return filtered;
};
