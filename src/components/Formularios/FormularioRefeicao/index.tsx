import { Form, Formik, FormikHelpers } from "formik";
import { To } from "react-router-dom";
import { ButtonGroup, Col, Row } from "reactstrap";
import { Botao, BotaoLink } from "../../Botoes";
// import { CampoCheckbox } from "../../Campos/CampoCheckbox";
import { CampoInput } from "../../Campos/CampoInput";

interface FormularioEmpresaProps {
  initialValues: FormularioEmpresaTypes;
  validationSchema: any;
  onSubmit: (values: FormularioEmpresaTypes, helpers: FormikHelpers<FormularioEmpresaTypes>) => Promise<void>;
  voltarLink: To;
  enableReinitialize: boolean;
}
export function EmpresaRefeicao(props: FormularioEmpresaProps) {
  return (
    <Col md={12}>
      <Formik
        initialValues={props.initialValues}
        validationSchema={props.validationSchema}
        onSubmit={props.onSubmit}
        enableReinitialize={props.enableReinitialize}
      >
        {({ errors, touched, values }) => (
          <Form>
            <Row>
              <CampoInput
                md={12}
                id="nome"
                label="Nome"
                name="nome"
                type="text"
                placeholder="Digite o nome"
                value={values.nome}
                error={errors.nome}
                touched={touched.nome}
              />
              <CampoInput
                md={12}
                id="email"
                label="Email"
                name="email"
                type="email"
                placeholder="Digite o email"
                value={`${values.email}`}
                error={errors.email}
                touched={touched.email}
              />
              <CampoInput
                md={12}
                id="senha"
                label="Senha"
                name="senha"
                type="password"
                placeholder="Digite a senha"
                value={`${values.senha}`}
                error={errors.senha}
                touched={touched.senha}
              />
              {/* <CampoCheckbox name="ativo" checked={(values.ativo) ? true : false}>Ativo</CampoCheckbox> */}
              <Col md={12} className="d-flex justify-content-end pt-3">
                <ButtonGroup>
                  <Botao type="submit" color="primary">Salvar</Botao>
                  <Botao type="reset" color="danger">Limpar</Botao>
                  <BotaoLink to={props.voltarLink} color="info">Voltar</BotaoLink>
                </ButtonGroup>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </Col>
  );
}
