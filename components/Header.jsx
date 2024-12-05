import { useEffect, useRef, useState } from "react";
import { profileDescriptions } from "utils";

export default function Header() {
  const [index, setIndex] = useState(0);
  const subtitleRef = useRef(null);

  useEffect(() => {
    const handleAnimationEnd = () => {
      setIndex((prevIndex) => (prevIndex + 1) % profileDescriptions.length);
    };

    const spanElement = subtitleRef.current;

    if (spanElement) {
      spanElement.addEventListener("animationiteration", handleAnimationEnd);
    }

    return () => {
      if (spanElement) {
        spanElement.removeEventListener(
          "animationiteration",
          handleAnimationEnd,
        );
      }
    };
  }, [subtitleRef.current]);

  return (
    <div className="w-full relative h-[100vh] flex flex-col">
      <div className="flex m-auto flex-col">
        <div className="text-center">
          <h1 className="md:text-7xl font-bold font-serif text-6xl">
            Eduardo Nagashima
          </h1>
          <div className="w-[100vw] flex justify-center overflow-hidden">
            <span
              ref={subtitleRef}
              className="md:text-3xl text-2xl font-work font-semibold animate-slide"
            >
              {profileDescriptions[index]}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
