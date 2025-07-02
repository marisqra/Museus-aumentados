const API_URL = "http://localhost:3000/perfis";

export async function listarPerfis() {
  const resposta = await fetch(API_URL);
  return await resposta.json();
}

export async function criarPerfil(novoPerfil) {
  const resposta = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(novoPerfil)
  });

  if (!resposta.ok) {
    throw new Error("Erro ao criar perfil");
  }

  return await resposta.json();
}
