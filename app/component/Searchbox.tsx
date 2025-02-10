"use client"

import React, { useState } from "react";

const Searchbox = () => {
  const [search, setSearch] = useState("");

  //axios logic and pass to the search route
  console.log(search);

  return (
    <div className="w-[700px] h-[70px] bg-white mt-3 justify-center border-4 border-black items-center px-3 rounded-xl flex">
      <input
        type="text"
        name="post"
        placeholder="Search for posts"
        className="w-full py-3 text-xl border-none outline-none"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <button className="bg-black p-3 text-xl text-white rounded-md">
        Search
      </button>
    </div>
  );
};

export default Searchbox;
