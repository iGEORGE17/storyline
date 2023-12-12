import Post from "@/models/post.model";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest, { params }: any) {
    try {
        const {id} = params;
        
        const post = await Post.findById(id)
        

        if(!post) {
            return NextResponse.json({ "message": "post not found" }, { status: 404 })
        }


        const similarPosts = await Post.find({
            tags: { $in: post.tags }, // Find posts with at least one common tag
            _id: { $ne: id }, // Exclude the current post
            }).limit(5)        


        return NextResponse.json({ similarPosts }, { status: 200 })

    } catch (error) {        
        return NextResponse.json({ "message": error }, { status: 500 })
    }    
}