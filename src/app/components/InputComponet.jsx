"use client"
import React from "react";
import { ErrorMessage, Field } from "formik"

export default function InputComponent({ name, label, type, required, ...props }) {
    return (
        <div className="flex-col">
            <div className="capitalize">
                <div className="div-labels">
                    <span>{label || name} </span>
                    <span className="text-red">{required && "*"}</span>
                </div>
                <Field
                    name={name}
                    type={type}
                    className="input-login"
                    {...props}
                />
            </div>
            <div className="text-red">
                <ErrorMessage name={name} />
            </div>
        </div>
    )
}