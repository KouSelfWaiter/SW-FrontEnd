import React, { ChangeEvent, useEffect, useState } from 'react'
import { Field, FormikHelpers, useFormik } from 'formik'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductService from '../../services/models/products/ProductService';
import { GetByIdProductResponse } from '../../contracts/products/getByIdProduct/GetByIdProductResponse';
import Image from 'react-bootstrap/Image';
import { API_ROOT_PATH } from '../../constDatas/constData';

interface IProps {
    productId: string
}

function ImageForm({ productId }: IProps) {
    const productService: ProductService = new ProductService()
    const [selectedFile, setSelectedFile] = useState<FileList>()
    const [selectedProduct, setSelectedProrduct] = useState<GetByIdProductResponse>({})

    const fetchData = async () => {
        const data: GetByIdProductResponse = await productService.getByIdProduct({ id: productId })
        setSelectedProrduct(data)
    }
    useEffect(() => {

        fetchData()

    }, [])

    const fileSelectedHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedFile(event.target.files)
        }
    }
    const fileSender = async () => {
        await productService.uploadFile(productId, selectedFile as FileList)
        await fetchData()
    }

    return (
        <Container>

            <Row>

                {
                    selectedProduct.product?.productFiles
                        ? selectedProduct.product?.productFiles.map((item, index) => (


                            <Col key={index} xs={6} md={4} lg={2}>
                                <Image src={API_ROOT_PATH + item.path} rounded width={100} />
                            </Col>


                        ))
                        : <></>
                }

            </Row>

            <hr />

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