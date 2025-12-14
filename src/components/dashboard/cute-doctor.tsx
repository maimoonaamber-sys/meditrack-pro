'use client';

import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';

export default function CuteDoctor() {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('/lottie/doctor.json')
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error('Error loading animation:', error));
  }, []);

  if (!animationData) {
    return <div className="w-48 h-48 mx-auto"></div>;
  }

  return (
    <div className="w-48 mx-auto">
      <Lottie animationData={animationData} loop />
    </div>
  );
}
