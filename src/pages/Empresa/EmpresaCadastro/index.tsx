import { FormikHelpers } from "formik";
import { Col, Row } from "reactstrap";
import { Titulo } from "../../../components/Titulo";
import { ContainerApp } from "../../../components/ContainerApp";
import { format } from "date-fns";
import { EmpresaRefeicao } from "../../../components/Formularios/FormularioRefeicao";
import { valoresIniciaisFormularioEmpresa, validacaoSchemaFormularioEmpresa } from "../../../utils/constantes";

export function EmpresaCadastro() {
  async function handleSubmit(values: FormularioEmpresaTypes, helpers: FormikHelpers<FormularioEmpresaTypes>) {
    let nome = values.nome;
    let email = values.email;
    let senha = values.senha;
    // let ativo = String(values.ativo);
    let data_cadastro = format(new Date(), 'yyyy-MM-dd');
    let data_modificacao_cadastro = format(new Date(), 'yyyy-MM-dd');
    
    const data = {
      nome,
      email,
      senha,
      // ativo,
      data_cadastro,
      data_modificacao_cadastro
    };

    console.log(data);
    
    /* Alterar */
    // await api.post('refeicao', data)
    //   .then(() => {
    //     ModalConfirmacaoCadastro();
    //   }).catch((error) => {
    //     console.error(error);
    //     ModalErroCadastro();
    //   });

    helpers.resetForm();
  }

  return (
    <ContainerApp>
      <Row>
        <Col md={12}>
          <Titulo tag="h1">Empresa Cadastro</Titulo>
        </Col>
        <EmpresaRefeicao
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
