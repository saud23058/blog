"use client";

import { PostCardType } from "@/lib/types";
import { formateDate } from "@/lib/utils";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";



const Search = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<PostCardType[]>([]);

  const searchHandler = async () => {
    try {
      const response = await axios.post(
        `${process.env.PUBLIC_URL}/api/post/search-post`,
        { query: search }
      );
      
      setResults(response.data.posts); 
    } catch (error) {
      console.error("Error searching posts:", error);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-6">
      {/* Search Box */}
      <div className="w-[700px] h-[70px] bg-white mt-3 justify-center border-4 border-black items-center px-3 rounded-xl flex">
        <input
          type="text"
          name="post"
          placeholder="Search for posts"
          className="w-full py-3 text-xl border-none outline-none"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={searchHandler}
          className="bg-black p-3 text-xl text-white rounded-md"
        >
          Search
        </button>
      </div>

      {/* Search Results */}
      <div className="mt-6 w-[700px]">
        {results.length > 0 ? (
          results.map((post) => (
            <div
              key={post._id}
              className="bg-white shadow-lg rounded-lg p-5 mb-4"
            >
              {/* Image */}
              <Image
                src={post.imageUrl}
                alt={post.title}
                width={700}
                height={160}
                className="w-full h-40 object-cover rounded-md"
              />
              
              {/* Title & Description */}
              <h2 className="text-2xl font-bold mt-3">{post.title}</h2>
              <p className="text-gray-600">{post.description}</p>

              {/* NEW: Detail Section */}
              <p className="mt-2 text-gray-800">{post.detail}</p>

              {/* Meta Info */}
              <div className="mt-2 flex justify-between text-sm text-gray-500">
                <span>Category: {post.category}</span>
                <span>Views: {post.views}</span>
                <span>{formateDate(post.createdAt)}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center mt-4">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default Search;
