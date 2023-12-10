import { Schema, models, model, Document, Types } from "mongoose"
import { IPost } from "./post.model";


export interface IComment extends Document {
    name: string;
    text: string;
    post: IPost;
}


const commentSchema: Schema = new Schema<IComment>({
        name: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        post: {
            type: Types.ObjectId,
            ref: 'posts'
        }             
    }, {
        timestamps: true,
})


const Comment = models.comments || model<IComment>("comments", commentSchema)

export default Comment