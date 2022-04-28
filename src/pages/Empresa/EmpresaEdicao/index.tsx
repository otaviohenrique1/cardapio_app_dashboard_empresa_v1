import { Col, Row } from "reactstrap";
import { Titulo } from "../../../components/Titulo";
import { ApiBuscaDadosUmaEmpresa, ApiEdicaoEmpresa, ApiEdicaoEmpresaTypes } from "../../../utils/api";
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
        const { nome, email, senha, ativo } = item.data;
        const data = { nome, email, senha, ativo };
        setData(data);
      })
      .catch((erro) => {
        ModalErroDadosNaoCarregados();
        console.error(erro);
      });
  }, [id]);

  async function handleSubmit(values: EmpresaTypes) {
    if (!id) { return; }
    const { nome, email, senha, ativo } = values;
    // const ativo = values.ativo;
    let senha_formatada = FormatadorDados.FormataExibicaoSenha(senha, 12);
    let data_modificacao_cadastro = FormatadorDados.GeradorDataHoraFormatada("yyyy-MM-dd HH:mm:ss");

    const data: ApiEdicaoEmpresaTypes = {
      'id': id,
      'nome': nome,
      'email': email,
      'senha': senha_formatada,
      'ativo': ativo,
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

  const dadosDaEmpresa: EmpresaTypes = {
    nome: data.nome || "",
    email: data.email || "",
    senha: data.senha || "",
    ativo: data.ativo || false,
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
