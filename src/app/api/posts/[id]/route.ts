import dbConnect from "@/lib/db";
import Category from "@/models/category.model";
import Post from "@/models/post.model";
import Comment from "@/models/comment.model";
import { NextRequest, NextResponse } from "next/server"



export async function GET(request: NextRequest, { params }: any ) {
    try {

        await dbConnect();

        const {id} = params;
        
        const post = await Post.findById(id)
        .populate({path: 'category', model: Category })
        .populate({path: 'comments', model: Comment })
        

        if(!post) {
            return NextResponse.json({ "message": "post not found" }, { status: 404 })
        }

        return NextResponse.json({ post }, { status: 200 })

    } catch (error) {        
        console.log(error)
        return NextResponse.json({ "message": error }, { status: 500 })
    }
}