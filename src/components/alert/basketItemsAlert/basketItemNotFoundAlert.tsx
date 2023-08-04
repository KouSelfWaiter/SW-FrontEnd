import React from 'react'
import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import CustomLink from '../../customLink/CustomLink';
import "./basketItemNotFoundAlert.css"

function BasketItemNotFoundAlert() {
    const [show, setShow] = useState(true);
    if (show) {
        return (
            <div className="container">
            <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>Siparişiniz Bulunmamaktadır!</Alert.Heading>
                <p>
                    Seçeceğiniz ürünleri sepetinizde görüntüleyebilirsiniz.
                </p>
                <CustomLink to={"/food-menu-section"}>Ürünleri Görüntülemek İçin <p style={{color:"red"}}>Tıklayınız...</p></CustomLink>
            </Alert>
            </div>

        );
    }
    return <Button onClick={() => setShow(true)}>Uyarı Sayfasını Görüntüle</Button>;
}

export default BasketItemNotFoundAlert