
'use client';

import Lottie from "lottie-react";
import doctorAnimation from "@/assets/doctor.json";

export default function CuteDoctor() {
  return (
    <div className="w-48 mx-auto">
      <Lottie animationData={doctorAnimation} loop />
    </div>
  );
}
