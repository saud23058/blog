"use client";
import MDEditor from "@uiw/react-md-editor";
import React, { useState } from "react";

const CreatePostForm = () => {
  const [detail, setDetail] = useState("");
  const isPending = false;
  return (
    <form action={() => {}} className="mt-12 mb-8 flex flex-col">
      <div className="flex flex-col w-[583px] h-max pb-3">
        <label className="font-bold text-xl mb-2" htmlFor="title">
          Title
        </label>
        <input
          id="title"
          type="text"
          placeholder="Enter your post title"
          required
          className="outline-none border-4 text-xl border-black p-4 rounded-full"
        />
      </div>
      <div className="flex flex-col w-[583px] h-max pb-3">
        <label className="font-bold text-xl mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          placeholder="Enter your post description"
          required
          className="outline-none border-4 text-xl border-black p-4 rounded-3xl"
        />
      </div>
      <div className="flex flex-col w-[583px] h-max  pb-3">
        <label className="font-bold text-xl mb-2" htmlFor="imageUrl">
          Image Link
        </label>
        <input
          id="imageUrl"
          type="text"
          placeholder="Paste your post url"
          required
          className="outline-none border-4 text-xl border-black p-4 rounded-full"
        />
      </div>
      <div className="flex flex-col w-[583px] h-max pb-3">
        <label className="font-bold text-xl mb-2" htmlFor="category">
          Category
        </label>
        <input
          id="category"
          type="text"
          placeholder="like Health, Technology ...."
          required
          className="outline-none border-4 text-xl border-black p-4 rounded-full"
        />
      </div>
      <div className="flex flex-col w-[583px] h-max pb-3">
        <label className="font-bold text-xl mb-2" htmlFor="detail">
          Details
        </label>
        <MDEditor
          data-color-mode="light"
          value={detail}
          onChange={(e) => {
            setDetail(e as string);
          }}
          id="detail"
          height={350}
          preview="edit"
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{
            placeholder: "Provide the detailed information about the post",
          }}
        />
      </div>
      <button disabled={isPending} className="mt-4 mb-5 bg-pink-500 p-4 text-xl font-bold rounded-xl border-black border-4">
        {isPending ? 'Submitting....':'Submit your post'}
      </button>
    </form>
  );
};

export default CreatePostForm;
