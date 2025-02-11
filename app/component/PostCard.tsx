import { PostCardType } from "@/lib/types";
import { formateDate } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const PostCard = ({ post }: { post: PostCardType }) => {
  const {
    createdAt,
    views,
    author: { _id: authorId, name },
    title,
    description,
    category,
    _id,
    imageUrl,
  } = post;

  return (
    <div className="w-[320px] h-[471px] rounded-[22px] border-black mb-3 border-[5px] bg-white px-6 pt-2 hover:bg-pink-200 cursor-pointer">
      <div className="flex justify-between items-center mt-4 ">
        <span className="bg-pink-300 w-max  rounded-lg text-center text-sm p-2">
          {formateDate(createdAt)}
        </span>
        <span className="text-md">views:{views}</span>
      </div>
      <div className="flex justify-between items-center mt-3 ">
        <div className="flex flex-col">
          <span className="font-bold">{name}</span>
          <span className="font-bold text-xl">{title}</span>
        </div>
        <Link href={`/author/${authorId}`}>
          <div className="w-12 h-12 bg-black rounded-full"></div>
        </Link>
      </div>
      <p className="mt-6 text-gray-600">{description}</p>
      <Link href={`/post/post-detail/${_id}`}>
        <div
          className="w-[256px] h-[164px] mt-3 bg-yellow-500 rounded-[22px] bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
      </Link>
      <div className="flex justify-between items-center mt-4">
        <h3>{category}</h3>
        <button className="bg-black w-20 p-3  rounded-2xl text-white">
          <Link href={`/post/post-details/${1}`}>Details</Link>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
