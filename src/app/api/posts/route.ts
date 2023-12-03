import dbConnect from "@/lib/db";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

dbConnect()




export async function GET(request: NextRequest) {
    await User.find({})
            .then((posts) => NextResponse.json({ posts }, { status: 200 }))
            .catch(err => NextResponse.json({ Error: err }, { status: 400 }))
}


export async function POST(request: NextRequest) {
    const { title, text, tags, category } = await request.json();
}