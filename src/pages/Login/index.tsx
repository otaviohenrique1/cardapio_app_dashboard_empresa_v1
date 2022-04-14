import { useNavigate } from "react-router-dom";
import { Col, Container, Row, ButtonGroup, Card, CardBody, CardHeader, CardFooter } from "reactstrap";
import { Form, Formik } from "formik";
import { Titulo } from "../../components/Titulo";
import { CampoInput } from "../../components/Campos/CampoInput";
import { Botao } from "../../components/Botoes/Botao";
import { BotaoLink } from "../../components/Botoes/BotaoLink";
import { ModalErroCadastro } from "../../components/Modals";
import api from "../../utils/api";
import { FormatadorCrypto } from "../../utils/utils";
import { dadosIniciaisFormularioLogin } from "../../utils/constantes";
import { schemaValidacaoFormularioLogin } from "../../utils/ValidacaoSchemas";

export function Login() {
  let navigate = useNavigate();

  async function onSubmit(values: LoginTypes) {
    const { email, senha } = values;
    const senha_formatada = FormatadorCrypto.mensagemSHA512(senha);

    const data = {
      email,
      senha: senha_formatada
    };
    const auth = {
      auth: {
        username: email,
        password: senha_formatada
      }
    };

    await api.post('administrador/login', data, auth)
      .then((data) => {
        const { id, nome } = data.data.data_user;
        sessionStorage.setItem('id', String(id));
        sessionStorage.setItem('nome', String(nome));
        navigate('/home');
      })
      .catch((error) => {
        ModalErroCadastro();
        console.error(error);
      });
  }

  return (
    <Container className="d-flex justify-content-center align-content-center m-5">
      <Formik
        initialValues={dadosIniciaisFormularioLogin}
        onSubmit={onSubmit}
        validationSchema={schemaValidacaoFormularioLogin}
      >
        {({ errors, touched, values }) => (
          <Form>
            <Card>
              <CardHeader>
                <Row>
                  <Col md={12} className="d-flex justify-content-center align-items-center">
                    <Titulo tag="h1">Login</Titulo>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Row>
                  <CampoInput
                    md={12}
                    type="text"
                    id="email"
                    name="email"
                    value={values.email}
                    label="Email"
                    placeholder="Digite o seu email"
                    error={errors.email}
                    touched={touched.email}
                  />
                  <CampoInput
                    md={12}
                    type="password"
                    id="senha"
                    name="senha"
                    value={values.senha}
                    label="Senha"
                    placeholder="Digite a sua senha"
                    error={errors.senha}
                    touched={touched.senha}
                  />
                </Row>
              </CardBody>
              <CardFooter>
                <Row>
                  <Col md={12} className="w-100 d-flex justify-content-end">
                    <ButtonGroup>
                      <Botao color="primary" type="submit">Entrar</Botao>
                      <Botao color="danger" type="reset">Limpar</Botao>
                      <BotaoLink to="/administrador/cadastro" color="success">Novo usuario</BotaoLink>
                    </ButtonGroup>
                  </Col>
                </Row>
              </CardFooter>
            </Card>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
