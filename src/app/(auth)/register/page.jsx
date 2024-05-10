"use client"
import React, { useState } from "react";
import { Form, Formik } from "formik"
import InputComponent from "../../components/InputComponet"
import ButtonComponent from "../../components/ButtonComponent"
import Link from "next/link";
import * as Yup from "yup"

export default function Register() {
    const [error, setError] = useState("")
    const [isFormSubmitting, setFormSubmitting] = useState(false);

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

                if (result.status === 201) {
                    alert(result.message)
                    window.location.href = "/login"
                } else {
                    renderError(result.message);
                    resetForm();
                }
                setFormSubmitting(false);
            })
        } catch (error) {
            setFormSubmitting(false);
            renderError("Erro ao criar conta, tente mais tarde.")
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
        <div>
            <main className="min-screen">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values }) =>
                        <Form noValidate className="flex-form">
                            <InputComponent
                                name="name"
                                type="name"
                                label="Nome"
                                required
                                placeholder="Seu nome"
                            />

                            <InputComponent
                                name="email"
                                type="email"
                                label="Email"
                                required
                                placeholder="example@gmail.com"
                            />

                            <InputComponent
                                name="password"
                                type="password"
                                label="Senha"
                                autoComplete="off"
                                required
                            />

                            <div className="container-btn-login">
                                <ButtonComponent
                                    type="submit"
                                    text={isFormSubmitting ? "Carregando..." : "Inscrever-se"}
                                    disabled={isFormSubmitting}
                                    className="btn-login"
                                />
                                {!values.name && !values.email && !values.password && error && (
                                    <span className="text-red">{error}</span>
                                )}
                                <span>
                                    Não Possui uma conta ?
                                    <strong>
                                        <Link href="/login" className="subscribe-link">Entre</Link>
                                    </strong>
                                </span>
                            </div>
                        </Form>}
                </Formik>
            </main>
        </div>
    )
}