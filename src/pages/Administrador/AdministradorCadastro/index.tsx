import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { FormikHelpers } from "formik";
import { Titulo } from "../../../components/Titulo";
import { FormularioAdministrador } from "../../../components/Formularios/FormularioAdministrador";
import { valoresIniciaisFormularioAdministrador } from "../../../utils/constantes";
import { ModalSucessoCadastro, ModalErroCadastro } from "../../../components/Modals";
import { validacaoSchemaFormularioAdministrador } from "../../../utils/ValidacaoSchemas";
import { ApiCadastroAdministrador, ApiCadastroAdministradorTypes } from "../../../utils/api";
import { FormatadorDados } from "../../../utils/FormatadorDados";
import { FormatadorCrypto } from "../../../utils/FormatadorCrypto";

export function AdministradorCadastro() {
  const navigate = useNavigate();

  async function onSubmit(values: AdministradorTypes, helpers: FormikHelpers<AdministradorTypes>) {
    let { nome, email, senha } = values;
    let senha_formatada = FormatadorCrypto.mensagemSHA512(senha);
    let data_cadastro_formatada = FormatadorDados.GeradorDataHoraFormatada("yyyy-MM-dd HH:mm:ss");

    const data: ApiCadastroAdministradorTypes = {
      'nome': nome,
      'email': email,
      'senha': senha_formatada,
      'data_cadastro': data_cadastro_formatada,
      'data_modificacao_cadastro': data_cadastro_formatada,
    };

    // await api.post('administrador', data)
    await ApiCadastroAdministrador(data)
      .then(() => {
        ModalSucessoCadastro();
        helpers.resetForm();
        navigate('/');
      }).catch((error) => {
        ModalErroCadastro();
        console.error(error);
      });
  }

  return (
    <Container className="pt-5">
      <Row>
        <Col md={12}>
          <Titulo tag="h1">Novo Usuário</Titulo>
        </Col>
        <FormularioAdministrador
          initialValues={valoresIniciaisFormularioAdministrador}
          validationSchema={validacaoSchemaFormularioAdministrador}
          onSubmit={onSubmit}
          enableReinitialize={false}
          voltarLink="/"
          exibe_senha_antiga={false}
          senha_antiga={""}
        />
      </Row>
    </Container>
  );
}