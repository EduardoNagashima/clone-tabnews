/* eslint-disable */
import { profileDescriptions } from "utils";
import { useEffect, useState, useRef } from "react";
import ThemeSwitcher from "./ThemeSwitcher";

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
      <ThemeSwitcher className={"flex justify-end p-5"} />
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
  );
}
