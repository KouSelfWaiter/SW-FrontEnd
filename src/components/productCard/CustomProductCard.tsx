import React, { useEffect, useState } from 'react';
import "./CustomProductCard.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import imgHeader from './turk-kahvesi.png';
import {Link} from "react-router-dom"
import CustomLink from '../customLink/CustomLink';

const CustomProductCard: React.FC = () => {
  const [activeFoodType, setActiveFoodType] = useState("all");

  useEffect(() => {
    const scroll =
      window.requestAnimationFrame ||
      function (callback: () => void) {
        window.setTimeout(callback, 1000 / 60);
      };

    const elToShow = document.querySelectorAll(".play-on-scroll");

    const isElInViewPort = (el: Element) => {
      const rect = el.getBoundingClientRect();

      return (
        (rect.top <= 0 && rect.bottom >= 0) ||
        (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.top <= (window.innerHeight || document.documentElement.clientHeight)) ||
        (rect.top >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
      );
    };

    const loop = () => {
      elToShow.forEach((item: Element, index: number) => {
        if (isElInViewPort(item)) {
          item.classList.add("start");
        } else {
          item.classList.remove("start");
        }
      });

      scroll(loop);
    };

    const animationFrame = scroll(loop);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  const handleFoodTypeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const currCat = document.querySelector(".food-category button.active");
    currCat?.classList.remove("active");
    e.currentTarget.classList.add("active");
    setActiveFoodType(e.currentTarget.getAttribute("data-food-type") || "all");
  };

  const foodItems = [
    {
      id: "1",
      type: "salad",
      name: "Lorem ipsum",
      price: 120,
      icon: "bi bi-cup-hot"
    },
    {
      id: "1",
      type: "salad",
      name: "Lorem ipsum",
      price: 120,
      icon: "bi bi-cup-hot"
    },
    {
      id: "1",
      type: "salad",
      name: "Lorem ipsum",
      price: 120,
      icon: "bi bi-cup-hot"
    },
    {
      id: "1",
      type: "salad",
      name: "Lorem ipsum",
      price: 120,
      icon: "bi bi-cup-hot"
    },
    {
      id: "1",
      type: "salad",
      name: "Lorem ipsum",
      price: 120,
      icon: "bi bi-cup-hot"
    },
    {
      id: 1,
      type: "salad",
      name: "Lorem ipsum",
      price: 120,
      icon: "bi bi-cup-hot"
    },
    {
      id:"1",
      type: "salad",
      name: "Lorem ipsum",
      price: 120,
      icon: "bi bi-cup-hot"
    },
    {
      id: "1",
      type: "salad",
      name: "Lorem ipsum",
      price: 120,
      icon: "bi bi-cup-hot"
    },
    {
      id: "1",
      type: "salad",
      name: "Lorem ipsum",
      price: 120,
      icon: "bi bi-cup-hot"
    },
    {
      id: "1",
      type: "salad",
      name: "Lorem ipsum",
      price: 120,
      icon: "bi bi-cup-hot"
    }
  ];

  return (
    <section
      className="align-items-center bg-img bg-img-fixed animation-background"
      id="food-menu-section"
      // style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="container">
        <div className="food-menu">
          <h1>
            What will you at today?
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque alias aliquam eveniet, iure
            praesentium dicta ex dolorum inventore itaque minus repudiandae, odio provident? Velit architecto
            natus expedita non? Odio, dolorum.
          </p>
          <div className="food-category">
            <div className="zoom play-on-scroll">
              <button
                className={`active ${activeFoodType === "all" ? "active" : ""}`}
                data-food-type="all"
                onClick={handleFoodTypeClick}
              >
                All food
              </button>
            </div>
            <div className="zoom play-on-scroll delay-2">
              <button
                className={activeFoodType === "salad" ? "active" : ""}
                data-food-type="salad"
                onClick={handleFoodTypeClick}
              >
                Salad
              </button>
            </div>
            <div className="zoom play-on-scroll delay-4">
              <button
                className={activeFoodType === "lorem" ? "active" : ""}
                data-food-type="lorem"
                onClick={handleFoodTypeClick}
              >
                Lorem
              </button>
            </div>
            <div className="zoom play-on-scroll delay-6">
              <button
                className={activeFoodType === "ipsum" ? "active" : ""}
                data-food-type="ipsum"
                onClick={handleFoodTypeClick}
              >
                Ipsum
              </button>
            </div>
            <div className="zoom play-on-scroll delay-8">
              <button
                className={activeFoodType === "dolor" ? "active" : ""}
                data-food-type="dolor"
                onClick={handleFoodTypeClick}
              >
                Dolor
              </button>
            </div>
          </div>

          <div className={`row food-item-wrap ${activeFoodType}`}>
            {foodItems.map((item) => (
             
              <div key={item.id} className={`col-lg-3 col-md-4 col-sm-6 col-12 food-item ${item.type}-type`}>
                
                <div className="item-wrap bottom-up play-on-scroll">
                  <div className="item-img">
                    <div className="img-holder bg-img">
                      <img                       
                        src={imgHeader}
                        alt="alt"                     
                      />
                    </div>
                  </div>
                  <div className="item-info">
                    <div>
                    <CustomLink to={`/products/${item.id}`} ><h3>{item.name}</h3>     </CustomLink>
                      <span>{item.price}$</span>
                    </div>
                    <div className="cart-btn">
                      <i className={item.icon} style={{ fontSize: '35px' }}></i>
                    </div>
                  </div>
                </div>
              
              </div>
         
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomProductCard;
