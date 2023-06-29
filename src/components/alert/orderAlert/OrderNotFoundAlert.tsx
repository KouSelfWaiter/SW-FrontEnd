import React from 'react'
import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import CustomLink from '../../customLink/CustomLink';

function OrderNotFoundAlert() {
    const [show, setShow] = useState(true);
    if (show) {
        return (
            <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>Herhangi Bir Sipariş Bulunmamaktadır.</Alert.Heading>
                <p>
                    Sepet Sayfasında Bulunan Ürünleri Onayladığınızda Siparişler Bölümünde Görüntüleyebilirsiniz.
                </p>
                <CustomLink to={"/food-menu-section"}>Ürünleri Görüntülemek İçin Tıklayınız...</CustomLink>
            </Alert>
        );
    }
    return <Button onClick={() => setShow(true)}>Uyarı Sayfasını Görüntüle</Button>;
}

export default OrderNotFoundAlert