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
import { useLoading } from '../../contex/LoadingContext';
import toast from 'react-hot-toast';
import { errorToastr, infoToastr, successToastr } from '../../services/ToastrServiceClient';
import { ToastrMessageEnum } from '../../enums/toastrMessagEnum/ToastrMessageEnum';
import CustomPagination from '../pagination/CustomPagination';



const CustomProductCard: React.FC = () => {
  const [activeFoodType, setActiveFoodType] = useState("all");
  const basketService: BasketService = new BasketService()

  const [productResponse, setProductResponse] = useState<GetAllProductsResponse>({})
  const loadingContextData = useLoading()

  const [currentPage, setCurrentPage] = useState<number>(1);
  const maxSize: number = 12

  const fetchData = async (page:number) => {
    const productService: ProductService = new ProductService()
    loadingContextData.setLoadingProgress(true)
    let data: GetAllProductsResponse = await productService.getAllProducts({ page: page-1, size: maxSize })
    loadingContextData.setLoadingProgress(false)
    setProductResponse(data)
  }

  useEffect(() => {
 

    fetchData(currentPage)
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

  const addBasketItem = async (addBasketItem: Partial<AddBasketItemRequest>) => {
    await basketService.addBasketItem(addBasketItem)
    successToastr({ content: ToastrMessageEnum.AddToCartSuccess, position: 'top-center' })

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

          <br />

          <div className='row'>
            {productResponse.products?.map((item) => (
              <div key={item.id} className='col-lg-3 col-md-4 col-sm-6 col-12'>
                <Card style={{ width: '14rem' }}>
                  {
                    item.productFiles
                      ? <Card.Img variant="top" src={item.productFiles?.length > 0 ? (API_ROOT_PATH + item.productFiles[0].path) : DEFAULT_IMAGE_PATH} />
                      : <Card.Img variant="top" src={DEFAULT_IMAGE_PATH} />
                  }
                  <Card.Body style={{ backgroundColor: "#808080" }}>
                    {/* <Card.Title>{item.translation ? item.translation[0].name : ""}</Card.Title> */}
                    <Card.Text>
                      <CustomLink to={`/products/${item.id}`} ><h3>{item.translation ? item.translation[0].name : ""}</h3> </CustomLink>
                      <span>{item.price}$</span>
                    </Card.Text>
                    <Button variant="secondary" onClick={() => addBasketItem({ productId: item.id, quantity: 1 })}>Sepete Ekle</Button>
                  </Card.Body>
                </Card>
              </div>
            ))}



            <CustomPagination
              currentPage={currentPage}
              total={productResponse.totalCount as number}
              limit={maxSize}
              onPageChange={async (page: number) => {
                setCurrentPage(page)
                await fetchData(page)
              }}
            />



          </div>





        </div>
      </div>
    </section>
  );
};

export default CustomProductCard;
