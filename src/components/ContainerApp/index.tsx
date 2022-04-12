import { ReactNode, useEffect, useState } from "react";
import { Container } from "reactstrap";
import { dadosIniciaisUsuarioLogado, HeaderApp, UsuarioLogadoDataTypes } from "../HeaderApp";

interface ContainerAppProps {
  children: ReactNode;
}

export function ContainerApp(props: ContainerAppProps) {
  const [data, setData] = useState<UsuarioLogadoDataTypes>(dadosIniciaisUsuarioLogado);

  useEffect(() => {
    let id = sessionStorage.getItem('id');
    let nome = sessionStorage.getItem('nome');

    let valida_id = (id) ? id : 'id';
    let valida_nome = (nome) ? nome : 'nome';

    const data_usuario = {
      id: valida_id,
      nome: valida_nome
    };

    setData(data_usuario);
  }, []);

  return (
    <>
      <HeaderApp data_usuario_logado={data} />
      <Container className="mt-2">{props.children}</Container>
    </>
  );
}