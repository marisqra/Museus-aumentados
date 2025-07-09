// src/api/perfis.js
import { auth, database } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";

// Cria usuário no Auth e salva perfil no Realtime Database
export async function criarPerfil({ nome, email }) {
  const senhaPadrao = "senha123"; // ou gere uma aleatória

  // 1. Cria o usuário no Firebase Auth
  const credenciais = await createUserWithEmailAndPassword(auth, email, senhaPadrao);
  const uid = credenciais.user.uid;

  // 2. Salva os dados no Realtime Database
  const perfilRef = ref(database, `perfis/${uid}`);
  await set(perfilRef, {
    nome,
    email,
    permissoes: ["editor"] // ou "adm", dependendo da lógica
  });

  // Retorna os dados usados
  return { id: uid, nome, email, permissoes: ["editor"] };
}
