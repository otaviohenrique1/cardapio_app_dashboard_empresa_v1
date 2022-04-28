interface ExibePaginaInicioFimProps {
  pageIndex: number;
  pageOptions: number[];
}

export function ExibePaginaInicioFim(props: ExibePaginaInicioFimProps) {
  const { pageIndex, pageOptions } = props;

  let pagina_inicio = pageIndex + 1;
  let pagina_final = pageOptions.length;

  return (
    <p className="me-3 mb-0">Pagina {pagina_inicio} de {pagina_final}</p>
  );
}