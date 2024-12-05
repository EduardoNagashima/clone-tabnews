import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <div className="border-2 border-green-600 mt-10 w-96 m-auto text-center rounded-md p-4 bg-lime-100">
      <h1 className="text-3xl">Status</h1>
      <UpdatedAt />
    </div>
  );
}

function UpdatedAt() {
  const { data, isLoading } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAt = "Carregando...";

  if (!isLoading && data) {
    updatedAt = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  if (isLoading) return <p>{updatedAt}</p>;

  return (
    <>
      <p>Última atualizaçao: {updatedAt}</p>
      <p>
        Versão do banco de dados (PostgreSQL):{" "}
        {data.dependencies.database.version}
      </p>
      <p>
        Máximo de conexões disponíveis:{" "}
        {data.dependencies.database.max_connections}
      </p>
      <p>Conexões abertas: {data.dependencies.database.opened_connections}</p>
    </>
  );
}
