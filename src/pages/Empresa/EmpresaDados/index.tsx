import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, ListGroup, Row } from "reactstrap";
import { ContainerApp } from "../../../components/ContainerApp";
import { Titulo } from "../../../components/Titulo";
// import api from "../../../utils/api";
import { ItemListaFichaDados } from "../../../components/Lista";
import { BotaoLink } from "../../../components/Botoes";
import { format } from "date-fns";
import { FormataExibicaoSenha } from "../../../utils/utils";

interface EmpresaDadosTypes {
  id: string;
  nome: string;
  email: string;
  senha: string;
  // ativo: boolean;
  codigo: string;
  data_cadastro: string;
  data_modificacao_cadastro: string;
}

const valoresIniciaisEmpresaDados: EmpresaDadosTypes = {
  id: "",
  nome: "",
  email: "",
  senha: "",
  // ativo: false,
  codigo: "",
  data_cadastro: "",
  data_modificacao_cadastro: ""
};

export function EmpresaDados() {
  const [data, setData] = useState<EmpresaDadosTypes>(valoresIniciaisEmpresaDados);
  let { id } = useParams();

  useEffect(() => {
    // api.get(`refeicao/${id}`)
    //   .then((item) => {
    //     if (!id) { return; }

    //     const nome = item.data.nome;
    //     const preco = item.data.preco;
    //     const ativo = item.data.ativo;
    //     const ingredientes = JSON.parse(String(item.data.ingredientes));
    //     const descricao = item.data.descricao;
    //     const codigo = item.data.codigo;
    //     const data_cadastro = FormataData(item.data.data_cadastro);
    //     const data_modificacao_cadastro = FormataData(item.data.data_cadastro);

    //     const data = { id, nome, preco, ativo, ingredientes, descricao, codigo, data_cadastro, data_modificacao_cadastro };

    //     setData(data);
    //   })
    //   .catch((erro) => {
    //     console.error(erro);
    //   });

    /* Arrumar */
    if (!id) { return; }
    setData({
      id,
      nome: "Juca",
      email: "juca@email.com",
      senha: "0123456789",
      codigo: "33be62ea-325d-4881-80a1-bb77b1162522",
      data_cadastro: format(new Date(), 'yyyy-MM-dd'),
      data_modificacao_cadastro: format(new Date(), 'yyyy-MM-dd')
    })
  }, [id]);

  return (
    <ContainerApp>
      <Row>
        <Col md={12}>
          <Titulo tag="h1" className="w-100 text-center mb-5">{data.nome}</Titulo>
        </Col>
        <Col md={12}>
          <ListGroup>
            <ItemListaFichaDados
              titulo="Email"
              valor={data.email}
            />
            <ItemListaFichaDados
              titulo="Senha"
              valor={FormataExibicaoSenha(data.senha)}
            />
            <ItemListaFichaDados
              titulo="Código"
              valor={data.codigo}
            />
            {/* <ItemListaFichaDados
              titulo="Status"
              valor={(data.ativo) ? 'Ativo' : 'Inativo'}
            /> */}
            <ItemListaFichaDados
              titulo="Data de cadastro"
              valor={data.data_cadastro}
            />
            <ItemListaFichaDados
              titulo="Data de atualização do cadastro"
              valor={data.data_modificacao_cadastro}
            />
          </ListGroup>
        </Col>
        <Col md={12} className="d-flex justify-content-end mt-5">
          <BotaoLink to={`/refeicao/${id}/edicao`} color="primary">Editar</BotaoLink>
        </Col>
      </Row>
    </ContainerApp>
  );
}
