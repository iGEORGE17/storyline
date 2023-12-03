import { Schema, models, model, Document } from "mongoose"


export interface ICategory extends Document {
    name: string
}


const categorySchema: Schema = new Schema<ICategory>({
        name: {
            type: String,
            unique: true,
            required: true,
        }       
    }, {
        timestamps: true,
})


const Category = models.categorys || model<ICategory>("categories", categorySchema)

export default Category