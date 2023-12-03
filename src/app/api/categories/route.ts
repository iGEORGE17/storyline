import dbConnect from "@/lib/db";
import Category from "@/models/category.model";
import { NextRequest, NextResponse } from "next/server";

dbConnect()




export async function GET(request: NextRequest) {
    await Category.find({})
            .then((categoriess) => NextResponse.json({ categoriess }, { status: 200 }))
            .catch(err => NextResponse.json({ Error: err }, { status: 400 }))
}