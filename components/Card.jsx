import React, { useState, useEffect, useRef, useMemo } from "react";
import PropTypes from "prop-types";

export default function Card({ className, animationside, children }) {
  const [inView, setInView] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    });

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const animation = useMemo(() => {
    switch (animationside) {
    case "left":
      return "transform -translate-x-80 opacity-100";
    case "right":
      return "transform translate-x-80 opacity-100";
    case "top":
      return "transform -translate-y-80 opacity-100";
    case "bottom":
      return "transform translate-y-80 opacity-100";
    default:
      return "transform -translate-x-80 opacity-100";
    }
  }, [animationside]);

  const cardAnimation = inView
    ? "transform translate-x-0 opacity-100"
    : `transform ${animation} opacity-0`;

  return (
    <div
      ref={cardRef}
      className={`transition-transform duration-1000 dark:bg-gray-100 bg-blue-950 rounded shadow-xl max-w-[50rem] min-w-[16.2rem] h-auto p-6 m-6 ${cardAnimation} ${className}`}
    >
      {children}
    </div>
  );
}

Card.propTypes = {
  className: PropTypes.string,
  animationside: PropTypes.string,
  children: PropTypes.node,
};
