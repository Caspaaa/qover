const getErrorType = (profile: Profile): ErrorType => {
  const { age, car, price } = profile;

  if (price < 5000) {
    return "priceError";
  }
  if (age < 18) {
    return "ageError";
  }
  if (age < 25 && car === "porsche") {
    return "riskError";
  }

  return null;
};

export { getErrorType };
