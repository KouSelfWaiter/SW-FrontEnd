import React, { useEffect, useState, useContext } from 'react';
import "./CustomProductCard.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import imgHeader from './turk-kahvesi.png';
import { Link } from "react-router-dom"
import CustomLink from '../customLink/CustomLink';
import ProductService from '../../services/models/products/ProductService';
import GetAllProductsResponse from '../../contracts/products/getAllProducts/GetAllProductsResponse';
import { API_ROOT_PATH, DEFAULT_IMAGE_PATH } from '../../constDatas/constData';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import BasketService from '../../services/models/baskets/BasketService';
import AddBasketItemRequest from '../../contracts/baskets/addBasketItem/AddBasketItemRequest';
import  { useLoading } from '../../contex/LoadingContext';

const CustomProductCard: React.FC = () => {
  const [activeFoodType, setActiveFoodType] = useState("all");
  const basketService:BasketService = new BasketService()

  const [productResponse, setProductResponse] = useState<GetAllProductsResponse>({})
  const loadingContextData = useLoading()

  useEffect(() => {
    const fetchData = async () => {
      const productService: ProductService = new ProductService()
      loadingContextData.setLoadingProgress(true)
      let data: GetAllProductsResponse = await productService.getAllProducts({ page: 0, size: 5 })
      loadingContextData.setLoadingProgress(false)
      setProductResponse(data)
    }

    fetchData()
  }, [])

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

  const addBasketItem = async (addBasketItem: Partial<AddBasketItemRequest>) =>{
    await basketService.addBasketItem(addBasketItem)
  }

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

          {/* <div className={`row food-item-wrap ${activeFoodType}`}>
            {productResponse.products?.map((item) => (

              <div key={item.id} className={`col-lg-3 col-md-4 col-sm-6 col-12 food-item ${"salad"}-type`}>

                <div className="item-wrap bottom-up play-on-scroll">
                  <div className="item-img">
                    <div className="img-holder bg-img">
                      {
                        item.productFiles ? <img
                        src={item.productFiles?.length > 0 ? (API_ROOT_PATH+item.productFiles[0].path) : DEFAULT_IMAGE_PATH}
                        alt="alt"
                       style={{width: "100px", height:"100px"}}/> : <img
                      src={DEFAULT_IMAGE_PATH}
                      alt="alt"
                    />
                      }
                      
                    </div>
                  </div>
                  <div className="item-info">
                    <div>
                      <CustomLink to={`/products/${item.id}`} ><h3>{item.translation ? item.translation[0].name : ""}</h3> </CustomLink>
                      <span>{item.price}$</span>
                    </div>
                    <div className="cart-btn">
                      <i className={"bi bi-cup-hot"} style={{ fontSize: '35px' }}></i>
                    </div>
                  </div>
                </div>

              </div>

            ))}
          </div> */}

          <br />

          <div className='row'>
          {productResponse.products?.map((item) => (
            <div key={item.id} className='col-lg-3 col-md-4 col-sm-6 col-12'>
            <Card  style={{ width: '14rem' }}>
              {
                item.productFiles
                  ? <Card.Img variant="top" src={item.productFiles?.length > 0 ? (API_ROOT_PATH + item.productFiles[0].path) : DEFAULT_IMAGE_PATH} />
                  : <Card.Img variant="top" src={DEFAULT_IMAGE_PATH} />
              }
              <Card.Body style={{backgroundColor: "#808080"}}>
                {/* <Card.Title>{item.translation ? item.translation[0].name : ""}</Card.Title> */}
                <Card.Text>
                  <CustomLink to={`/products/${item.id}`} ><h3>{item.translation ? item.translation[0].name : ""}</h3> </CustomLink>
                  <span>{item.price}$</span>
                </Card.Text>
                <Button variant="secondary" onClick={()=> addBasketItem({productId:item.id, quantity:1})}>Sepete Ekle</Button>
              </Card.Body>
            </Card>
            </div>
          ))}
          </div>





        </div>
      </div>
    </section>
  );
};

export default CustomProductCard;
