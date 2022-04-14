import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, ListGroup, Row } from "reactstrap";
import { ContainerApp } from "../../../components/ContainerApp";
import { Titulo } from "../../../components/Titulo";
import { ItemListaFichaDados } from "../../../components/Lista/ItemListaFichaDados";
import { BotaoLink } from "../../../components/Botoes/BotaoLink";
import { ModalErroDadosNaoCarregados } from "../../../components/Modals";
import api from "../../../utils/api";
import { FormatadorDados } from "../../../utils/utils";
import { valoresIniciaisEmpresaDados } from "../../../utils/constantes";

export function EmpresaDados() {
  const [data, setData] = useState<EmpresaDadosTypes>(valoresIniciaisEmpresaDados);
  let { id } = useParams();

  useEffect(() => {
    api.get(`usuario/${id}`)
      .then((item) => {
        if (!id) { return; }

        const { nome, email, senha, codigo, data_cadastro, data_modificacao_cadastro } = item.data;

        const senha_formatada = FormatadorDados.FormataExibicaoSenha(senha, 12);
        const data_cadastro_formatada = FormatadorDados.FormataData(data_cadastro);
        const data_modificacao_cadastro_formatada = FormatadorDados.FormataData(data_modificacao_cadastro);

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
          <Titulo tag="h1" className="w-100 text-center mb-5">{data.nome}</Titulo>
        </Col>
        <Col md={12}>
          <ListGroup>
            <ItemListaFichaDados titulo="Email" valor={data.email} />
            <ItemListaFichaDados titulo="Senha" valor={data.senha} />
            <ItemListaFichaDados titulo="Código" valor={data.codigo} />
            {/* <ItemListaFichaDados titulo="Status" valor={(data.ativo) ? 'Ativo' : 'Inativo'} /> */}
            <ItemListaFichaDados titulo="Data de cadastro" valor={data.data_cadastro} />
            <ItemListaFichaDados titulo="Data de atualização do cadastro" valor={data.data_modificacao_cadastro} />
          </ListGroup>
        </Col>
        <Col md={12} className="d-flex justify-content-end mt-5">
          <BotaoLink to={`/empresa/${id}/edicao`} color="primary">Editar</BotaoLink>
        </Col>
      </Row>
    </ContainerApp>
  );
}
