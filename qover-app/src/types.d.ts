interface Profile {
  age: number;
  car: string;
  price: number;
}

interface Fares {
  audi: Fare;
  bmw: Fare;
  porsche: Fare;
}

interface Fare {
  fare: number;
  rate: number;
}

type Car = "bmw" | "audi" | "porsche";

interface ErrorMessages {
  priceError: string;
  ageError: string;
  riskError: string;
}

type ErrorType = "priceError" | "ageError" | "riskError" | null;
