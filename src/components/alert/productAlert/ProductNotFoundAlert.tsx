import React, { useState } from 'react'
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
function ProductNotFoundAlert() {
    const [show, setShow] = useState(true);
    if (show) {
        return (
            <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>Henüz Hiç Ürün Eklenmemiş.</Alert.Heading>
                <p>
                    Altta Bulunan Ürün Ekle Sekmesine Giderek Dilediğiniz Ürünü Ekleyebilirsiniz
                </p>
              
            </Alert>
        );
    }
    return <Button onClick={() => setShow(true)}>Uyarı Sayfasını Görüntüle</Button>;
}

export default ProductNotFoundAlert