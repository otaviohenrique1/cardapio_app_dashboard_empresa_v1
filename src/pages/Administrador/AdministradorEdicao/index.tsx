import { Col, Row } from "reactstrap";
import { Titulo } from "../../../components/Titulo";
import api from "../../../utils/api";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ContainerApp } from "../../../components/ContainerApp";
import { FormularioAdministrador } from "../../../components/Formularios/FormularioAdministrador";
import { FormatadorCrypto, FormatadorDados } from "../../../utils/utils";
import { validacaoSchemaFormularioAdministrador, valoresIniciaisFormularioAdministrador } from "../../../utils/constantes";
import { ModalConfirmacaoCadastro, ModalErroCadastro } from "../../../components/Modals";

export function AdministradorEdicao() {
  const [data, setData] = useState<FormularioAdministradorTypes>(valoresIniciaisFormularioAdministrador);
  const navigation = useNavigate();

  let { id } = useParams();

  useEffect(() => {
    api.get(`administrador/${id}`)
      .then((item) => {
        let nome = item.data.nome;
        let email = item.data.email;
        let senha = item.data.senha;

        setData({ nome, email, senha });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const dadosDoUsuario: FormularioAdministradorTypes = {
    nome: data.nome || "",
    email: data.email || "",
    senha: data.senha || "",
  };

  async function handleSubmit(values: FormularioAdministradorTypes) {
    let nome = values.nome;
    let email = values.email;
    let senha = FormatadorDados.SenhaSHA512(values.senha);
    let data_modificacao_cadastro = FormatadorDados.GeraDataFormata();

    const data = {
      'id': id,
      'nome': nome,
      'email': email,
      'senha': senha,
      'data_modificacao_cadastro': data_modificacao_cadastro,
    };

    await api.put(`administrador/${id}`, data).then(() => {
      ModalConfirmacaoCadastro();
      navigation(`/administrador/${id}`);
    }).catch((error) => {
      ModalErroCadastro();
      console.error(error);
    });
  }

  const texto = '0123456789';
  let encrypt_message_texto = FormatadorCrypto.encrypt_message(texto);
  let decrypt_message_texto = FormatadorCrypto.decrypt_message(encrypt_message_texto);
  let decrypt_message_texto2 = FormatadorCrypto.decrypt_message("U2FsdGVkX1+MXSCJVaI5raoj2bPBf1A5hsLvWHV7gUQ=");
  
  return (
    <ContainerApp>
      <Row>
        <Col md={12}>
          <Titulo tag="h1" className="w-100 text-center mb-5">Edição de dados</Titulo>
        </Col>
        <Col md={12}>
          {/* <h6>{data.senha}</h6> */}
          {/* <h6>{FormatadorDados.SenhaSHA512(data.senha)}</h6> */}
          <h6>{texto}</h6>
          <h6>{encrypt_message_texto}</h6>
          <h6>{decrypt_message_texto}</h6>
          <h6>{decrypt_message_texto2}</h6>
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
