
"use client";

import Lottie from "lottie-react";
import { useEffect, useState } from "react";

export default function CuteDoctor() {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("/lottie/doctor.json")
      .then((res) => res.json())
      .then(setAnimationData)
      .catch(console.error);
  }, []);

  if (!animationData) return null;

  return (
    <div className="w-48 mx-auto">
      <Lottie animationData={animationData} loop />
    </div>
  );
}
