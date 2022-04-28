import { Input } from "reactstrap";

interface IrParaPaginaProps {
  pageIndex: number;
  gotoPage: (updater: number | ((pageIndex: number) => number)) => void;
}

export function IrParaPagina(props: IrParaPaginaProps) {
  const { pageIndex, gotoPage } = props;

  return (
    <div className="d-flex justify-content-end align-items-center flex-row ms-3">
      <p className="w-100 mb-0 me-2 text-end">Ir para a pagina</p>
      <Input
        type="number"
        defaultValue={pageIndex + 1}
        onChange={event => {
          const numero_pagina = event.target.value;
          const pagina = numero_pagina ? Number(numero_pagina) - 1 : 0
          gotoPage(pagina)
        }}
      />
    </div>
  );
}
