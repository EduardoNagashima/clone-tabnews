import axios from "axios";
import { MainContext } from "context/context";
import { useContext, useEffect, useState } from "react";

export default function ProfileContent() {
  const { loading, setLoading } = useContext(MainContext);
  const [data, setData] = useState({
    avatar_url: "",
    name: "Eduardo Nagashima",
    bio: "Desenvolvedor Full Stack",
    public_repos: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/users/eduardonagashima`,
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    if (!data.avatar_url) {
      setLoading(true);
      fetchData();
    }
  }, []);

  return loading ? (
    <div className="flex items-center justify-center h-32">
      <div className="loader">
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </div>
  ) : (
    <div className="flex gap-3 justify-between md:flex-row flex-col">
      <img
        className="w-28 h-28 rounded-full mx-auto"
        src={data.avatar_url}
        alt="Profile"
      />
      <div className="dark:text-gray-500 text-gray-100 flex md:items-end items-center flex-col md:text-lg text-sm">
        <h2 className="md:text-2xl text-xl font-bold mt-4 text-center">
          {data.name}
        </h2>
        <p>{data.bio}</p>
        <div className="text-gray-300 dark:text-slate-500">
          <span>Repositórios públicos:</span>
          <span className="ml-1">{data.public_repos}</span>
        </div>
      </div>
    </div>
  );
}
