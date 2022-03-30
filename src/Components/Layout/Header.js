import React from "react";
import classes from "./Header.module.css";
import naited from "../../assets/Kokteilid.jpg";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>NimetudJoogid</h1>
        <HeaderCartButton onClick={props.onShowCart}/>
      </header>
      <div className={classes['main-image']}>
        <img src={naited} alt="Kokteilid laual" />
      </div>
    </React.Fragment>
  );
};

export default Header;
