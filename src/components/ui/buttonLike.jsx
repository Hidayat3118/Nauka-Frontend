"use client";
import { useState, useEffect } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import toast from "react-hot-toast";
import { toggleLike } from "@/api/materi/likeMateri";

export default function ButtonLike({ materialId, initialLikes, initiallyLiked }) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(initiallyLiked);

  useEffect(() => {
    // Cek apakah user sudah like dari localStorage
    const likedMaterials = JSON.parse(localStorage.getItem("likedMaterials") || "[]");
    if (likedMaterials.includes(materialId)) {
      setLiked(true);
    }
  }, [materialId]);

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

      let likedMaterials = JSON.parse(localStorage.getItem("likedMaterials") || "[]");

      if (message === "Material liked") {
        setLiked(true);
        likedMaterials.push(materialId);
      } else if (message === "Material unliked") {
        setLiked(false);
        likedMaterials = likedMaterials.filter((id) => id !== materialId);
      }

      localStorage.setItem("likedMaterials", JSON.stringify(likedMaterials));
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
      className="flex items-center gap-1 transition-transform hover:scale-105 text-white cursor-pointer"
    >
      {liked ? (
        <AiFillLike className="text-blue-600" size={22} />
      ) : (
        <AiOutlineLike size={22} />
      )}
      <span className="text-sm">{likes}</span>
    </button>
  );
}
