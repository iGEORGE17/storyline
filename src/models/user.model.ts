import { Schema, models, model, Document } from "mongoose"


export interface IUser extends Document {
    username: string,
    email: string,
    profileImg: string
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
        // password: {
        //     type: String,
        //     required: true       
        // },
    }, {
        timestamps: true,
        toJSON: {
            virtuals: true
        },
        toObject: {
            virtuals: true
        }
})


const User = models.users || model<IUser>("users", userSchema)

export default User