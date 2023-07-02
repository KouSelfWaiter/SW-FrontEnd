import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import "bootstrap-icons/font/bootstrap-icons.css";
import GetAllProductsResponse from '../../../contracts/products/getAllProducts/GetAllProductsResponse';
import { useLoading } from '../../../contex/LoadingContext';
import ProductService from '../../../services/models/products/ProductService';
import ProductNotFoundAlert from '../../../components/alert/productAlert/ProductNotFoundAlert';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
function AdminProductsPage() {
  const [productResponse, setProductResponse] = useState<GetAllProductsResponse>({})
  const loadingContextData = useLoading()
  const productService: ProductService = new ProductService()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      loadingContextData.setLoadingProgress(true)
      let data: GetAllProductsResponse = await productService.getAllProducts({ page: 0, size: 5 })
      loadingContextData.setLoadingProgress(false)
      setProductResponse(data)
    }

    fetchData()
  }, [])

  const navigateToAddProduct = () => {
    navigate("add")
  }

  return (
    <div>

      <Table responsive="md">
        <thead>
          <tr>
            <th>#</th>
            <th>Ürün Adı</th>
            <th>Açıklaması</th>
            <th>Fiyatı</th>
            <th>Detaylı Bilgi</th>
            <th>Sil</th>
          </tr>
        </thead>
        <tbody>

          {
            productResponse.products != null && productResponse.products.length > 0
              ? <>
                {
                  productResponse.products.map((item, index) => (
                  
                      <tr key={index}>
                        <td>{index+1}</td>
                        <td>{item.translation? item.translation[0].name : ""}</td>
                        <td>{item.translation? item.translation[0].description : ""}</td>
                        <td>{item.price} TL</td>
                        <td><i className="bi bi-ticket-detailed-fill custom-icon"></i></td>
                        <td><i className="bi bi-x-circle-fill custom-icon"></i></td>
                      </tr>
                 

                  ))
                }
              </>
              : <ProductNotFoundAlert />
          }

        </tbody>
      </Table>
      <br />
      <Button variant='success' onClick={navigateToAddProduct}>Ürün Ekle</Button>  

    </div>
  )
}

export default AdminProductsPage


