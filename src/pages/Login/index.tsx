import { Col, Container, Row, ButtonGroup, Card, CardBody, CardHeader, CardFooter, Alert } from "reactstrap";
import { Titulo } from "../../components/Titulo";
import { Form, Formik } from "formik";
import { CampoInput } from "../../components/Campos/CampoInput";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { Botao, BotaoLink } from "../../components/Botoes";
import { dadosIniciaisFormularioLogin, schemaValidacaoFormularioLogin } from "../../utils/constantes";
import { FormatadorCrypto } from "../../utils/utils";
import { useState } from "react";
import { ModalMensagem } from "../../components/Modals";

export function Login() {
  let navigate = useNavigate();

  const [erroMensagem, setErroMensagem] = useState<string>('');

  async function onSubmit(values: FormularioLoginTypes) {
    const email = values.email;
    const senha = FormatadorCrypto.SenhaSHA512(values.senha);

    await api.post('administrador/login',
      { email, senha },
      { auth: { username: email, password: senha } }
    ).then((data) => {
      const id = data.data.data_user.id;
      const nome = data.data.data_user.nome;
      sessionStorage.setItem('id', `${id}`);
      sessionStorage.setItem('nome', `${nome}`);
      navigate('/home');
    }).catch((error) => {
      ModalMensagem("error", "Erro", "Login inválido!");
      console.error(error);
      setErroMensagem(error.response.data.message);
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
                  {(erroMensagem.length !== 0) ? (<Alert color="danger">{erroMensagem}</Alert>) : null}
                  <Col md={12}>
                  </Col>
                  <CampoInput
                    md={12}
                    type="text"
                    id="email"
                    name="email"
                    value={values.email}
                    label="E-mail"
                    placeholder="Digite o seu e-mail"
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
