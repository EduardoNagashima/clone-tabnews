import React from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import Button from "./Button";

// TODO fazer os redirecionamentos corretamente, tudo na mesma pagina, só vai redirecionar para o lugar certo.

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export default function HeaderMenu() {
  return (
    <div className="fixed inset-x-0 top-0 z-10">
      <ThemeSwitcher
        className={"absolute flex justify-end p-5 z-[2000] right-0"}
      />
      <div className="p-3 font-semibold flex gap-3 items-center m-auto bg-blue-100 dark:bg-black">
        <Button onClick={scrollToTop}>Home</Button>
        <Button>Sobre Mim</Button>
        <Button>Projetos</Button>
        <Button>Habilidades</Button>
        <Button>Contato</Button>
      </div>
    </div>
  );
}
