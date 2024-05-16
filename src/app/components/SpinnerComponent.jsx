"use client"
import React from "react";
import { BeatLoader } from "react-spinners";


export default function Spinner() {
    return (
        <div
            className="spinner"
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
            <BeatLoader
                color="#000000"
                speedMultiplier={1}
            />
        </div>
    )
}

