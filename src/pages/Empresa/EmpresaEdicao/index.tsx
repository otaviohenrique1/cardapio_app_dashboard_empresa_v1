import { Col, Row } from "reactstrap";
import { Titulo } from "../../../components/Titulo";
// import api from "../../../utils/api";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ContainerApp } from "../../../components/ContainerApp";
import { validacaoSchemaFormularioEmpresa, valoresIniciaisFormularioEmpresa } from "../../../utils/constantes";
import { EmpresaRefeicao } from "../../../components/Formularios/FormularioRefeicao";
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
import { format } from "date-fns";

// const SwalModal = withReactContent(Swal);

export function EmpresaEdicao() {
  const [data, setData] = useState<FormularioEmpresaTypes>(valoresIniciaisFormularioEmpresa);
  const navigation = useNavigate();

  let { id } = useParams();

  useEffect(() => {
    // api.get(`refeicao/${id}`)
    //   .then((item) => {
    //     const nome = item.data.nome;
    //     const preco = item.data.preco;
    //     const ativo = item.data.ativo;
    //     const ingredientes = JSON.parse(String(item.data.ingredientes));
    //     const descricao = item.data.descricao;
    //     const imagens = item.data.imagens.map((imagem: any) => ({
    //       fileName: imagem.name,
    //       type: imagem.type,
    //       size: `${imagem.size} bytes`
    //     }));

    //     const data = { nome, preco, ativo, ingredientes, descricao, imagens };

    //     setData(data);
    //   })
    //   .catch((erro) => {
    //     console.error(erro);
    //   });
    setData({
      nome: "Juca",
      email: "juca@email.com",
      senha: "0123456789",
    })
  }, [id]);

  const dadosDaEmpresa: FormularioEmpresaTypes = {
    nome: data.nome || "",
    email: data.email || "",
    senha: data.senha || "",
    // ativo: data.ativo || false,
  };

  async function handleSubmit(values: FormularioEmpresaTypes) {
    const nome = values.nome;
    const email = values.email;
    const senha = values.senha;
    // const ativo = values.ativo;
    let data_modificacao_cadastro = format(new Date(), 'yyyy-MM-dd');

    let data = {
      nome,
      email,
      senha,
      data_modificacao_cadastro
    };

    console.log(data);

    alert(`
      nome: ${nome}
      email: ${email}
      senha: ${senha}
      data: ${data_modificacao_cadastro}
    `);

    // await api.put(`refeicao/${id}`, {
    //   'id': id,
    //   'nome': nome,
    //   'preco': preco,
    //   'ingredientes': ingredientes,
    //   'descricao': descricao,
    //   'ativo': ativo,
    //   'data_modificacao_cadastro': data_modificacao_cadastro,
    // }).then(() => {
    //   SwalModal.fire({
    //     title: "Cadastro alterado com sucesso!",
    //     buttonsStyling: false,
    //     confirmButtonText: 'Fechar',
    //     customClass: {
    //       confirmButton: 'btn btn-primary',
    //     },
    //   });
    //   navigation(`/refeicao/${id}`);
    // }).catch((error) => {
    //   console.error(error);
    // });
    navigation(`/refeicao/${id}`);
  }

  return (
    <ContainerApp>
      <Row>
        <Col md={12}>
          <Titulo tag="h1" className="w-100 text-center mb-5">Edição de dados</Titulo>
        </Col>
        <EmpresaRefeicao
          initialValues={dadosDaEmpresa}
          validationSchema={validacaoSchemaFormularioEmpresa}
          onSubmit={handleSubmit}
          enableReinitialize={true}
          voltarLink={`/refeicao/${id}`}
        />
      </Row>
    </ContainerApp>
  );
}
