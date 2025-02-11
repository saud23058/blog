import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  image: string;
  posts: string[];
  bio: string;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique:true,
  },
  password: {
    type: String,
    minlength:8
  },
  image: {
    type: String,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  bio: {
    type:String
  }

},
  {
  timestamps:true
}
);

export const userModel =
  mongoose.models.User || mongoose.model("User", userSchema);
