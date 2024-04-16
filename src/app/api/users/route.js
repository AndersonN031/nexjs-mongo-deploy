import { NextResponse } from "next/server";
import connectDB from "../../../libs/mongodb";
import User from "@/models/user";

export async function GET() {
    await connectDB()

    const users = await User.find()
    return NextResponse.json(users)

}

export async function POST(request) {
    await connectDB()
    const data = await request.json()

    const users = await User.create(data)
    return NextResponse.json(users)
}
