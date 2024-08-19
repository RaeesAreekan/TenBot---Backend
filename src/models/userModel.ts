import mongoose, { Document, Schema } from 'mongoose'

// We extend the document due to mongoose version
interface IUser extends Document {
    _id: string;
    email: string;
    password: string;
  }


const userSchema: Schema = new Schema({
    _id: { type: Schema.Types.ObjectId, auto: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  })


const User = mongoose.model<IUser>('User', userSchema)

export default User



