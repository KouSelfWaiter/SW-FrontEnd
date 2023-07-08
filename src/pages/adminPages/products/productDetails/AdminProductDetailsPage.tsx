import React, { useEffect, useState } from 'react'
import { FormikHelpers, useFormik } from 'formik'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductService from '../../../../services/models/products/ProductService';
import { useNavigate, useParams } from 'react-router-dom';
import CategoryService from '../../../../services/models/categories/CategoryService';
import GetAllCategoriesResponse from '../../../../contracts/categories/getAllCategories/GetAllCategoriesResponse';
import CustomDialog from '../../../../components/dialog/CustomDialog';
import { GetByIdProductResponse } from '../../../../contracts/products/getByIdProduct/GetByIdProductResponse';
import TranslationForm from '../../../../components/translationForm/TranslationForm';
import ImageForm from '../../../../components/imageForm/ImageForm';


interface IFormValues {
    translationCode: string
    name: string
    description?: string
    price: number
    categoryId: string
    isActive: boolean
}

interface RouteParams {
    id: string;
    [key: string]: string | undefined;
}


function AdminProductDetailsPage() {
    const { id } = useParams<RouteParams>();
    const productService: ProductService = new ProductService()
    const categoryService: CategoryService = new CategoryService()
    const [categories, setCategories] = useState<GetAllCategoriesResponse[]>([])
    const [productResponse, setProductResponse] = useState<GetByIdProductResponse>({})
    const [translationModalOpen, setTranslationModalOpen] = useState<boolean>(false);
    const [fileModalOpen, setFileModalOpen] = useState<boolean>(false);

    const navigate = useNavigate()

    const handleTranslationModalClose = () => {
        setTranslationModalOpen(false);
    };

    const handleFileModalClose = () => {
        setFileModalOpen(false);
    };

    let initialValues: IFormValues = {
        categoryId: productResponse.product?.categoryId as string,
        description: productResponse.product?.translation ? productResponse.product?.translation[0].description as string : undefined,
        isActive: true,
        name: productResponse.product?.translation ? productResponse.product?.translation[0].name as string : "",
        price: productResponse.product?.price as number,
        translationCode: productResponse.product?.translation ? productResponse.product?.translation[0].translationCode?.toString() as string : "",
    }

    useEffect(() => {

        const fetchData = async () => {
            const data: GetAllCategoriesResponse[] = await categoryService.getAllCategories() as GetAllCategoriesResponse[]
            setCategories(data)

            const data2: GetByIdProductResponse = await productService.getByIdProduct({ id: id })
            setProductResponse(data2)
            initialValues.categoryId = data2.product?.categoryId as string
            initialValues.description = data2.product?.translation ? data2.product?.translation[0].description as string : undefined
            initialValues.isActive = true
            initialValues.name = data2.product?.translation ? data2.product?.translation[0].name as string : ""
            initialValues.price = data2.product?.price as number
            initialValues.translationCode = data2.product?.translation ? data2.product?.translation[0].translationCode?.toString() as string : ""
        }

        fetchData()

    }, [])




    const updateProduct = async (values: IFormValues, formikHelper: FormikHelpers<IFormValues>) => {
        if (values.description?.length == 0)
            values.description = undefined
        await productService.updateProduct({
            id: id,
            description: values.description,
            isActive: values.isActive,
            name: values.name,
            price: values.price,
            translationCode: parseInt(values.translationCode)
        })

        // formikHelper.resetForm()

    }

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: updateProduct
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

                <br />
                <br />

                <Row>
                    <Col>
                        <Button variant='primary' type='submit'>Güncelle</Button>
                    </Col>
                    <Col>

                    </Col>
                    <Col>
                        <Button variant='success' onClick={() => navigate("/admin/products")}>Admin Ürünler Paneline Dön</Button>
                    </Col>
                </Row>
            </Form>


            <br />
            <br />
            <br />

            <Row>
                <Col>
                    <h3>Ürüne Ekstra Dil Seçenekleri</h3>
                    <Button variant='danger' onClick={() => setTranslationModalOpen(true)}>Ekstra Dil</Button>
                </Col>
                <Col>
                    <h3>Ürüne Fotoğraf Ekleme</h3>
                    <Button variant='danger' onClick={() => setFileModalOpen(true)}>Fotoğraf</Button>
                </Col>
            </Row>


            <CustomDialog show={translationModalOpen} onHide={handleTranslationModalClose} bodyTitle='Ürün Dil Seçenekleri (Eklenme)' title='Dil Ayarları'>
                <TranslationForm productId={id as string}/>
            </CustomDialog>

            <CustomDialog show={fileModalOpen} onHide={handleFileModalClose}
             bodyTitle={productResponse.product?.translation ? productResponse.product?.translation[0].name + " Adlı Ürünün Görselleri" : ""} title='Ürün Görselleri'>
                <ImageForm productId={id as string}/>
            </CustomDialog>


        </Container>
    )
}

export default AdminProductDetailsPage