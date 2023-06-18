import React from 'react'
import './ProductDetailPage.css'
import 'bootstrap/dist/css/bootstrap.css';
import productImage from "./turk-kahvesi.png"
import { useParams } from 'react-router-dom';

interface RouteParams {
  id: string;
  [key: string]: string | undefined;
}
function ProductDetailPage() {

  const { id } = useParams<RouteParams>();

  return (
 
    <div className='animation-background'>
      <div className='container' >
        <div className='row'>

          <div className='col-md-4'>
            <div className='swing-animation-container'>
              <img src={productImage} alt="react logo" className='product-image' />
            </div>
          </div>

          <div className='col-md-8'>

            
            <h1 className='display-3' style={{color:"#613a22"}}>Türk Kahvesi ID: {id}</h1>

            <hr className='hr-color' />

            <p className='text-type'>Türk kahvesi, daha çok Türk kültüründe önemli yere sahip Osmanlı 
              İmparatorluğu'dan günümüze kadar gelmiş en eski kahve hazırlama ve
               pişirme metotlarındandır. Kendine has tadı,
                köpüğü, kokusu, sunuluş biçimiyle özgün bir kimliği ve geleneği vardır.
                 Telvesi ile ikram edilen tek kahve türüdür.</p>

              <div className='shake-animation-container'>
                  <span className='price'>42 TL</span>
              </div>

              <div style={{display:'flex', justifyContent:'space-between', paddingLeft:"4%", paddingRight:"4%"}}>
              <button className='custom-button'>Sipariş Listesine Ekle</button>
              <button className='custom-button'>Ana Sayfaya Dön</button>  
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