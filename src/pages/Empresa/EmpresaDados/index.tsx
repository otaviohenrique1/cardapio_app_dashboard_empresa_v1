import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, ListGroup, Row } from "reactstrap";
import { ContainerApp } from "../../../components/ContainerApp";
import { Titulo } from "../../../components/Titulo";
import { ItemListaFichaDados, ItemListaFichaDadosProps } from "../../../components/Lista/ItemListaFichaDados";
import { BotaoLink } from "../../../components/Botoes/BotaoLink";
import { ModalErroDadosNaoCarregados } from "../../../components/Modals";
import { ApiBuscaDadosUmaEmpresa } from "../../../utils/api";
import { FormatadorDados } from "../../../utils/utils";
import { valoresIniciaisEmpresaDados } from "../../../utils/constantes";

export function EmpresaDados() {
  const [data, setData] = useState<EmpresaDadosTypes>(valoresIniciaisEmpresaDados);
  let { id } = useParams();

  useEffect(() => {
    if (!id) { return; }

    // api.get(`usuario/${id}`)
    ApiBuscaDadosUmaEmpresa(id)
      .then((item) => {
        if (!id) { return; }

        const { nome, email, senha, codigo, ativo, data_cadastro, data_modificacao_cadastro } = item.data;

        const senha_formatada = FormatadorDados.FormataExibicaoSenha(senha, 12);
        const data_cadastro_formatada = FormatadorDados.FormataData(data_cadastro);
        const data_modificacao_cadastro_formatada = FormatadorDados.FormataData(data_modificacao_cadastro);

        const data: EmpresaDadosTypes = {
          id, nome, email, senha: senha_formatada, ativo, codigo,
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

  const { email, senha, codigo, ativo, data_cadastro, data_modificacao_cadastro } = data;

  const item_lista_ficha_dados: ItemListaFichaDadosProps[] = [
    { titulo:"Email", valor: email },
    { titulo:"Senha", valor: senha },
    { titulo:"Código", valor: codigo },
    { titulo:"Cadastro ativo", valor: (ativo) ? 'Ativo' : 'Inativo' },
    { titulo:"Data de cadastro", valor: data_cadastro },
    { titulo:"Data de atualização do cadastro", valor: data_modificacao_cadastro },
  ];

  return (
    <ContainerApp>
      <Row>
        <Col md={12}>
          <Titulo tag="h1" className="w-100 text-center mb-5">{data.nome}</Titulo>
        </Col>
        <Col md={12}>
          <ListGroup>
            {item_lista_ficha_dados.map((item, index) => {
              const { titulo, valor } = item;
              return (
                <ItemListaFichaDados key={index} titulo={titulo} valor={valor} />
              );
            })}
            {/* <ItemListaFichaDados titulo="Status" valor={(data.ativo) ? 'Ativo' : 'Inativo'} /> */}
          </ListGroup>
        </Col>
        <Col md={12} className="d-flex justify-content-end mt-5">
          <BotaoLink to={`/empresa/${id}/edicao`} color="primary">Editar</BotaoLink>
        </Col>
      </Row>
    </ContainerApp>
  );
}
