import React from "react";
import classes from "./DrinksSummary.module.css";

const DrinksSummary = () => {
  return (
    <section className={classes.summary}>
      <h2>Maitsvad joogid, koju kätte!</h2>
      <p>
        Vali oma lemmik kokteil meie laiast valikust või proovi midagi uut ja
        huvitavat.
      </p>
      <p>
        Kõik kokteilid on tehtud hoole ja täpsusega ,et tagada parim kvaliteet.
      </p>
    </section>
  );
};

export default DrinksSummary;
