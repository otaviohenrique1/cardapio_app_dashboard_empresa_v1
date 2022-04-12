interface ExibePaginaInicioFimProps {
  pageIndex: number;
  pageOptions: number[];
}

export function ExibePaginaInicioFim(props: ExibePaginaInicioFimProps) {
  let pagina_inicio = props.pageIndex + 1;
  let pagina_final = props.pageOptions.length;

  return (
    <p className="me-3 mb-0">Pagina {pagina_inicio} de {pagina_final}</p>
  );
}