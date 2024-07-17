import { profileDescriptions } from "pages/portifolio/constants";
import { useEffect, useState, useRef } from "react";

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
    <header>
      <div className="w-full relative h-[100vh] flex">
        <div className="flex m-auto flex-col">
          <div className="text-center">
            <h1 className="text-7xl font-bold font-serif">Eduardo Nagashima</h1>
            <div className="w-[100vw] flex justify-center overflow-hidden">
              <span
                ref={subtitleRef}
                className="text-3xl font-work font-semibold animate-slide"
              >
                {profileDescriptions[index]}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
