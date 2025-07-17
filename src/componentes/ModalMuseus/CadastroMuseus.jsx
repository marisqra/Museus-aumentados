import { useState } from "react";
import { ref, push } from "firebase/database";
import { database } from "../../api/firebase";
import CreatableSelect from "react-select/creatable";
import Botao from "../botao/Botao";
import { uploadImagemCloudinary } from "../../api/cloudinary";

export default function CadastroMuseus({ onFechar }) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [dataInauguracao, setDataInauguracao] = useState("");
  const [tipoMuseu, setTipoMuseu] = useState(null);
  const [urlImagem, setUrlImagem] = useState("");
  const [erro, setErro] = useState("");

  const opcoesTipo = [
    { value: "histórico", label: "Histórico" },
    { value: "arte", label: "Arte" },
    { value: "ciência", label: "Ciência" },
    { value: "interativo", label: "Interativo" },
    { value: "outros", label: "Outros" },
  ];

  const enviar = async () => {
    if (!nome || !descricao || !localizacao || !dataInauguracao || !tipoMuseu || !urlImagem) {
      setErro("Por favor, preencha todos os campos.");
      return;
    }

    const novoMuseu = {
      nome,
      descricao,
      localizacao,
      dataInauguracao,
      tipo: tipoMuseu.value,
      imagem: urlImagem,
    };

    try {
      const museusRef = ref(database, "museus");
      await push(museusRef, novoMuseu);
      setErro("");
      onFechar();
    } catch (error) {
      setErro("Erro ao cadastrar o museu. Tente novamente.");
      console.error("Erro ao salvar no Firebase:", error);
    }
  };

  const handleUploadImagem = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setErro("");
    try {
      const url = await uploadImagemCloudinary(file);
      setUrlImagem(url);
    } catch (err) {
      console.error("Erro ao fazer upload da imagem:", err);
      setErro("Erro ao fazer upload da imagem.");
    }
  };

  return (
    <div className="modalContainer">
      <div className="modalCadastro">
        <button className="botaoFecharModal" onClick={onFechar}>
          ×
        </button>
        <h2>Cadastrar Museu</h2>

        <div className="formularioCadastro">
          <div className="imagemCadastro">
            {urlImagem ? (
              <img
                src={urlImagem}
                alt="Imagem do museu"
                style={{ width: "100%", height: "100%", borderRadius: 8, objectFit: "cover" }}
              />
            ) : (
              <label style={{ cursor: "pointer", color: "#666", textAlign: "center", padding: 10 }}>
                Escolher imagem
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleUploadImagem}
                />
              </label>
            )}
          </div>

          <div className="camposCadastro">
            <div className="campoFormulario">
              <label htmlFor="nome">Nome do Museu*</label>
              <input id="nome" type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
            </div>

            <div className="campoFormulario">
              <label htmlFor="localizacao">Cidade/Estado*</label>
              <input id="localizacao" type="text" value={localizacao} onChange={(e) => setLocalizacao(e.target.value)} />
            </div>

            <div className="campoFormulario">
              <label htmlFor="dataInauguracao">Data de Inauguração*</label>
              <input id="dataInauguracao" type="date" value={dataInauguracao} onChange={(e) => setDataInauguracao(e.target.value)} />
            </div>

            <div className="campoFormulario">
              <label htmlFor="tipo">Tipo de Museu*</label>
              <CreatableSelect
                id="tipo"
                value={tipoMuseu}
                onChange={(opcao) => setTipoMuseu(opcao)}
                options={opcoesTipo}
                placeholder="Selecione ou crie um tipo"
                styles={{
                  control: (base) => ({
                    ...base,
                    borderRadius: 8,
                    borderColor: "#ccc",
                    fontSize: 14,
                    backgroundColor: "#f0f0f0",
                    paddingLeft: 4,
                  }),
                  menu: (base) => ({
                    ...base,
                    zIndex: 9999,
                  }),
                }}
              />
            </div>

            <div className="campoFormulario" style={{ flexBasis: "100%" }}>
              <label htmlFor="descricao">Descrição do Museu*</label>
              <textarea
                id="descricao"
                rows={4}
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </div>
          </div>
        </div>

        {erro && <p className="mensagemErro">{erro}</p>}

        <div className="botoesModal">
          <Botao texto="Cancelar" preenchido onClick={onFechar} />
          <Botao texto="Confirmar Cadastro" preenchido onClick={enviar} />
        </div>
      </div>
    </div>
  );
}