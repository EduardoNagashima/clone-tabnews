import { useEffect, useState } from "react";

export default function Header() {
  const [index, setIndex] = useState(0);
  const texts = ["Desenvolvedor", "Programador", "Pai de pet"];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((index) => (index + 1) % texts.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header>
      <div className="w-full relative h-[100vh] flex bg-gradient-custom">
        <div className="flex m-auto flex-col">
          <div className="text-center">
            <h1 className="text-7xl font-bold font-serif">Eduardo Nagashima</h1>
            <span className="text-3xl font-work font-medium textGradient">
              {texts[index]}
            </span>
          </div>
        </div>
        {/* TODO ALIGN THIS CORRECLY ON THE CENTER */}
        <span
          style={{
            fontSize: "50px",
            textAlign: "center",
            color: "#fff",
            position: "absolute",
            bottom: "10px",
            left: "50%",
          }}
          class="material-symbols-outlined"
        >
          keyboard_arrow_down
        </span>
      </div>
    </header>
  );
}
