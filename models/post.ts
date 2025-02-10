import mongoose, { Document,Schema } from "mongoose";

interface IPost extends Document {
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  views: number;
  author: {
    id: string,
    name:string
  }
}

const postSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    imageUrl: {
      type: String,
    },
    views: {
      type: Number,
      default: 0,
    },
    category: {
      type:String
    },
    author: {
      id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

export const PostModel =
  mongoose.models.Post || mongoose.model("Post", postSchema);
