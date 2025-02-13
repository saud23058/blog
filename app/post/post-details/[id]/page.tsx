import React, { Suspense } from "react";
import markdown from "markdown-it";
import Link from "next/link";
import View from "@/app/component/View";
import { formateDate } from "@/lib/utils";
import Image from "next/image";
import { auth } from "@/auth";
const md = markdown();

const PostDetails = async ({ params }: { params: { id: string } }) => {
  const res = await fetch(`${process.env.PUBLIC_URL}/api/post/post-details?id=${params.id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return <div className="text-red-500">Error loading post details.</div>;
  }

  const data = await res.json();
  const post = data.post; 
  const session = await auth();
  const { name, id, image } = session?.user || {};
  return (
    <>
      <div className="w-full bg-pink-600 min-h-[330px] pattern flex justify-center items-center flex-col py-10 px-6">
        <div className="w-max bg-yellow-400 mb-4 rounded-md px-4 p-3 text-center">
          {formateDate(post.createdAt)}
        </div>
        <h1 className="w-max bg-black rounded-md text-3xl px-3 py-8 text-white font-extrabold">
          {post.title}
        </h1>
        <p
          className="mt-3 text-white h-36 w-96 overflow-hidden text-ellipsis"
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
          }}
        >
          {post.description}
        </p>
      </div>

      <section className="w-full !min-h-[530px] flex flex-col justify-center items-center mb-12">
        <div className="w-[710px] h-[383px] mt-8 bg-green-300 rounded-lg">
          <Image src={post.imageUrl} width={710} height={383} alt={post.title} className="w-full h-full rounded-lg object-cover" />
        </div>

        <div className="flex mt-8 w-[710px] justify-between items-center px-4">
          <div className="flex flex-col items-center">
            <Link
            
             href={`/post/author-details/${id}`}
             className="w-14 h-14 rounded-full mt-4 text-white flex justify-center items-center"
           >
             <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200">
               <Image
                 src={image!}
                 height={56} 
                 width={56}
                 alt={name?.charAt(0) || ""}
                 className="w-full h-full object-cover"
               />
             </div>
           </Link>
           
            <span>{name }</span>
          </div>
          <span className="bg-pink-300 w-max rounded-lg text-center p-2">
            {post.category}
          </span>
        </div>

        <h1 className="font-bold text-[30px]">Details</h1>

        <div
          className="mt-4 text-lg"
          dangerouslySetInnerHTML={{ __html: md.render(post.detail) }}
        />

        <Suspense fallback={<div>Loading...</div>}>
          <View id={String(post.views)} />
        </Suspense>
      </section>
    </>
  );
};

export default PostDetails;
