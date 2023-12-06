import dbConnect from "@/lib/db";
import Category from "@/models/category.model";
import Post from "@/models/post.model";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";


dbConnect()




export async function GET(request: NextRequest) {
    try {
        
        const posts = await Post.find({})
        .populate({ path: 'author', model: User })
        .populate({ path: 'category', model: Category })

        if(!posts) {
           return NextResponse.json({ "message": "posts not found" }, { status: 404 })
        }

        return NextResponse.json({ posts }, { status: 200 })

    } catch (error) {       
        console.log(error) 
        return NextResponse.json({ "message": error }, { status: 500 })
    }
}


export async function POST(request: NextRequest) {

    try {
    
        const { title, text, tags, category, author } = await request.json();

        const post = await Post.create({ title, text, tags, category, author });

        return NextResponse.json({ message: "post created successfully", post}, { status: 201 })
    
        
    } catch (error) {
            return NextResponse.json({ message: error }, { status: 500 })
    }




}