import React from "react";
import { useContext } from "react";
import classes from "./DrinkItem.module.css";
import DrinkItemForm from "./DrinkItemForm";
import CartContext from "../../../store/Cart-context";

const DrinkItem = (props) => {
  const cartCtx = useContext(CartContext);

  const price = `€${props.price.toFixed(2)}`;

  const addItemToCartHandler = amount => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price
    })
  };

  return (
    <li className={classes.drink}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <DrinkItemForm id={props.id} onAddToCart={addItemToCartHandler} />
      </div>
    </li>
  );
};

export default DrinkItem;
