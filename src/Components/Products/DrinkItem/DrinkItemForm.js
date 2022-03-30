import { useRef, useState } from "react";
import React from "react";
import classes from "./DrinkItemForm.module.css";
import Input from "../../UI/Input";

const DrinkItemForm = (props) => {
    const[amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 10 ) {
        setAmountIsValid(false);
        return;
    }

    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        lable="Kogus"
        input={{
          id: "Kogus_" + props.id,
          type: "number",
          min: "1",
          max: "10",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Lisa</button>
      {!amountIsValid && <p>Palun sisesta õige kogus 1-10</p>}
    </form>
  );
};

export default DrinkItemForm;
