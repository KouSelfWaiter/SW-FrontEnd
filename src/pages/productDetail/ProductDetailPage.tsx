import React, { useEffect, useState, useContext } from 'react'
import './ProductDetailPage.css'
import 'bootstrap/dist/css/bootstrap.css';
import productImage from "./turk-kahvesi.png"
import { useParams, useNavigate } from 'react-router-dom';
import GetAllProductsResponse from '../../contracts/products/getAllProducts/GetAllProductsResponse';
import { GetByIdProductResponse } from '../../contracts/products/getByIdProduct/GetByIdProductResponse';
import ProductService from '../../services/models/products/ProductService';
import { API_ROOT_PATH, DEFAULT_IMAGE_PATH } from '../../constDatas/constData';
import AddBasketItemRequest from '../../contracts/baskets/addBasketItem/AddBasketItemRequest';
import BasketService from '../../services/models/baskets/BasketService';
import LoadingContext, { useLoading } from '../../contex/LoadingContext';
import { successToastr } from '../../services/ToastrServiceClient';
import { ToastrMessageEnum } from '../../enums/toastrMessagEnum/ToastrMessageEnum';

interface RouteParams {
  id: string;
  [key: string]: string | undefined;
}
function ProductDetailPage() {

  const { id } = useParams<RouteParams>();
  const [productResponse, setProductResponse] = useState<GetByIdProductResponse>({})
  const basketService:BasketService = new BasketService()
  const navigate = useNavigate();
  const loadingDataContext = useLoading()

  useEffect(() => {
    const fetchData = async () => {
      const productService: ProductService = new ProductService()
      loadingDataContext.setLoadingProgress(true)
      let data: GetByIdProductResponse = await productService.getByIdProduct({
        id: id
      })
      loadingDataContext.setLoadingProgress(false)

      setProductResponse(data)
    }

    fetchData()

  }, [])

  const addBasketItem = async (addBasketItem: Partial<AddBasketItemRequest>) =>{
    await basketService.addBasketItem(addBasketItem)
    successToastr({content: ToastrMessageEnum.AddToCartSuccess, position: 'top-center'})
  }
  const returnHome = ()=>{
    navigate("/")
  }

  return (

    <div className='animation-background'>
      <div className='container' >
        <div className='row'>

          <div className='col-md-4'>
            <div className='swing-animation-container'>

              {
                productResponse.product?.productFiles
                  ? <img src={productResponse.product.productFiles?.length > 0 ? (API_ROOT_PATH + productResponse.product.productFiles[0].path) : DEFAULT_IMAGE_PATH} alt="react logo" className='product-image' />
                  : <img src={DEFAULT_IMAGE_PATH} alt="react logo" className='product-image' />
              }

            </div>
          </div>

          <div className='col-md-8'>


            <h1 className='display-3' style={{ color: "#613a22" }}>{productResponse.product?.translation ? productResponse.product?.translation[0].name : ""}</h1>

            <hr className='hr-color' />

            <p className='text-type'>
              {productResponse.product?.translation ? productResponse.product?.translation[0].description : `Self Waiter Sunar.`}
            </p>

            <div className='shake-animation-container'>
              <span className='price'>{productResponse.product?.price} TL</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: "4%", paddingRight: "4%" }}>
              <button className='custom-button' onClick={()=> addBasketItem({productId:productResponse.product?.id, quantity:1})}>Sipariş Listesine Ekle</button>
              <button className='custom-button' onClick={returnHome}>Ana Sayfaya Dön</button>
            </div>

            <br />
            <br />
            <div>

            </div>
          </div>

        </div>
      </div>
    </div>

  );
}

export default ProductDetailPage