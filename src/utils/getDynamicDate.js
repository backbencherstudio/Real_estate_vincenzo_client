export const getDynamicDate = (year = new Date().getFullYear(), month = new Date().getMonth() + 1) => {
    return new Date(year, month - 1, 5).toLocaleDateString();
  };
