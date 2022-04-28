import { Form, Formik, FormikHelpers } from "formik";
import { To } from "react-router-dom";
import { ButtonGroup, Col, Row } from "reactstrap";
import { Botao } from "../../Botoes/Botao";
import { BotaoLink } from "../../Botoes/BotaoLink";
import { CampoInput, CampoInputProps } from "../../Campos/CampoInput";
import { CampoSenhaAntiga } from "../../Campos/CampoSenhaAntiga";

interface FormularioAdministradorProps {
  initialValues: AdministradorTypes;
  validationSchema: any;
  onSubmit: (values: AdministradorTypes, helpers: FormikHelpers<AdministradorTypes>) => Promise<void>;
  voltarLink: To;
  enableReinitialize: boolean;
  exibe_senha_antiga: boolean;
  senha_antiga: string;
}

export function FormularioAdministrador(props: FormularioAdministradorProps) {
  const { initialValues, validationSchema, onSubmit, voltarLink, enableReinitialize, exibe_senha_antiga, senha_antiga } = props;

  return (
    <Col md={12}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize={enableReinitialize}
      >
        {(formik_props) => {
          const { errors, touched, values } = formik_props;

          const lista_campos_dados: CampoInputProps[] = [
            {
              md: 12, type: "text", id: "nome", name: "nome", label: "Nome",
              placeholder: "Digite o seu nome", value: values.nome,
              error: errors.nome, touched: touched.nome
            },
            {
              md: 12, type: "text", id: "email", name: "email",
              label: "E-mail", placeholder: "Digite o seu e-mail",
              value: values.email, error: errors.email, touched: touched.email
            },
            {
              md: 12, type: "password", id: "senha", name: "senha", label: "Senha",
              placeholder: "Digite a sua senha", value: values.senha,
              error: errors.senha, touched: touched.senha
            },
            {
              md: 12, type: "password", id: "confirmacao_senha", name: "confirmacao_senha", label: "Confirme a senha",
              placeholder: "Digite novamente a sua senha", value: values.confirmacao_senha,
              error: errors.confirmacao_senha, touched: touched.confirmacao_senha
            }
          ];

          return (
            <Form>
              <Row>
                {lista_campos_dados.map((item, index) => {
                  const { md, id, label, name, type, placeholder, value, error, touched } = item;
                  return (
                    <CampoInput key={index} md={md} id={id} label={label} name={name} type={type}
                      placeholder={placeholder} value={value} error={error} touched={touched}
                    />
                  );
                })}
                {(exibe_senha_antiga) ? (
                  <CampoSenhaAntiga senha_antiga={senha_antiga} />
                ) : null}
                <Col md={12} className="d-flex justify-content-end mt-5">
                  <ButtonGroup>
                    <Botao type="submit" color="primary">Salvar</Botao>
                    <Botao type="reset" color="danger">Limpar</Botao>
                    <BotaoLink to={voltarLink} color="info">Voltar</BotaoLink>
                  </ButtonGroup>
                </Col>
              </Row>
            </Form>
          );
        }}
      </Formik>
    </Col>
  );
}