"use client";

import { createArticle } from "@/app/store/api-calls/article-api";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const CreateArticle = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState();
  const [shownImage, setShownImage] = useState();

  const dispatch = useDispatch();

  // Handle Showen Image On The Page Once Uploaded
  const handleImageUpload = (e: any) => {
    if (e) {
      const previewURL: any = URL.createObjectURL(e);
      setShownImage(previewURL);
      setImage(e);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!image) return;

    // Convert image file to base64
    const reader = new FileReader();
    reader.readAsDataURL(image);

    reader.onloadend = async () => {
      try {
        dispatch(
          createArticle({
            title,
            description,
            image: reader.result as string, // Send base64 image data
          })
        );

        setTitle("");
        setDescription("");
      } catch (error) {
        console.log(`From Client Create Article ${error}`);
      }
    };
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <label htmlFor="title">Title</label>
          <input
            className="border outline-none"
            type="text"
            id="title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="descriptio">Descriptio</label>
          <input
            className="border outline-none"
            type="text"
            id="description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="title">Title</label>
          <input
            className="border outline-none"
            type="file"
            onChange={(e) => handleImageUpload(e.target.files![0])}
          />
        </div>
        <button type="submit">Create Article</button>
      </form>
    </div>
  );
};

export default CreateArticle;
