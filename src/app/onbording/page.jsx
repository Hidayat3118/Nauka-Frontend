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
    <div className="min-h-screen w-full flex lg:items-center justify-center bg-slate-900">
      {step === 1 && (
        <Step1Role
          onNext={(selectedRole) => {
            setRole(selectedRole);
            setStep(2);
          }}
        />
      )}

      {step === 2 && (
        <Step2Upload
          onNext={(uploadedFile) => {
            setFile(uploadedFile);
            setStep(3);
          }}
          // function kembali
          kembali={() => {
            setStep(1);
          }}
        />
      )}

      {step === 3 && (
        <Step3Profile
          onNext={() => {
            alert("selamat sudah berhasil");
          }}
          // kembali
          kembali={() => {
            setStep(2);
          }}
        />
      )}
    </div>
  );
}
