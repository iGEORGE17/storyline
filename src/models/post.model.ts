import { Schema, models, model, Types, Document } from "mongoose"
import { IUser } from "./user.model"
import { ICategory } from "./category.model";
import { IComment } from "./comment.model";


export interface IPost extends Document {
    title: string;
    text: string;
    postImg?: string;
    tags: string;
    category: ICategory;
    comments?: IComment[];
    author: IUser;
}


const postSchema: Schema = new Schema<IPost>({
        title: {
            type: String,
            unique: true,
            required: true,
        },
        text: {
            type: String,
            required: true        
        },
        category: {
            type: Types.ObjectId,
            ref: 'categories'
        },
        comments: [
            { 
                type: Types.ObjectId, 
                ref: 'comments' 
            }
        ],
        postImg: {
            type: String,
            default: ""        
        },
        tags: {
            type: String,       
        },
        author: {
            type: Types.ObjectId,
            ref: "users"
        },        
    }, {
        timestamps: true,
        // toJSON: {
        //     virtuals: true
        // },
        // toObject: {
        //     virtuals: true
        // }
})


const Post = models.posts || model<IPost>("posts", postSchema)

export default Post