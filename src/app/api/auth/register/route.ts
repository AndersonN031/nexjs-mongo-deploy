import User from "@/models/user"
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/libs/mongodb";

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json();
        await connectDB();
        // verificando se o e-mail já está cadastrado
        const emailExists = await User.findOne({ email });

        if (emailExists) {
            return NextResponse.json({
                message: "E-mail já cadastrado!", email,
                status: 409,
            })
        }

        // criptografando a senha
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUSer = new User({
            name,
            email,
            password: hashedPassword
        })

        await newUSer.save();

        return NextResponse.json({
            message: "Usuário criado com sucesso!",
            status: 201
        })

    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error)
        return NextResponse.json({
            error: "Erro ao cadastrar usuário.",
            status: 500,
        })

    }
}