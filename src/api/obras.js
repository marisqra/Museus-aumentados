import { database } from "./firebase";
import { ref, set, push, get, remove } from "firebase/database";


export async function criarObra(obra) {
  const novaObraRef = push(ref(database, "obras"));
  await set(novaObraRef, obra);
  return { id: novaObraRef.key, ...obra };
}


export async function listarObras() {
  const snapshot = await get(ref(database, "obras"));
  const data = snapshot.val();

  if (!data) return [];
  return Object.entries(data).map(([id, obra]) => ({ id, ...obra }));
}

export async function excluirObra(id) {
  await remove(ref(database, `obras/${id}`));
}


export async function editarObra(obra) {
  if (!obra.id) throw new Error("Obra sem ID para edição.");
  const { id, ...dados } = obra;
  const obraRef = ref(database, `obras/${id}`);
  await set(obraRef, dados);
}

