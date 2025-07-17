import { useEffect, useState } from "react";
import Botao from "../botao/Botao";
import { uploadImagemCloudinary } from "../../api/cloudinary";
import CreatableSelect from "react-select/creatable";
import "./ObraCadastro.css";

const estadoInicialForm = {
  titulo: "",
  autor: "",
  descricao: "",
  data: "",
  tecnica: "",
  tags: [],
  dimensoes: "",
  registro: "",
  imagem: "",
  obraOriginalId: ""
};

export default function ModalCadastroObra({ tipo, setTipo, onSalvar, onFechar, originalId = "", obraEditando = null }) {
  const [form, setForm] = useState(estadoInicialForm);
  const [obrasOriginais, setObrasOriginais] = useState([]);
  const [erro, setErro] = useState("");
  const [uploading, setUploading] = useState(false);
  const [tagsCadastradas, setTagsCadastradas] = useState(() => {
    const salvas = localStorage.getItem("tagsCadastradas");
    return salvas ? JSON.parse(salvas) : [];
  });


  useEffect(() => {
    if (obraEditando) {
      setForm({
        titulo: obraEditando.titulo || "",
        autor: obraEditando.autor || "",
        descricao: obraEditando.descricao || "",
        data: obraEditando.data || "",
        tecnica: obraEditando.tecnica || "",
        tags: obraEditando.tags || [],
        dimensoes: obraEditando.dimensoes || "",
        registro: obraEditando.registro || "",
        imagem: obraEditando.imagem || "",
        obraOriginalId: obraEditando.obraOriginalId || ""
      });
    } else {
      setForm(estadoInicialForm);
    }
  }, [obraEditando]);


  useEffect(() => {
    async function carregarObrasOriginais() {
      const todas = await listarObras();
      setObrasOriginais(todas.filter((obra) => obra.tipo === "original"));
    }
    if (tipo === "releitura") carregarObrasOriginais();
  }, [tipo]);


  useEffect(() => {
    const novas = [...new Set([...tagsCadastradas, ...form.tags])];
    setTagsCadastradas(novas);
    localStorage.setItem("tagsCadastradas", JSON.stringify(novas));
  }, [form.tags]);

  const handleChange = (campo) => (e) => {
    setForm(f => ({ ...f, [campo]: e.target.value }));
  };

  async function handleImagemSelecionada(e) {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setErro("");
    try {
      const url = await uploadImagemCloudinary(file);
      setForm(f => ({ ...f, imagem: url }));
    } catch (err) {
      setErro("Erro ao fazer upload da imagem. Tente novamente.");
      console.error(err);
    } finally {
      setUploading(false);
    }
  }

  function enviar() {
    const obrigatorios = [
      "titulo",
      "descricao",
      "data",
      "tags",
      "dimensoes",
      "registro",
      "imagem"
    ];
    if (tipo === "releitura") obrigatorios.push("obraOriginalId");

    const vazio = obrigatorios.find(campo => {
      const valor = form[campo];
      if (Array.isArray(valor)) return valor.length === 0;
      return !valor?.trim();
    });

    if (vazio) {
      setErro(`O campo "${vazio}" é obrigatório.`);
      return;
    }


    if (obraEditando) {
      onSalvar({ ...form, tipo, id: obraEditando.id });
    } else {
      onSalvar({ ...form, tipo });
    }
  }

  return (
    <div className="modalContainer">
      <div className="modalCadastro">
        <button
          className="botaoFecharModal"
          onClick={onFechar}
          aria-label="Fechar modal"
          type="button"
        >
          ×
        </button>

        <h2>
          {obraEditando
            ? tipo === "original"
              ? "Editar Obra Original"
              : "Editar Releitura"
            : tipo === "original"
              ? "Cadastrar Obra Original"
              : "Cadastrar Releitura"}
        </h2>

        <div className="abasCadastro">
          <button
            className={tipo === "original" ? "ativo" : ""}
            onClick={() => {
              setForm(estadoInicialForm);
              setTipo("original");
            }}
            type="button"
          >
            Obra Original
          </button>
          <button
            className={tipo === "releitura" ? "ativo" : ""}
            onClick={() => {
              setForm(estadoInicialForm);
              setTipo("releitura");
            }}
            type="button"
          >
            Releitura
          </button>
        </div>


        <div className="formularioCadastro">
          <div className="imagemCadastro">
            {form.imagem ? (
              <img
                src={form.imagem}
                alt="Prévia da obra"
                style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: "8px" }}
              />
            ) : uploading ? (
              <span style={{ color: "#888", textAlign: "center", padding: "10px" }}>
                Enviando imagem...
              </span>
            ) : (
              <span style={{ color: "#888", textAlign: "center", padding: "10px" }}>
                Prévia da imagem
              </span>
            )}
          </div>

          <div className="camposCadastro">
            <Campo id="titulo" label="Título da obra*" value={form.titulo} onChange={handleChange("titulo")} />
            <Campo id="autor" label="Autor da obra" value={form.autor} onChange={handleChange("autor")} />
            <Campo id="descricao" label="Descrição*" value={form.descricao} onChange={handleChange("descricao")} tipo="textarea" />
            <Campo id="data" label="Data de produção*" value={form.data} onChange={handleChange("data")} tipo="date" />
            <Campo id="tecnica" label="Técnica/software" value={form.tecnica} onChange={handleChange("tecnica")} />

            <div className="campoFormulario" style={{ width: "100%" }}>
              <label htmlFor="tags">Tags*</label>
              <CreatableSelect
                isMulti
                inputId="tags"
                placeholder="Digite ou selecione tags"
                value={form.tags.map(tag => ({ value: tag, label: tag }))}
                options={tagsCadastradas.map(tag => ({ value: tag, label: tag }))}
                onChange={(selected) => {
                  const novasTags = selected.map(option => option.value);
                  setForm(f => ({ ...f, tags: novasTags }));
                }}
                styles={{
                  control: (base) => ({
                    ...base,
                    borderRadius: 8,
                    borderColor: "#ccc",
                    fontSize: 14,
                    backgroundColor: "#f0f0f0",
                    fontFamily: "Albert Sans, sans-serif"
                  }),
                  option: (base) => ({
                    ...base,
                    color: "#000",
                  })
                }}
              />
            </div>

            <Campo id="dimensoes" label="Dimensões*" value={form.dimensoes} onChange={handleChange("dimensoes")} />
            <Campo id="registro" label="Número de Registro*" value={form.registro} onChange={handleChange("registro")} />

            <div className="campoFormulario">
              <label htmlFor="imagem">Upload da imagem*</label>
              <input type="file" id="imagem" accept="image/*" onChange={handleImagemSelecionada} />
              {uploading && <p style={{ fontSize: 12, color: "#555" }}>Enviando imagem para o servidor...</p>}
            </div>

            {tipo === "releitura" && (
              <div className="campoFormulario">
                <label htmlFor="obraOriginalId">Obra original*</label>
                <select
                  id="obraOriginalId"
                  value={form.obraOriginalId}
                  onChange={handleChange("obraOriginalId")}
                >
                  <option value="">Selecione uma obra</option>
                  {obrasOriginais.map((obra) => (
                    <option key={obra.id} value={obra.id}>{obra.titulo}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {erro && <p className="mensagemErro">{erro}</p>}

        <div className="botoesModal">
          <Botao texto="Cancelar Cadastro" preenchido onClick={onFechar} />
          <Botao
            texto={obraEditando ? "Salvar Alterações" : "Confirmar Cadastro"}
            preenchido
            onClick={enviar}
            disabled={uploading}
          />
        </div>
      </div>
    </div>
  );
}

function Campo({ id, label, value, onChange, tipo = "text" }) {
  return (
    <div className="campoFormulario">
      <label htmlFor={id}>{label}</label>
      {tipo === "textarea" ? (
        <textarea id={id} value={value} onChange={onChange} />
      ) : (
        <input id={id} type={tipo} value={value} onChange={onChange} />
      )}
    </div>
  );
}
