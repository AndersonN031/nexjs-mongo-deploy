"use client"
import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik"
import InputComponent from "../../components/InputComponet"
import ButtonComponent from "../../components/ButtonComponent"
import Link from "next/link";
import * as Yup from "yup"
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image"
import ImagemEstoque from "@/app/images/imagem-estoque.jpg"
import ImagemVetorLogin from "@/app/images/vetor-login.jpg"
import mediaqueries from "../../styles/mediaqueries.module.css"
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Login() {
    const [error, setError] = useState("")
    const [isFormSubmitting, setFormSubmitting] = useState(false);
    const router = useRouter();
    const { status } = useSession();

    // Verificando status da sessão. Se o usuários estiver autenticado ele é redirecionado para tela inicial.
    useEffect(() => {
        if (status === "authenticated") {
            router.push("/")
        }
    }, [status, router]);


    if (status === "unauthenticated") {
        router.push("/login")
    }

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

    async function handleSubmit(values, { resetForm }) {
        setFormSubmitting(true);
        try {
            signIn("Credentials", { ...values, redirect: false }).then(
                ({ error }) => {
                    if (!error) {
                        router.push("/")
                    } else {
                        renderError(error.replace("Error: ", ""))
                        resetForm();
                    }
                    setFormSubmitting(false);
                }
            )


        } catch (error) {
            setFormSubmitting(false);
        }
    }

    function renderError(msg) {
        setError(msg);
        setTimeout(() => {
            setError("");
        }, 3000);
    }

    return (

        <main className={`min-screen ${mediaqueries.minScreen}`}>
            <div className={`container-form-login ${mediaqueries.containerFormLogin}`}>
                <h1>Faça login na sua conta</h1>
                <Image
                    src={ImagemVetorLogin}
                    width={250}
                    height={250}
                    className={mediaqueries.imageVetor}
                />
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
                                placeholder="funcionario@gmail.com"
                                className="input-email"
                            />


                            <InputComponent
                                name="password"
                                type="password"
                                label="Senha"
                                autoComplete="off"
                                placeholder="senha"
                                required
                            />
                            <div className="container-btn-login">
                                <ButtonComponent
                                    type="submit"
                                    text={isFormSubmitting ? "carregando..." : "Entrar"}
                                    disabled={isFormSubmitting}
                                    className="btn-login"
                                />
                                {!values.email && !values.password && error && (
                                    <span className="text-red">{error}</span>
                                )}
                                <span>
                                    Não Possui uma conta ?
                                    <strong>
                                        <Link href="/register" className="subscribe-link">Inscreva-se</Link>
                                    </strong>
                                </span>
                            </div>
                        </Form>}
                </Formik>
            </div>
            <div className={`container-imagem-estoque ${mediaqueries.containerImageEstoque}`}>
                <Image
                    src={ImagemEstoque}
                    className={`image-estoque ${mediaqueries.imageEstoque}`}
                />
            </div>
        </main>

    )
}