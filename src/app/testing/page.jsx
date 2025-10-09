"use client";
import { useEffect, useState } from "react";
import { getUserProfile } from "@/api/user/profilApi";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token"); 
        if (!token) {
          console.warn("Token tidak ditemukan, silakan login terlebih dahulu.");
          return;
        }

        const data = await getUserProfile(token);
        setProfile(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  if (!profile) return <p className="text-center mt-10">Memuat profil...</p>;

  return (
    <div className="max-w-md mx-auto bg-white shadow p-6 rounded-lg mt-10 text-center">
      <img
        src={profile.photo_profile}
        alt={profile.name}
        className="w-24 h-24 rounded-full mx-auto object-cover"
      />
      <h2 className="text-xl font-bold mt-4">{profile.name}</h2>
      <p className="text-gray-600">{profile.email}</p>
      <span className="mt-2 inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
        {profile.role}
      </span>
    </div>
  );
}
