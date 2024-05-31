"use client"

import React, { useState } from "react";
import { Form, Formik } from "formik"
import InputComponent from "../../components/InputComponet"
import ButtonComponent from "../../components/ButtonComponent"
import Link from "next/link";
import * as Yup from "yup"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Image from "next/image"
import ImagemEstoque from "@/app/images/imagem-estoque.jpg"

export default function Register() {
    const [error, setError] = useState("")
    const [isFormSubmitting, setFormSubmitting] = useState(false);

    const expectedId = process.env.NEXT_PUBLIC_ID_EMPLOYEE;
    const [inputId, setInputId] = useState('');
    const [isUnlocked, setIsUnlocked] = useState(false);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputId(value);

        // Verifica se o ID inserido corresponde ao ID esperado
        if (value === expectedId) {
            setIsUnlocked(true);
        } else {
            setIsUnlocked(false);
        }
    };


    const initialValues = {
        name: "",
        email: "",
        password: ""
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("O campo nome é obrigatório"),
        email: Yup.string()
            .email("Digite um e-mail válido")
            .required("O campo e-mail é obrigatório"),
        password: Yup.string().required("O campo senha é obrigatório")
    })



    async function handleSubmit(values, { resetForm }) {
        setFormSubmitting(true)
        try {
            await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: values.name,
                    email: values.email,
                    password: values.password
                })
            }).then(async (res) => {
                const result = await res.json();

                const notifySuccess = () => toast.success(result.message, {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored'
                });


                if (result.status === 201) {
                    notifySuccess()
                    setTimeout(() => {
                        window.location.href = "/login"
                    }, 3000)
                } else {
                    renderError(result.message);
                    resetForm();
                }
                setFormSubmitting(false);
            })
        } catch (error) {
            renderError("Erro ao criar conta, tente mais tarde.")
        } finally {
            setFormSubmitting(false);

        }
    }

    // mensagem de erro
    function renderError(message) {
        setError(message);
        setTimeout(() => {
            setError("");
        }, 3000);
    }

    return (
        <>
            <ToastContainer />
            <main className="min-screen">
                <div className="container-imagem-estoque-register">
                    <Image
                        src={ImagemEstoque}
                        className="image-estoque image-estoque-resgister"
                    />
                </div>
                <div className="container-form-register">
                    <h1>Crie sua conta</h1>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >


                        {({ values }) => <Form noValidate className="flex-form">

                            <input
                                type="password"
                                id="idInput"
                                value={inputId}
                                placeholder="N.º empresarial"
                                onChange={handleInputChange}
                            />

                            {isUnlocked && (
                                <>
                                    <InputComponent
                                        name="name"
                                        type="name"
                                        label="Nome completo"
                                        required
                                        placeholder="Seu nome" />
                                    <InputComponent
                                        name="email"
                                        type="email"
                                        label="Email"
                                        required
                                        placeholder="example@gmail.com" />
                                    <InputComponent
                                        name="password"
                                        type="password"
                                        label="Senha"
                                        autoComplete="off"
                                        required /><div className="container-btn-login">
                                        <ButtonComponent
                                            type="submit"
                                            text={isFormSubmitting ? "Carregando..." : "Inscrever-se"}
                                            disabled={isFormSubmitting}
                                            className="btn-login" />
                                        {!values.name && !values.email && !values.password && error && (
                                            <span className="text-red">{error}</span>
                                        )}
                                        <span>
                                            Já Possui uma conta ?
                                            <strong>
                                                <Link href="/login" className="subscribe-link">Entre</Link>
                                            </strong>
                                        </span>
                                    </div>
                                </>

                            )}

                        </Form>}
                    </Formik>
                </div>

            </main>

        </>
    )
}