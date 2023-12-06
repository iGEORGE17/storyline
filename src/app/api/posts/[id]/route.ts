import Post from "@/models/post.model";
import { NextRequest, NextResponse } from "next/server"


export async function GET(request: NextRequest, { params }: any ) {
    try {
        const {id} = params;
        
        const post = await Post.findById(id).populate("category")

        if(!post) {
            return NextResponse.json({ "message": "post not found" }, { status: 404 })
        }

        return NextResponse.json({ post }, { status: 200 })

    } catch (error) {        
        return NextResponse.json({ "message": error }, { status: 500 })
    }
}