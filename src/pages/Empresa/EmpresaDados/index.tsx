import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, ListGroup, Row } from "reactstrap";
import { ContainerApp } from "../../../components/ContainerApp";
import { Titulo } from "../../../components/Titulo";
import api from "../../../utils/api";
import { ItemListaFichaDados } from "../../../components/Lista";
import { BotaoLink } from "../../../components/Botoes";
import { FormatadorDados } from "../../../utils/utils";
import { ModalErroDadosNaoCarregados } from "../../../components/Modals";
import { valoresIniciaisEmpresaDados } from "../../../utils/constantes";

export function EmpresaDados() {
  const [data, setData] = useState<EmpresaDadosTypes>(valoresIniciaisEmpresaDados);
  let { id } = useParams();

  useEffect(() => {
    api.get(`usuario/${id}`)
      .then((item) => {
        if (!id) { return; }

        const nome = item.data.nome;
        const email = item.data.email;
        const senha = FormatadorDados.FormataExibicaoSenha(String(item.data.senha), 12);
        const codigo = item.data.codigo;
        const data_cadastro = FormatadorDados.FormataData(item.data.data_cadastro);
        const data_modificacao_cadastro = FormatadorDados.FormataData(item.data.data_cadastro);

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
