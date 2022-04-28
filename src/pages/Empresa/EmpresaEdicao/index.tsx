import { Col, Row } from "reactstrap";
import { Titulo } from "../../../components/Titulo";
import { ApiBuscaDadosUmaEmpresa, ApiEdicaoEmpresa } from "../../../utils/api";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ContainerApp } from "../../../components/ContainerApp";
import { valoresIniciaisFormularioEmpresa } from "../../../utils/constantes";
import { FormularioEmpresa } from "../../../components/Formularios/FormularioEmpresa";
import { ModalSucessoCadastro, ModalErroCadastro, ModalErroDadosNaoCarregados } from "../../../components/Modals";
import { validacaoSchemaFormularioEmpresa } from "../../../utils/ValidacaoSchemas";
import { FormatadorDados } from "../../../utils/FormatadorDados";

export function EmpresaEdicao() {
  const [data, setData] = useState<EmpresaTypes>(valoresIniciaisFormularioEmpresa);
  const navigation = useNavigate();

  let { id } = useParams();

  useEffect(() => {
    if (!id) { return; }
    // api.get(`usuario/${id}`)
    ApiBuscaDadosUmaEmpresa(id)
      .then((item) => {
        const nome = item.data.nome;
        const email = item.data.email;
        const senha = item.data.senha;
        const data = { nome, email, senha };
        setData(data);
      })
      .catch((erro) => {
        ModalErroDadosNaoCarregados();
        console.error(erro);
      });
  }, [id]);

  async function handleSubmit(values: AdministradorTypes) {
    if (!id) { return; }
    const { nome, email, senha } = values;
    // const ativo = values.ativo;
    let senha_formatada = FormatadorDados.FormataExibicaoSenha(senha, 12);
    let data_modificacao_cadastro = FormatadorDados.GeradorDataHoraFormatada("yyyy-MM-dd HH:mm:ss");

    const data = {
      'id': id,
      'nome': nome,
      'email': email,
      'senha': senha_formatada,
      'data_modificacao_cadastro': data_modificacao_cadastro,
    };

    // await api.put(`usuario/${id}`, data)
    ApiEdicaoEmpresa(data)
      .then(() => {
        ModalSucessoCadastro();
        navigation(`/empresa/${id}`);
      }).catch((error) => {
        ModalErroCadastro();
        console.error(error);
      });
  }

  const dadosDaEmpresa: AdministradorTypes = {
    nome: data.nome || "",
    email: data.email || "",
    senha: data.senha || "",
    // ativo: data.ativo || false,
  };

  return (
    <ContainerApp>
      <Row>
        <Col md={12}>
          <Titulo tag="h1" className="w-100 text-center mb-5">Edição de dados</Titulo>
        </Col>
        <FormularioEmpresa
          initialValues={dadosDaEmpresa}
          validationSchema={validacaoSchemaFormularioEmpresa}
          onSubmit={handleSubmit}
          enableReinitialize={true}
          voltarLink={`/empresa/${id}`}
        />
      </Row>
    </ContainerApp>
  );
}
