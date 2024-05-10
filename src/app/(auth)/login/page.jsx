"use client"
import React from "react";
import { Form, Formik } from "formik"
import InputComponent from "../../components/InputComponet"
import ButtonComponent from "../../components/ButtonComponent"
import Link from "next/link";
import * as Yup from "yup"

export default function Login() {

    const initialValues = {
        email: "",
        password: ""
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("Digite um e-mail válido")
            .required("O campo e-mail é obrigatório"),
        password: Yup.string().required("O campo senha é obrigatório")
    })

    async function handleSubmit() { }

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
                                    text="Entrar"
                                    className="btn-login"
                                />
                                <span>
                                    Não Possui uma conta ?
                                    <strong>
                                        <Link href="/register" className="subscribe-link">Inscreva-se</Link>
                                    </strong>
                                </span>
                            </div>
                        </Form>}
                </Formik>
            </main>
        </div>
    )
}