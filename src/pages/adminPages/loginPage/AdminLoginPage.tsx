import React, { useEffect, useState } from 'react'
import { FormikHelpers, useFormik } from 'formik'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';
import LoginService from '../../../services/models/login/LoginService';
import LoginResponse from '../../../contracts/login/LoginResponse';
import { useLoading } from '../../../contex/LoadingContext';
import Admin from '../../../constDatas/AdminConst';

interface IFormValues {
    email: string
    password: string
}

function AdminLoginPage() {
    const loadingDataContext = useLoading()
    const navigate = useNavigate()
    const loginService: LoginService = new LoginService()
    const initialValues: IFormValues = {
        email: "",
        password: ""
    }


    const login = async (values: IFormValues, formikHelper: FormikHelpers<IFormValues>)=>{
        loadingDataContext.setLoadingProgress(true)
        let response : LoginResponse=  await loginService.login({email:values.email, password:values.password}) as LoginResponse
        loadingDataContext.setLoadingProgress(false)
        formikHelper.resetForm()
      
        
        if(response){
            localStorage.setItem("accessToken", response.responseDto.data.accessToken);
            localStorage.setItem("refreshToken", response.responseDto.data.refreshToken);
            Admin.isAdmin = true
            navigate("/")
        }

    }

    
    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: login
    })

   

    return (
        <Container>
            <Form onSubmit={formik.handleSubmit}>


                
                <FloatingLabel
                    label="Email"
                    className="mb-3"
                >
                    <Form.Control type="email" name='email' onChange={formik.handleChange} placeholder="Email" value={formik.values.email} />
                </FloatingLabel>

                <FloatingLabel
                    label="Şifre"
                    className="mb-3"
                >
                    <Form.Control type="password" name='password' onChange={formik.handleChange} placeholder="Şifre" value={formik.values.password} />
                </FloatingLabel>

                
                <Row>
                    <Col>
                        
                    </Col>
                    <Col>
                        <Button variant='primary' type='submit'>Giriş</Button>
                    </Col>
                    <Col>
                       
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}

export default AdminLoginPage