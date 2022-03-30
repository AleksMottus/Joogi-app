import { React, Fragment } from "react";
import DrinksSummary from "./DrinksSummary";
import AvailableDrinks from "./AvailableDrinks";

const Drinks = () => {
  return (
    <Fragment>
      <DrinksSummary />
      <AvailableDrinks />
    </Fragment>
  );
};

export default Drinks;
