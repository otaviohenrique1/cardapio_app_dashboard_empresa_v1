import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, ListGroup, Row } from "reactstrap";
import { BotaoLink } from "../../../components/Botoes/BotaoLink";
import { ContainerApp } from "../../../components/ContainerApp";
import { ItemListaFichaDados } from "../../../components/Lista/ItemListaFichaDados";
import { ModalErroDadosNaoCarregados } from "../../../components/Modals";
import { Titulo } from "../../../components/Titulo";
import api from "../../../utils/api";
import { valoresIniciaisAdministradorDados } from "../../../utils/constantes";
import { FormatadorDados } from "../../../utils/FormatadorDados";

export function AdministradorDados() {
  const [data, setData] = useState<AdministradorDadosTypes>(valoresIniciaisAdministradorDados);
  const { id } = useParams();

  useEffect(() => {
    if (!id) { return; }

    api.get(`administrador/${id}`)
      .then((item) => {
        const { nome, email, senha, codigo, data_cadastro, data_modificacao_cadastro } = item.data;

        const senha_formatada = FormatadorDados.FormataExibicaoSenha(senha);
        const data_cadastro_formatada = FormatadorDados.FormatadorDataHora(data_cadastro, "dd/MM/yyyy HH:mm:ss");
        const data_modificacao_cadastro_formatada = FormatadorDados.FormatadorDataHora(data_modificacao_cadastro, "dd/MM/yyyy HH:mm:ss") || 'Data2';

        const data = {
          id,
          nome,
          email,
          senha: senha_formatada,
          codigo,
          data_cadastro: data_cadastro_formatada,
          data_modificacao_cadastro: data_modificacao_cadastro_formatada
        };

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