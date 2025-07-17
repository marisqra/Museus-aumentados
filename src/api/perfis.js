import { auth, database } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set, onValue, remove } from "firebase/database";


export async function criarPerfil({ nome, email }) {
  const senhaPadrao = "senha123";

  const credenciais = await createUserWithEmailAndPassword(auth, email, senhaPadrao);
  const uid = credenciais.user.uid;

  const perfilRef = ref(database, `perfis/${uid}`);
  await set(perfilRef, {
    nome,
    email,
    permissoes: ["editor"]
  });

  return { id: uid, nome, email, permissoes: ["editor"] };
}


export async function listarPerfis() {
  return new Promise((resolve, reject) => {
    const perfisRef = ref(database, "perfis");

    onValue(
      perfisRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const lista = Object.entries(data).map(([id, perfil]) => ({
            id,
            ...perfil,
          }));
          resolve(lista);
        } else {
          resolve([]);
        }
      },
      (error) => {
        reject(error);
      }
    );
  });
  
}

export async function removerPerfil(id) {
  if (!id) throw new Error("ID do perfil não fornecido");

  const perfilRef = ref(database, `perfis/${id}`);
  await remove(perfilRef);
}