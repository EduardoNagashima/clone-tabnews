import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  // useEffect(() => {
  //         router.push('/portifolio');
  // }, []);

  return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
}
