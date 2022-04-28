import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { Titulo } from "../../../components/Titulo";
import { ContainerApp } from "../../../components/ContainerApp";
import { FormularioAdministrador } from "../../../components/Formularios/FormularioAdministrador";
import { ModalSucessoCadastro, ModalErroCadastro } from "../../../components/Modals";
import { valoresIniciaisFormularioAdministrador } from "../../../utils/constantes";
import { ApiBuscaDadosUmAdministrador, ApiEdicaoAdministrador } from "../../../utils/api";
import { validacaoSchemaFormularioAdministrador } from "../../../utils/ValidacaoSchemas";
import { FormatadorCrypto } from "../../../utils/FormatadorCrypto";
import { FormatadorDados } from "../../../utils/FormatadorDados";

export function AdministradorEdicao() {
  const [data, setData] = useState<AdministradorTypes>(valoresIniciaisFormularioAdministrador);
  const navigation = useNavigate();

  let { id } = useParams();

  useEffect(() => {
    if (!id) { return; }

    // api.get(`administrador/${id}`)
    ApiBuscaDadosUmAdministrador(id)
      .then((item) => {
        const { nome, email, senha, confirmacao_senha } = item.data;
        const data = { nome, email, senha, confirmacao_senha };
        setData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const dadosDoUsuario: AdministradorTypes = {
    nome: data.nome || "",
    email: data.email || "",
    senha: data.senha || "",
    confirmacao_senha: data.confirmacao_senha || ""
  };

  async function handleSubmit(values: AdministradorTypes) {
    if (!id) { return; }

    let { nome, email, senha } = values;

    let senha_formatada = FormatadorCrypto.mensagemSHA512(senha);
    let data_modificacao_cadastro_formatada = FormatadorDados.GeradorDataHoraFormatada("yyyy-MM-dd HH:mm:ss");

    const data = {
      'id': id,
      'nome': nome,
      'email': email,
      'senha': senha_formatada,
      'data_modificacao_cadastro': data_modificacao_cadastro_formatada,
    };

    // await api.put(`administrador/${id}`, data)
    await ApiEdicaoAdministrador(data)
      .then(() => {
        ModalSucessoCadastro();
        navigation(`/administrador/${id}`);
      })
      .catch((error) => {
        ModalErroCadastro();
        console.error(error);
      });
  }

  return (
    <ContainerApp>
      <Row>
        <Col md={12}>
          <Titulo tag="h1" className="w-100 text-center mb-5">Edição de dados</Titulo>
        </Col>
        <FormularioAdministrador
          initialValues={dadosDoUsuario}
          validationSchema={validacaoSchemaFormularioAdministrador}
          onSubmit={handleSubmit}
          enableReinitialize
          voltarLink={`/administrador/${id}`}
        />
      </Row>
    </ContainerApp>
  );
}
