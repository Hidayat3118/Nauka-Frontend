"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export default function SpinnerButton() {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true); // mulai loading

    // simulasi proses (misalnya panggilan API)
    setTimeout(() => {
      setLoading(false); // selesai loading
    }, 3000); // 2 detik
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full mt-96">
      <Button
        onClick={handleClick}
        disabled={loading} // nonaktifkan tombol saat loading
        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold w-80"
      >
        {loading ? (
          <>
            <Spinner className="h-4 w-4" />
            Loading...
          </>
        ) : (
          "Login"
        )}
      </Button>
    </div>
  );
}
