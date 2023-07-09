import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import GetAllCategoriesResponse from '../../../contracts/categories/getAllCategories/GetAllCategoriesResponse';
import CategoryService from '../../../services/models/categories/CategoryService';
import CustomSpinner from '../../../components/customSpinner/CustomSpinner';
import { useLoading } from '../../../contex/LoadingContext';

function AdminCategoriesPage() {

    const [categories, setCategories] = useState<GetAllCategoriesResponse[]>([])
    const categoryService: CategoryService = new CategoryService()
    const loadingContexData = useLoading()
    const fetchData = async () => {
        loadingContexData.setLoadingProgress(true)
        const data: GetAllCategoriesResponse[] = await categoryService.getAllCategories()
        setCategories(data)
        loadingContexData.setLoadingProgress(false)
    }
    useEffect(() => {

        fetchData()

    }, [])
    return (
        <Container>

            <ListGroup>
                {
                    categories.map((item, index) => (

                        <ListGroup.Item action key={index}>
                            {item.translations ? item.translations[0].name : ""}
                        </ListGroup.Item>

                    ))
                }

            </ListGroup>

        </Container>
    )
}

export default AdminCategoriesPage