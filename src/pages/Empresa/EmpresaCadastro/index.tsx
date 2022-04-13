import { FormikHelpers } from "formik";
import { Col, Row } from "reactstrap";
import { Titulo } from "../../../components/Titulo";
import { ContainerApp } from "../../../components/ContainerApp";
import { FormularioEmpresa } from "../../../components/Formularios/FormularioEmpresa";
import { valoresIniciaisFormularioEmpresa, validacaoSchemaFormularioEmpresa } from "../../../utils/constantes";
import { FormatadorDados } from "../../../utils/utils";
import api from "../../../utils/api";
import { ModalSucessoCadastro, ModalErroCadastro } from "../../../components/Modals";

export function EmpresaCadastro() {
  async function handleSubmit(values: FormularioEmpresaTypes, helpers: FormikHelpers<FormularioEmpresaTypes>) {
    /* Alterar caso for colocar o atributo ativo */

    let nome = values.nome;
    let email = values.email;
    let senha = values.senha;
    // let ativo = String(values.ativo);
    let data_cadastro = FormatadorDados.GeraDataFormata();
    let data_modificacao_cadastro = FormatadorDados.GeraDataFormata();

    const data = { nome, email, senha, /* ativo, */ data_cadastro, data_modificacao_cadastro };

    // console.log(data);

    await api.post('usuario', data)
      .then(() => {
        ModalSucessoCadastro();
      }).catch((error) => {
        ModalErroCadastro();
        console.error(error);
      });

    helpers.resetForm();
  }

  return (
    <ContainerApp>
      <Row>
        <Col md={12}>
          <Titulo tag="h1">Empresa Cadastro</Titulo>
        </Col>
        <FormularioEmpresa
          initialValues={valoresIniciaisFormularioEmpresa}
          validationSchema={validacaoSchemaFormularioEmpresa}
          onSubmit={handleSubmit}
          enableReinitialize={false}
          voltarLink="/home"
        />
      </Row>
    </ContainerApp>
  );
}
