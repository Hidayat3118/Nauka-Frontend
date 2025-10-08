"use client";
import { useState } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import toast from "react-hot-toast";
import { toggleLike } from "@/api/materi/likeMateri";

export default function ButtonLike({ materialId, initialLikes, initiallyLiked }) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(initiallyLiked);

  const handleLike = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Silakan login dulu untuk menyukai materi ini");
      return;
    }

    try {
      const res = await toggleLike(materialId, token);
      const message = res.message;
      const newLikes = res.data.likes;

      if (message === "Material liked") {
        setLiked(true);
      } else if (message === "Material unliked") {
        setLiked(false);
      }

      setLikes(newLikes);
      toast.success(message);
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan saat menyukai materi");
    }
  };

  return (
    <button
      onClick={handleLike}
      className="flex items-center gap-1 transition-transform hover:scale-105 text-white"
    >
      {liked ? (
        <AiFillLike className="text-green-500" size={22} />
      ) : (
        <AiOutlineLike size={22} />
      )}
      <span className="text-sm">{likes}</span>
    </button>
  );
}
