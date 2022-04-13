import { FormikHelpers } from "formik";
import { Col, Container, Row } from "reactstrap";
import { Titulo } from "../../../components/Titulo";
import { useNavigate } from "react-router-dom";
import api from "../../../utils/api";
import { format } from "date-fns";
import { FormularioAdministrador } from "../../../components/Formularios/FormularioAdministrador";
import { validacaoSchemaFormularioAdministrador, valoresIniciaisFormularioAdministrador } from "../../../utils/constantes";
import { FormatadorCrypto, FormatadorDados } from "../../../utils/utils";
import { ModalSucessoCadastro, ModalErroCadastro } from "../../../components/Modals";

export function AdministradorCadastro() {
  const navigate = useNavigate();

  async function onSubmit(values: FormularioAdministradorTypes, helpers: FormikHelpers<FormularioAdministradorTypes>) {
    let nome = values.nome;
    let email = values.email;
    let senha = FormatadorCrypto.SenhaSHA512(values.senha);
    let data_cadastro = FormatadorDados.GeraDataFormata();
    let data_modificacao_cadastro = format(new Date(), 'yyyy-MM-dd');

    const data = {
      'nome': nome,
      'email': email,
      'senha': senha,
      'data_cadastro': data_cadastro,
      'data_modificacao_cadastro': data_modificacao_cadastro,
    };

    await api.post('administrador', data)
      .then(() => {
        ModalSucessoCadastro();
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
        />
      </Row>
    </Container>
  );
}