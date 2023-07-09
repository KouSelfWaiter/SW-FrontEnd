import React, { useEffect, useState } from 'react'
import { FormikHelpers, useFormik } from 'formik'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductService from '../../../../services/models/products/ProductService';
import { useNavigate } from 'react-router-dom';
import CategoryService from '../../../../services/models/categories/CategoryService';
import GetAllCategoriesResponse from '../../../../contracts/categories/getAllCategories/GetAllCategoriesResponse';
interface IFormValues {
    translationCode: string
    name: string
    description?: string
    price: number
    categoryId: string
    isActive: boolean
}
//Have to string to number for traslationCode
function AdminAddProductPage() {

    const productService: ProductService = new ProductService()
    const categoryService: CategoryService = new CategoryService()
    const [categories, setCategories] = useState<GetAllCategoriesResponse[]>([])

    const navigate = useNavigate()



    useEffect(() => {

        const fetchData = async () => {
            const data: GetAllCategoriesResponse[] = await categoryService.getAllCategories() as GetAllCategoriesResponse[]
            setCategories(data)
        }

        fetchData()

    }, [])


    const initialValues: IFormValues = {
        categoryId: "",
        description: undefined,
        isActive: true,
        name: "",
        price: 0,
        translationCode: ""
    }

    const addProduct = async (values: IFormValues, formikHelper: FormikHelpers<IFormValues>) => {
        await productService.addProduct({
            categoryId: values.categoryId,
            description: values.description,
            isActive: values.isActive,
            name: values.name,
            price: values.price,
            translationCode: parseInt(values.translationCode)
        })

        formik.values.description = ""
        formik.values.name = ""
        formik.values.price = 0
        

    }

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: addProduct
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

                <FloatingLabel
                    label="Ürün Fiyatı"
                    className="mb-3"
                >
                    <Form.Control type="number" name='price' onChange={formik.handleChange} placeholder="Ürün Fiyatı" value={formik.values.price} />
                </FloatingLabel>

                {/* <FloatingLabel
                    label="Kategori Id"
                    className="mb-3"
                >
                    <Form.Control type="text" name='categoryId' onChange={formik.handleChange} placeholder="Kategori Id" value={formik.values.categoryId} />
                </FloatingLabel> */}

                <FloatingLabel
                    label="Kategori"
                    className="mb-3"
                    
                >
                <Form.Select name='categoryId' onChange={formik.handleChange}>
                    <option value={""}>Lütfen Kategori Seiçiniz</option>

                    {    
                        categories.map(item => (
                            <option value={item.id}>{item.translations[0].name}</option>
                        ))  
                    }
                    
                </Form.Select>
                </FloatingLabel>


                <br />
                <br />

                <Row>
                    <Col>
                        <Button variant='primary' type='submit'>Ekle</Button>
                    </Col>
                    <Col>

                    </Col>
                    <Col>
                        <Button variant='success' onClick={() => navigate("/admin/products")}>Admin Ürünler Paneline Dön</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}

export default AdminAddProductPage