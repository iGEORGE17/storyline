import dbConnect from "@/lib/db";
import Category from "@/models/category.model";
import { NextRequest, NextResponse } from "next/server";

dbConnect()

export async function GET(request: NextRequest) {

    try {
        
        const categories = await Category.find({})
    
        if(!categories) {
            return NextResponse.json({ message: "categories not found" }, { status: 404 })
        }

        return NextResponse.json({ categories }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ Error: error }, { status: 500 })
    }

}

export async function POST(request: NextRequest) {

    const { name } = await request.json();
    const category = await Category.create({ name })    
    
    return NextResponse.json({ category }, { status: 201 })
       

}