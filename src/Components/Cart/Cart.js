import React from "react";
import { useContext } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/Cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import { useState } from "react";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [IsSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `€${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://joogi-app-default-rtdb.europe-west1.firebasedatabase.app/tellimused.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onCloseClick}>
        Sulge
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Telli
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Kogu Summa</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout
          onConfirm={submitOrderHandler}
          onCancel={props.onCloseClick}
        />
      )}
      {!isCheckout && modalActions}
    </React.Fragment>
  );

  const IsSubmittingModalContent = <p>Saadan tellimust...</p>

  const didSubmitModalContent = 
  <React.Fragment>
  <p>Tellimus õnnestus! Tänan tellimast :)</p>
  <div className={classes.actions}>
      <button className={classes.button} onClick={props.onCloseClick}>
        Sulge
      </button>
  </div>
  </React.Fragment>

  return (
    <Modal onCloseClick={props.onCloseClick}>
     {!IsSubmitting && !didSubmit &&cartModalContent}
     {IsSubmitting && IsSubmittingModalContent}
     {!IsSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
