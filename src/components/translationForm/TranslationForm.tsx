import React, { useEffect, useState } from 'react'
import { FormikHelpers, useFormik } from 'formik'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductService from '../../services/models/products/ProductService';

interface IFormValues {
    translationCode: string
    name: string
    description?: string
}

interface IProps{
    productId:string
}

function TranslationForm({productId}: IProps) {

    const productService: ProductService = new ProductService()

    const initialValues: IFormValues = {
        description: undefined,
        name: "",
        translationCode: ""
    }

    const createProductTranslation = async (values: IFormValues, formikHelper: FormikHelpers<IFormValues>) => {
        await productService.createProductTranslation({
            productId:productId,
            description: values.description,
            name: values.name,
            translationCode: parseInt(values.translationCode)
        })

        formikHelper.resetForm()

    }

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: createProductTranslation
    })



    return (
        <Container>
            <Form onSubmit={formik.handleSubmit}>


                <Form.Check // prettier-ignore
                    type="radio"
                    name="translationCode"
                    id="turkish"
                    value="0"
                    checked={formik.values.translationCode === "0"}
                    onChange={formik.handleChange}
                    label="Türkçe"
                />
                <Form.Check // prettier-ignore
                    type="radio"
                    name="translationCode"
                    id="english"
                    value="1"
                    checked={formik.values.translationCode === "1"}
                    onChange={formik.handleChange}
                    label="İngilizce"
                />


                <FloatingLabel
                    label="Ürün Adı"
                    className="mb-3"
                >
                    <Form.Control type="text" name='name' onChange={formik.handleChange} placeholder="Ürün Adı" value={formik.values.name} />
                </FloatingLabel>

                <FloatingLabel label="Ürün Açıklaması">
                    <Form.Control
                        as="textarea"
                        placeholder="Ürün Açıklaması"
                        style={{ height: '100px' }}
                        name='description'
                        onChange={(formik.handleChange)}
                        value={formik.values.description}
                    />
                </FloatingLabel>

                <br />
                <br />

                <Row>
                    <Col>
                        <Button variant='success' type='submit'>Ekle</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}

export default TranslationForm