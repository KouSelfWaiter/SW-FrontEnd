import React, { ChangeEvent, useEffect, useState } from 'react'
import { Field, FormikHelpers, useFormik } from 'formik'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductService from '../../services/models/products/ProductService';


interface IProps{
    productId:string
}

function ImageForm({ productId }: IProps) {
    const productService: ProductService = new ProductService()
    const [selectedFile, setSelectedFile] = useState<FileList>()

    const fileSelectedHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedFile(event.target.files)
        }
    }
    const fileSender = async () => {
        await productService.uploadFile(productId, selectedFile as FileList)

    }
   
    return (
        <Container>

            <Form.Group controlId="formFileMultiple" className="mb-3">
                <Form.Label>Yükleyeceğiniz Resmi Ya Da Ressimleri Seiçiniz</Form.Label>

                <Form.Control name='files' type="file" multiple onChange={fileSelectedHandler} />

            </Form.Group>

            <br />
            <br />

            <Row>
                <Col>
                    <Button variant='success' onClick={fileSender}>Ekle</Button>
                </Col>
            </Row>

        </Container>
    )
}

export default ImageForm






{/* <Form.Control name='files' type="file" multiple  onChange={formik.handleChange}/> */ }