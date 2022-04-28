import { FormikHelpers } from "formik";
import { Col, Row } from "reactstrap";
import { Titulo } from "../../../components/Titulo";
import { ContainerApp } from "../../../components/ContainerApp";
import { FormularioEmpresa } from "../../../components/Formularios/FormularioEmpresa";
import { valoresIniciaisFormularioEmpresa } from "../../../utils/constantes";
import { ModalSucessoCadastro, ModalErroCadastro } from "../../../components/Modals";
import { ApiCadastroEmpresa, ApiCadastroEmpresaTypes } from "../../../utils/api";
import { FormatadorCrypto } from "../../../utils/FormatadorCrypto";
import { FormatadorDados } from "../../../utils/FormatadorDados";
import { validacaoSchemaFormularioEmpresa } from "../../../utils/ValidacaoSchemas";

export function EmpresaCadastro() {
  async function handleSubmit(values: EmpresaTypes, helpers: FormikHelpers<EmpresaTypes>) {
    /* Alterar caso for colocar o atributo ativo */
    const { nome, email, senha, ativo } = values;

    let senha_formatada = FormatadorCrypto.mensagemSHA512(senha);
    let data_hora_formatada = FormatadorDados.GeradorDataHoraFormatada("yyyy-MM-dd HH:mm:ss");
    // let ativo = String(values.ativo);

    const data: ApiCadastroEmpresaTypes = {
      nome,
      email,
      senha: senha_formatada,
      ativo,
      data_cadastro: data_hora_formatada,
      data_modificacao_cadastro: data_hora_formatada
    };

    // await api.post('usuario', data)
    await ApiCadastroEmpresa(data)
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
          exibe_senha_antiga={false}
          senha_antiga={""}
        />
      </Row>
    </ContainerApp>
  );
}
