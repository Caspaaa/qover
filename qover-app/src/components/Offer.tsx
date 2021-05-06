import * as React from "react";
import { Footer } from "./Footer";
import { useHistory } from "react-router-dom";
import valid from "../assets/images/valid.png";
import valid2x from "../assets/images/valid@2x.png";
import valid3x from "../assets/images/valid@3x.png";
import comparison from "../assets/images/icon-comparison.png";
import comparison2x from "../assets/images/icon-comparison@2x.png";
import comparison3x from "../assets/images/icon-comparison@3x.png";

const fares: Fares = {
  audi: {
    fare: 250,
    rate: 0.3,
  },
  bmw: {
    fare: 150,
    rate: 0.4,
  },
  porsche: {
    fare: 500,
    rate: 0.7,
  },
};

const computePrice = (car: Car, price: number, variant: string): number => {
  const { fare, rate } = fares[car];

  if (variant === "universal") {
    return fare + rate * price;
  }

  if (variant === "global") {
    return fare;
  } else {
    return 0;
  }
};

const formatPrice = (price: number) => {
  price = Math.round(price * 100) / 100;
  return price.toString().replace(".", ",");
};

interface Props {}

export const Offer: React.FunctionComponent<Props> = () => {
  const history = useHistory();
  const [isMonthly, setIsMonthly] = React.useState(true);
  const [choice, setChoice] = React.useState({
    isUniversalSelected: false,
  });

  const profile =
    localStorage.getItem("profile") ||
    `{"age": null,"car": null,"price": null}`;

  const { car, price } = JSON.parse(profile);

  if (!car || !price) {
    history.push("/quote-form");

    return null;
  }

  const occurrence: number = isMonthly ? 12 : 1;
  const globalOffer: number =
    computePrice(car, parseInt(price), "global") / occurrence;
  const universalOffer: number =
    computePrice(car, parseInt(price), "universal") / occurrence;
  const globalOfferClassName = !choice.isUniversalSelected
    ? "variant--selected"
    : "";
  const universalOfferClassName = choice.isUniversalSelected
    ? "variant--selected"
    : "";
  const globalOfferButtonText = choice.isUniversalSelected
    ? "Choose this plan"
    : "Plan selected";
  const universalOfferButtonText = !choice.isUniversalSelected
    ? "Choose this plan"
    : "Plan selected";

  const changeIsMonthly = () => {
    setIsMonthly(!isMonthly);
  };

  const changeChoice = (isUniversalSelected: boolean) => {
    setChoice({
      isUniversalSelected: isUniversalSelected,
    });
  };

  return (
    <>
      <div className="qover--offer full-height">
        <div className="offer">
          <div className="offer__head">
            <h1>Select a plan</h1>
            <div className="select-occurrence">
              <p>PAY MONTHLY</p>
              <label className="switch">
                <input type="checkbox" onChange={changeIsMonthly} />
                <span className="slider round"></span>
              </label>
              <p>PAY YEARLY</p>
            </div>
          </div>
          <div className="offer__result">
            <div
              className={`variant ${globalOfferClassName}`}
              onClick={() => changeChoice(false)}
            >
              <div className="variant__info variant__info--head">
                <p>Global</p>
              </div>
              <div className="variant__info variant__info--fare">
                <span>{formatPrice(globalOffer)}</span>
                <p>{isMonthly ? "MONTHLY" : "YEARLY"} INCL. TAXES</p>
              </div>
              <div className="variant__info">
                <p>
                  Maximum duration travel <span className="light">of</span> 90
                  days
                </p>
              </div>
              <div className="variant__info">
                <p>
                  Medical expenses reimbursement
                  <span className="light"> up to</span> 1.000.000 €
                </p>
              </div>
              <div className="variant__info">
                <p>
                  Personal assistance abroad
                  <span className="light"> up to</span> 5.000 €
                </p>
              </div>
              <div className="variant__info">
                <p>
                  Travel assistance abroad{" "}
                  <span className="light"> up to </span>
                  1.000 €<br />
                  <span className="light"> per insured per travel</span>
                </p>
              </div>
              <div className="variant__info">
                <p>Coverage duration: 1 year</p>
              </div>
              <div className="variant__item">
                <div className="button button--select button--active">
                  <div>
                    <img
                      src={valid}
                      srcSet={`${valid2x} 2x, ${valid3x} 3x`}
                      className="valid"
                    />
                    <p>{globalOfferButtonText}</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`variant ${universalOfferClassName}`}
              onClick={() => changeChoice(true)}
            >
              <div className="variant__info variant__info--head">
                <p>Universe</p>
              </div>
              <div className="variant__info variant__info--fare">
                <span>{formatPrice(universalOffer)}</span>
                <p>{isMonthly ? "MONTHLY" : "YEARLY"} INCL. TAXES</p>
              </div>
              <div className="variant__info">
                <p>
                  Maximum duration travel <span className="light">of</span> 180
                  days
                </p>
              </div>
              <div className="variant__info">
                <p>
                  Medical expenses reimbursement
                  <span className="light"> up to</span> 3.000.000 €
                </p>
              </div>
              <div className="variant__info">
                <p>
                  Personal assistance abroad
                  <span className="light"> up to</span> 10.000 €
                </p>
              </div>
              <div className="variant__info">
                <p>
                  Travel assistance abroad{" "}
                  <span className="light"> up to </span>
                  2.500 €
                  <br />
                  <span className="light"> per insured per travel</span>
                </p>
              </div>
              <div className="variant__info">
                <p>Coverage duration: 1 year</p>
              </div>
              <div className="variant__item">
                <div className="button button--select">
                  <div>
                    <img
                      src={valid}
                      srcSet={`${valid2x} 2x, ${valid3x} 3x`}
                      className="valid"
                    />
                    <p>{universalOfferButtonText}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <a href="">Show me the full comparison table</a>
            <img
              src={comparison}
              srcSet={`${comparison2x} 2x, ${comparison3x} 3x`}
              className="comparison"
            />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
