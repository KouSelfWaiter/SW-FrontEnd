import React from 'react'
import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import CustomLink from '../../customLink/CustomLink';

function BasketItemNotFoundAlert() {
    const [show, setShow] = useState(true);
    if (show) {
        return (
            <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>Spette Ürün Bulunmamaktadır</Alert.Heading>
                <p>
                    Seçeceğiniz ürünleri sepet sayfasında görüntüleyebilirsiniz.
                </p>
                <CustomLink to={"/food-menu-section"}>Ürünleri Görüntülemek İçin Tıklayınız...</CustomLink>
            </Alert>
        );
    }
    return <Button onClick={() => setShow(true)}>Uyarı Sayfasını Görüntüle</Button>;
}

export default BasketItemNotFoundAlert