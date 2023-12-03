import { Schema, models, model, Document } from "mongoose"


export interface IComment extends Document {
    name: string;
    text: string;
}


const commentSchema: Schema = new Schema<IComment>({
        name: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        }               
    }, {
        timestamps: true,
})


const Comment = models.comments || model<IComment>("comments", commentSchema)

export default Comment