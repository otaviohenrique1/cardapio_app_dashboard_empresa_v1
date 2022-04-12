import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, ListGroup, Row } from "reactstrap";
import { BotaoLink } from "../../../components/Botoes";
import { ContainerApp } from "../../../components/ContainerApp";
import { ItemListaFichaDados } from "../../../components/Lista";
import { ModalErroDadosNaoCarregados } from "../../../components/Modals";
import { Titulo } from "../../../components/Titulo";
import api from "../../../utils/api";
import { valoresIniciaisAdministradorDados } from "../../../utils/constantes";
import { FormatadorDados } from "../../../utils/utils";

export function AdministradorDados() {
  const [data, setData] = useState<AdministradorDadosTypes>(valoresIniciaisAdministradorDados);
  const { id } = useParams();

  useEffect(() => {
    if (!id) { return; }

    api.get(`administrador/${id}`)
      .then((item) => {
        const nome = item.data.nome;
        const email = item.data.email;
        const senha = FormatadorDados.FormataExibicaoSenha(item.data.senha);
        const codigo = item.data.codigo;
        const data_cadastro = FormatadorDados.FormataDataHora(item.data.data_cadastro);
        // const data_cadastro = item.data.data_cadastro;
        // const data_modificacao_cadastro = FormatadorDados.FormataData(item.data.data_cadastro_cadastro);
        const data_modificacao_cadastro = `Data 1 => ${item.data.data_cadastro_cadastro}`;
        const data = { id, nome, email, senha, codigo, data_cadastro, data_modificacao_cadastro };

        setData(data);
      })
      .catch((error) => {
        ModalErroDadosNaoCarregados();
        console.error(error);
      });
  }, [id]);

  return (
    <ContainerApp>
      <Row>
        <Col md={12}>
          <Titulo tag="h1" className="w-100 text-center mt-3 mb-5">Dados do administrador</Titulo>
        </Col>
        <Col md={12}>
          <ListGroup>
            <ItemListaFichaDados titulo="ID" valor={data.id} />
            <ItemListaFichaDados titulo="Nome" valor={data.nome} />
            <ItemListaFichaDados titulo="E-mail" valor={data.email} />
            <ItemListaFichaDados titulo="Senha" valor={data.senha} />
            <ItemListaFichaDados titulo="Código" valor={data.codigo} />
            <ItemListaFichaDados titulo="Data de cadastro" valor={data.data_cadastro} />
            <ItemListaFichaDados titulo="Data de atualização do cadastro" valor={data.data_modificacao_cadastro} />
          </ListGroup>
        </Col>
        <Col md={12} className="d-flex justify-content-end mt-5">
          <BotaoLink to={`/administrador/${id}/edicao`} color="primary">Editar</BotaoLink>
        </Col>
      </Row>
    </ContainerApp>
  );
}