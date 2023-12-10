import Comment from "@/models/comment.model";
import Post from "@/models/post.model";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    try {  

        // const { id } = params

        // const post = await Post.findById(id)

        const comments = await Comment.find({})

        if(!comments) {
            return NextResponse.json({ "message": "no comments available"})
        }

        return NextResponse.json({ "message": "succcess", comments})
        
    } catch (error) {
        return NextResponse.json({ "message": error})
    }
}




export async function POST(request: NextRequest) {
    try {

        const { name, text, postId } = await request.json();

            // Check if the post exists
        const post = await Post.findById(postId);
        if (!post) {
            return NextResponse.json({ "message": 'Post not found' }, { status: 404 });
        }


        const comment = await Comment.create({ name, text, post: postId })

        // Add the comment reference to the post
        post.comments.push(comment._id);
        await post.save();


        return NextResponse.json({ "message": "comment made", comment})
        
    } catch (error) {
        return NextResponse.json({ "message": error})
    }
}