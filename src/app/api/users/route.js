import connectDB from "../../../libs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";


export async function GET(request) {
    await connectDB()

    const { name } = request;

    let users;

    if (name.id) {
        users = await User.findById(name.id)
    } else {
        users = await User.find
    }

    return NextResponse.json(users)

}

export async function POST(request) {
    await connectDB()
    const data = await request.json()

    const users = await User.create(data)
    return NextResponse.json(users)
}
