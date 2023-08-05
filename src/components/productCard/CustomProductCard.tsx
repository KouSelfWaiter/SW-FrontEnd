import React, { useEffect, useState, useContext } from "react";
import "./CustomProductCard.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";
import CustomLink from "../customLink/CustomLink";
import ProductService from "../../services/models/products/ProductService";
import GetAllProductsResponse from "../../contracts/products/getAllProducts/GetAllProductsResponse";
import { API_ROOT_PATH, DEFAULT_IMAGE_PATH } from "../../constDatas/constData";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import BasketService from "../../services/models/baskets/BasketService";
import AddBasketItemRequest from "../../contracts/baskets/addBasketItem/AddBasketItemRequest";
import { useLoading } from "../../contex/LoadingContext";
import toast from "react-hot-toast";
import {
  errorToastr,
  infoToastr,
  successToastr,
} from "../../services/ToastrServiceClient";
import { ToastrMessageEnum } from "../../enums/toastrMessagEnum/ToastrMessageEnum";
import CustomPagination from "../pagination/CustomPagination";
import GetAllCategoriesResponse from "../../contracts/categories/getAllCategories/GetAllCategoriesResponse";
import CategoryService from "../../services/models/categories/CategoryService";
import { Col, Container, Row } from "react-bootstrap";
import ProductDTO from "../../contracts/products/ProductDTO";

const CustomProductCard: React.FC = () => {
  const [activeFoodType, setActiveFoodType] = useState("all");
  const basketService: BasketService = new BasketService();

  const [productResponse, setProductResponse] =
    useState<GetAllProductsResponse>({});
  const loadingContextData = useLoading();

  const [categoryResponse, setCategoryResponse] = useState<
    GetAllCategoriesResponse[]
  >([]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const maxSize: number = 12;
  const [currentCategory, setcurrentCategory] = useState("");
  const productService: ProductService = new ProductService();
  const fetchData = async (page: number) => {
    loadingContextData.setLoadingProgress(true);
    let data: GetAllProductsResponse = await productService.getAllProducts({
      page: page - 1,
      size: maxSize,
    });
    
    setProductResponse(data);

    const categoryService: CategoryService = new CategoryService();
    const data2: GetAllCategoriesResponse[] =
      await categoryService.getAllCategories();
    setCategoryResponse(data2 as GetAllCategoriesResponse[]);

    loadingContextData.setLoadingProgress(false);
  };

  useEffect(() => {
    fetchData(currentPage);
  }, []);

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
        (rect.bottom >=
          (window.innerHeight || document.documentElement.clientHeight) &&
          rect.top <=
            (window.innerHeight || document.documentElement.clientHeight)) ||
        (rect.top >= 0 &&
          rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight))
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

  const handleFoodTypeClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const currCat = document.querySelector(".food-category button.active");

    currCat?.classList.remove("active");
    e.currentTarget.classList.add("active");
    setActiveFoodType(e.currentTarget.getAttribute("data-food-type") || "all");

    setcurrentCategory(e.currentTarget.getAttribute("data-category") || "");

    let cId : string | any = e.currentTarget.getAttribute("data-category")

    if(cId.length>0 && cId!=null)
    {
      let filteredData: ProductDTO[] = productResponse.products?.filter(p => p.categoryId === cId) as ProductDTO[]
   
      setProductResponse({products: filteredData, totalCount:filteredData.length})

    }else{
      await fetchData(currentPage)
    }

  };

  const addBasketItem = async (
    addBasketItem: Partial<AddBasketItemRequest>
  ) => {
    await basketService.addBasketItem(addBasketItem);
    successToastr({
      content: ToastrMessageEnum.AddToCartSuccess,
      position: "top-center",
    });
  };

  return (
    <div style={{ background: "#ffe3e0" }}>
      <div className="food-category">
        <div className=" play-on-scroll">
          <button
            className={`customScrollButton ${
              activeFoodType === "all" ? "active" : ""
            }`}
            data-food-type="all"
            data-category=""
            onClick={handleFoodTypeClick}
          >
            Tüm İçerikler
          </button>
        </div>

        {categoryResponse.map((item, index) => (
          <div key={index} className="play-on-scroll">
            <button
              id={item.id}
              className={` ${
                activeFoodType === item.translations[0].name ? "active" : ""
              }`}
              data-food-type={
                item.translations ? item.translations[0].name : ""
              }
              data-category={item.id}
              onClick={handleFoodTypeClick}
            >
              {item.translations ? item.translations[0].name : ""}
            </button>
          </div>
        ))}
      </div>
      <Container>
        <div className="placeHolder">
          <Row>
            {productResponse.products?.map((item, index) => (
              <Col key={index} className="customCol" xs={6} md={4} lg={3}>
                <Card className="customCard">
                  {item.productFiles ? (
                    <Card.Img
                      className="customImg"
                      variant="top"
                      src={
                        item.productFiles?.length > 0
                          ? API_ROOT_PATH + item.productFiles[0].path
                          : DEFAULT_IMAGE_PATH
                      }
                    />
                  ) : (
                    <Card.Img
                      className="customImg"
                      variant="top"
                      src={DEFAULT_IMAGE_PATH}
                    />
                  )}
                  <Card.Body className="customCardBody">
                    <CustomLink to={`/products/${item.id}`}>
                      <Card.Title className="customTitle">
                        {item.translation
                          ? item.translation[0].name
                          : "Self Waiter"}
                      </Card.Title>
                    </CustomLink>
                    <hr />
                    <Card.Text className="customText">
                      {item.translation
                        ? item.translation[0].description
                        : "Self Waiter"}
                    </Card.Text>
                  </Card.Body>
                  <span className="customPrice">{item.price}$</span>
                  <Button
                    className="customButton"
                    onClick={() =>
                      addBasketItem({ productId: item.id, quantity: 1 })
                    }
                  >
                    Sepete Ekle
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="customPagination">
            <CustomPagination
              currentPage={currentPage}
              total={productResponse.totalCount as number}
              limit={maxSize}
              onPageChange={async (page: number) => {
                setCurrentPage(page);
                await fetchData(page);
              }}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CustomProductCard;
