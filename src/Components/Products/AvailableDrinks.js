import React from "react";
import classes from "./AvailableDrinks.module.css";
import Card from "../UI/Card";
import DrinkItem from "./DrinkItem/DrinkItem";
import { useEffect, useState } from "react";

const AvailableDrinks = () => {
  const [drinks, setDrinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchDrinks = async () => {
      const response = await fetch(
        "https://joogi-app-default-rtdb.europe-west1.firebasedatabase.app/joogid.json"
      );

        if (!response.ok) {
          throw new Error('Midagi läks valesti');
        }

      const responseData = await response.json();

      const loadedDrinks = [];
      
      for (const key in responseData) {
        loadedDrinks.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setDrinks(loadedDrinks);
      setIsLoading(false)
    };
   
      fetchDrinks().catch(error => {
        setIsLoading(false);
        setHttpError(error.message)
      });
  }, []);

  if (isLoading) {
    return <section className={classes.DrinksLoading}>
      <p>Loading...</p>
    </section>
  }

  if (httpError) {
    return <section className={classes.DrinksError}>
      <p>{httpError}</p>
    </section>
  }

  const driksList = drinks.map((drink) => (
    <DrinkItem
      id={drink.id}
      key={drink.id}
      name={drink.name}
      description={drink.description}
      price={drink.price}
    />
  ));

  return (
    <section className={classes.drinks}>
      <Card>
        <ul>{driksList}</ul>
      </Card>
    </section>
  );
};

export default AvailableDrinks;
