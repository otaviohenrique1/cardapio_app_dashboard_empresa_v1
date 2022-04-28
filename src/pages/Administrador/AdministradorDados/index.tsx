import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, ListGroup, Row } from "reactstrap";
import { BotaoLink } from "../../../components/Botoes/BotaoLink";
import { ContainerApp } from "../../../components/ContainerApp";
import { ItemListaFichaDados, ItemListaFichaDadosProps } from "../../../components/Lista/ItemListaFichaDados";
import { ModalErroDadosNaoCarregados } from "../../../components/Modals";
import { Titulo } from "../../../components/Titulo";
import { ApiBuscaDadosUmAdministrador } from "../../../utils/api";
import { valoresIniciaisAdministradorDados } from "../../../utils/constantes";
import { FormatadorDados } from "../../../utils/FormatadorDados";

export function AdministradorDados() {
  const [data, setData] = useState<AdministradorDadosTypes>(valoresIniciaisAdministradorDados);
  const { id } = useParams();

  useEffect(() => {
    if (!id) { return; }

    // api.get(`administrador/${id}`)
    ApiBuscaDadosUmAdministrador(id)
      .then((item) => {
        const { nome, email, senha, codigo, data_cadastro, data_modificacao_cadastro } = item.data;

        const senha_formatada = FormatadorDados.FormataExibicaoSenha(senha);
        const data_cadastro_formatada = FormatadorDados.FormatadorDataHora(data_cadastro, "dd/MM/yyyy HH:mm:ss");
        const data_modificacao_cadastro_formatada = FormatadorDados.FormatadorDataHora(data_modificacao_cadastro, "dd/MM/yyyy HH:mm:ss");
        // const data_modificacao_cadastro_formatada = FormatadorDados.FormatadorDataHora(data_modificacao_cadastro, "dd/MM/yyyy HH:mm:ss") || 'Data2';

        const data: AdministradorDadosTypes = {
          id,
          nome,
          email,
          senha: senha_formatada,
          codigo,
          data_cadastro: data_cadastro_formatada,
          data_modificacao_cadastro: data_modificacao_cadastro_formatada,
          confirmacao_senha: ""
        };

        setData(data);
      })
      .catch((error) => {
        ModalErroDadosNaoCarregados();
        console.error(error);
      });
  }, [id]);

  const { nome, email, senha, codigo, data_cadastro, data_modificacao_cadastro } = data;

  const item_lista_ficha_dados: ItemListaFichaDadosProps[] = [
    { titulo: "ID", valor: id},
    { titulo: "Nome", valor: nome},
    { titulo: "E-mail", valor: email},
    { titulo: "Senha", valor: senha},
    { titulo: "Código", valor: codigo},
    { titulo: "Data de cadastro", valor: data_cadastro},
    { titulo: "Data de atualização do cadastro", valor: data_modificacao_cadastro},
  ];

  return (
    <ContainerApp>
      <Row>
        <Col md={12}>
          <Titulo tag="h1" className="w-100 text-center mt-3 mb-5">Dados do administrador</Titulo>
        </Col>
        <Col md={12}>
          <ListGroup>
            {item_lista_ficha_dados.map((item, index) => {
              const { titulo, valor } = item;
              return (
                <ItemListaFichaDados key={index} titulo={titulo} valor={valor} />
              );
            })}
          </ListGroup>
        </Col>
        <Col md={12} className="d-flex justify-content-end mt-5">
          <BotaoLink to={`/administrador/${id}/edicao`} color="primary">Editar</BotaoLink>
        </Col>
      </Row>
    </ContainerApp>
  );
}