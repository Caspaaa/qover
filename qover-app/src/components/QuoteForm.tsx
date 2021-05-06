import * as React from "react";
import { getErrorType } from "./functions/functions";
import { useHistory } from "react-router-dom";
import { Footer } from "./Footer";

const errorMessages: ErrorMessages = {
  priceError: "Sorry! The price of the car is too low",
  ageError: "Sorry! The driver is too young",
  riskError: "Sorry! We can not accept this particular risk",
};

interface Props {}

export const QuoteForm: React.FunctionComponent<Props> = () => {
  const history = useHistory();
  const [profile, setProfile] = React.useState({
    age: 0,
    car: "audi",
    price: 0,
  });

  const [inputError, setInputError] = React.useState<ErrorType>(null);

  const inputErrorClass = inputError ? "hasError" : "";

  const errorMessage = inputError ? errorMessages[inputError] : "";

  const handleInputChange = (event: any) => {
    const { value, name } = event.target;

    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const onSubmit = (event: any, profile: Profile) => {
    event.preventDefault();

    const errorType = getErrorType(profile);

    if (errorType) {
      setInputError(errorType);

      return;
    }

    localStorage.setItem("profile", JSON.stringify(profile));
    history.push("/offer");
  };

  const ageErrorClass =
    inputError === ("ageError" || "riskError") ? "input-error" : "";
  const priceErrorClass = inputError === "priceError" ? "input-error" : "";
  const carErrorClass = inputError === "riskError" ? "input-error" : "";

  return (
    <>
      <div className="qover--quoteForm full-height">
        <div className="quoteForm">
          <form
            className={inputErrorClass}
            onSubmit={(event) => onSubmit(event, profile)}
          >
            <div className={`${ageErrorClass} ${carErrorClass}`}>
              <label>Age of the driver</label>
              <input
                name="age"
                type="number"
                min="0"
                max="99"
                onChange={handleInputChange}
              />
            </div>
            <div className={carErrorClass}>
              <label>Car</label>
              <select name="car" onChange={handleInputChange}>
                <option value="audi">Audi</option>
                <option value="bmw">BMW</option>
                <option value="porsche">Porsche</option>
              </select>
            </div>
            <div className={priceErrorClass}>
              <label>Purchase Price</label>
              <input
                name="price"
                min="0"
                type="number"
                onChange={handleInputChange}
              />
              <span>€</span>
            </div>
            <div>
              <p className="errorMessage">{errorMessage}</p>
            </div>
            <button type="submit">Get a price</button>
          </form>
        </div>
        <Footer />
      </div>
    </>
  );
};
