import React, { Suspense } from "react";
import markdown from "markdown-it";
import Link from "next/link";
import View from "@/app/component/View";

const md = markdown();

const PostDetails = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <div className="w-full bg-pink-600 min-h-[330px] pattern flex justify-center items-center flex-col py-10 px-6">
        <div className="w-max bg-yellow-400 mb-4 rounded-md  px-4 p-3 text-center">
          January, 14 2025
        </div>
        <h1 className="w-max bg-black rounded-md  text-3xl px-3 py-8 text-white font-extrabold">
          Post Title
        </h1>
        <p
          className="mt-3 text-white h-36 w-96 overflow-hidden text-ellipsis"
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
          }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde nesciunt
          repudiandae cumque dignissimos eius velit provident quidem obcaecati,
          officia sint libero eos similique reprehenderit nam praesentium optio.
          Praesentium, ullam dolor.
        </p>
      </div>

      <section className="w-full !min-h-[530px] flex flex-col justify-center items-center mb-12">
        <div className="w-[710px] h-[383px] mt-8 bg-green-300 rounded-lg">
          Image
        </div>

        <div className="flex mt-8 w-[710px] justify-between items-center px-4">
          <div className="flex flex-col items-center">
            <Link
              href={`/post/author-details/${1}`}
              className="w-14 bg-black h-14 rounded-full mt-4 text-white flex justify-center items-center"
            >
              S
            </Link>
            <span>Author name</span>
          </div>
          <span className="bg-pink-300 w-max rounded-lg text-center p-2">
            Category
          </span>
        </div>

        <h1 className="font-bold text-[30px]">Details</h1>

        
        <Suspense fallback={<div>Loading...</div>}>
          <View id={params.id} />
        </Suspense>
      </section>
    </>
  );
};

export default PostDetails;
