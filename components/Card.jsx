import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import PropTypes from "prop-types";

export default function Card({ profileName }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    avatar_url: "https://avatars.githubusercontent.com/u/0?v=4",
    name: "Eduardo Nagashima",
    bio: "Desenvolvedor de Software",
    public_repos: 0,
  });
  const [inView, setInView] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/users/${profileName}`,
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [profileName]);

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

  const cardAnimation = inView
    ? "transform md:translate-x-0 opacity-100"
    : "transform md:-translate-x-10 opacity-0";

  return (
    <div
      ref={cardRef}
      className={`transition-transform duration-1000 dark:bg-gray-100 bg-blue-950 rounded shadow-xl max-w-[35rem] min-w-[16.2rem] h-auto p-7 m-6 ${cardAnimation}`}
    >
      {loading ? (
        <div className="flex items-center justify-center h-32">
          <div className="loader">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between md:flex-row flex-col">
          <div>
            <img
              className="w-32 h-32 rounded-full mx-auto"
              src={data.avatar_url}
              alt="Profile"
            />
          </div>
          <div className="dark:text-gray-500 text-gray-100">
            <h2 className="text-xl font-bold mt-4">{data.name}</h2>
            <p>{data.bio}</p>
            <div className="text-gray-300 dark:text-slate-500">
              <span>Repositórios públicos:</span>
              <span className="ml-1">{data.public_repos}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

Card.propTypes = {
  profileName: PropTypes.string,
};
