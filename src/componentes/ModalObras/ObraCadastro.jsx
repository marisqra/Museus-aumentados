import { useEffect, useState } from "react";
import Botao from "../botao/Botao";
import { listarObras } from "../../api/obras";
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

export default function ModalCadastroObra({ onSalvar, onFechar }) {
  const [tipo, setTipo] = useState("original");
  const [form, setForm] = useState(estadoInicialForm);
  const [obrasOriginais, setObrasOriginais] = useState([]);
  const [erro, setErro] = useState("");
  const [tagsCadastradas, setTagsCadastradas] = useState(() => {
    const salvas = localStorage.getItem("tagsCadastradas");
    return salvas ? JSON.parse(salvas) : [];
  });

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
    setForm((f) => ({ ...f, [campo]: e.target.value }));
  };

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

    const vazio = obrigatorios.find((campo) => {
      const valor = form[campo];
      if (Array.isArray(valor)) return valor.length === 0;
      return !valor?.trim();
    });

    if (vazio) {
      setErro(`O campo "${vazio}" é obrigatório.`);
      return;
    }

    onSalvar({ ...form, tipo });
    setErro("");
  }

  return (
    <div className="modal-container">
      <div className="modal-cadastro">
        <button
          className="botao-fechar-modal"
          onClick={onFechar}
          aria-label="Fechar modal"
          type="button"
        >
          ×
        </button>

        <h2>{tipo === "original" ? "Cadastrar Obra Original" : "Cadastrar Releitura"}</h2>

        <div className="abas-cadastro">
          <button
            className={tipo === "original" ? "ativo" : ""}
            onClick={() => setTipo("original")}
            type="button"
          >
            Obra Original
          </button>
          <button
            className={tipo === "releitura" ? "ativo" : ""}
            onClick={() => setTipo("releitura")}
            type="button"
          >
            Releitura
          </button>
        </div>

        <div className="formulario-cadastro">
          <div className="imagem-cadastro">
            {form.imagem ? (
              <img
                src={form.imagem}
                alt="Prévia da obra"
                style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: "8px" }}
              />
            ) : (
              <span style={{ color: "#888", textAlign: "center", padding: "10px" }}>
                Prévia da imagem
              </span>
            )}
          </div>

          <div className="campos-cadastro">
            <Campo id="titulo" label="Título da obra*" value={form.titulo} onChange={handleChange("titulo")} />
            <Campo id="autor" label="Autor da obra" value={form.autor} onChange={handleChange("autor")} />
            <Campo id="descricao" label="Descrição*" value={form.descricao} onChange={handleChange("descricao")} tipo="textarea" />
            <Campo id="data" label="Data de produção*" value={form.data} onChange={handleChange("data")} tipo="date" />
            <Campo id="tecnica" label="Técnica/software" value={form.tecnica} onChange={handleChange("tecnica")} />
            
            <div className="campo-formulario" style={{ width: "100%" }}>
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
                  })
                }}
              />
            </div>

            <Campo id="dimensoes" label="Dimensões*" value={form.dimensoes} onChange={handleChange("dimensoes")} />
            <Campo id="registro" label="Número de Registro*" value={form.registro} onChange={handleChange("registro")} />
            <Campo id="imagem" label="URL da imagem*" value={form.imagem} onChange={handleChange("imagem")} />

            {tipo === "releitura" && (
              <div className="campo-formulario">
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

        {erro && <p className="mensagem-erro">{erro}</p>}

        <div className="botoes-modal">
          <Botao texto="Cancelar Cadastro" onClick={onFechar} />
          <Botao texto="Confirmar Cadastro" preenchido onClick={enviar} />
        </div>
      </div>
    </div>
  );
}

function Campo({ id, label, value, onChange, tipo = "text" }) {
  return (
    <div className="campo-formulario">
      <label htmlFor={id}>{label}</label>
      {tipo === "textarea" ? (
        <textarea id={id} value={value} onChange={onChange} />
      ) : (
        <input id={id} type={tipo} value={value} onChange={onChange} />
      )}
    </div>
  );
}
