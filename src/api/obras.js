const API_BASE_URL = "http://localhost:3000";

export async function listarObras() {
  const response = await fetch(`${API_BASE_URL}/obras`);
  if (!response.ok) {
    throw new Error("Erro ao listar obras.");
  }
  return response.json();
}

export async function criarObra(novaObra) {
  const response = await fetch(`${API_BASE_URL}/obras`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(novaObra),
  });
  if (!response.ok) {
    throw new Error("Erro ao criar obra.");
  }
  return response.json();
}

export async function removerObra(id) {
  const response = await fetch(`${API_BASE_URL}/obras/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Erro ao remover obra.");
  }
  return;
}

export async function atualizarObra(id, obraAtualizada) {
  const response = await fetch(`${API_BASE_URL}/obras/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obraAtualizada),
  });
  if (!response.ok) {
    throw new Error("Erro ao atualizar obra.");
  }
  return response.json();
}