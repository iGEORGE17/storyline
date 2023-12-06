import { Schema, models, model, Document } from "mongoose"


export interface IUser extends Document {
    username: string,
    email: string,
    profileImg: string,
    isAdmin: boolean;
}


const userSchema: Schema = new Schema<IUser>({
        username: {
            type: String,
            unique: true,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true       
        },
        profileImg: {
            type: String,
            default: ""        
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false       
        },
    }, {
        timestamps: true,
        toJSON: {
            virtuals: true
        },
        toObject: {
            virtuals: true
        }
})


userSchema.virtual('posts', {
    ref: 'Post',
    foreignField: 'author',
    localField: '_id'
})


const User = models.users || model<IUser>("users", userSchema)

export default User