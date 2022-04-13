import { Col, Row } from "reactstrap";
import { Titulo } from "../../../components/Titulo";
import api from "../../../utils/api";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ContainerApp } from "../../../components/ContainerApp";
import { validacaoSchemaFormularioEmpresa, valoresIniciaisFormularioEmpresa } from "../../../utils/constantes";
import { FormularioEmpresa } from "../../../components/Formularios/FormularioEmpresa";
import { FormatadorDados } from "../../../utils/utils";
import { ModalSucessoCadastro, ModalErroCadastro, ModalErroDadosNaoCarregados } from "../../../components/Modals";

export function EmpresaEdicao() {
  const [data, setData] = useState<FormularioEmpresaTypes>(valoresIniciaisFormularioEmpresa);
  const navigation = useNavigate();

  let { id } = useParams();

  useEffect(() => {
    api.get(`usuario/${id}`)
      .then((item) => {
        const nome = item.data.nome;
        const email = item.data.email;
        const senha = item.data.senha;

        const data = { nome, email, senha };

        setData(data);
      })
      .catch((erro) => {
        ModalErroDadosNaoCarregados();
        console.error(erro);
      });
  }, [id]);

  const dadosDaEmpresa: FormularioAdministradorTypes = {
    nome: data.nome || "",
    email: data.email || "",
    senha: data.senha || "",
    // ativo: data.ativo || false,
  };

  async function handleSubmit(values: FormularioAdministradorTypes) {
    const nome = values.nome;
    const email = values.email;
    const senha = values.senha;
    // const ativo = values.ativo;
    let data_modificacao_cadastro = FormatadorDados.GeraDataComHoraFormata();

    await api.put(`usuario/${id}`, {
      'id': id,
      'nome': nome,
      'email': email,
      'senha': senha,
      'data_modificacao_cadastro': data_modificacao_cadastro,
    }).then(() => {
      ModalSucessoCadastro();
      navigation(`/empresa/${id}`);
    }).catch((error) => {
      ModalErroCadastro();
      console.error(error);
    });
  }

  return (
    <ContainerApp>
      <Row>
        <Col md={12}>
          <Titulo tag="h1" className="w-100 text-center mb-5">Edição de dados</Titulo>
        </Col>
        <FormularioEmpresa
          initialValues={dadosDaEmpresa}
          validationSchema={validacaoSchemaFormularioEmpresa}
          onSubmit={handleSubmit}
          enableReinitialize={true}
          voltarLink={`/empresa/${id}`}
        />
      </Row>
    </ContainerApp>
  );
}
