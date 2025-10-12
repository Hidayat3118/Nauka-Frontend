"use client";
import { useState } from "react";
import Step1Role from "@/components/step/step1Role";
import Step2Upload from "@/components/step/step2Upload";
import Step3Profile from "@/components/step/step3Profil";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState("");
  const [file, setFile] = useState(null);
  const router = useRouter();

  return (
    <div className="min-h-screen w-full flex lg:items-center justify-center bg-primary">
      

      {step === 1 && (
        <Step2Upload
          onNext={(uploadedFile) => {
            setFile(uploadedFile);
            setStep(2);
          }}
          // function kembali
          // kembali={() => {
          //   setStep(1);
          // }}
        />
      )}

      {step === 2 && (
        <Step3Profile
          onNext={() => {
            alert("selamat sudah berhasil");
          }}
          // kembali
          kembali={() => {
            setStep(1);
          }}
        />
      )}
    </div>
  );
}
