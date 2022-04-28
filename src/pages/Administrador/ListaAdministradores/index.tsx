import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { CellProps, Column, TableOptions, TableState, useGlobalFilter, usePagination, useSortBy, useTable } from "react-table";
import { Col, DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledButtonDropdown } from "reactstrap";
import styled from "styled-components";
import { BsFillGearFill } from "react-icons/bs";
import { Titulo } from "../../../components/Titulo";
import { CampoFiltroGlobalTabela } from "../../../components/Filtros";
import { ContainerApp } from "../../../components/ContainerApp";
import { ExibePaginaInicioFim } from "../../../components/Paginacao/ExibePaginaInicioFim";
import { IrParaPagina } from "../../../components/Paginacao/IrParaPagina";
import { Paginacao } from "../../../components/Paginacao/Paginacao";
import { QuantidadeItemsPorPagina } from "../../../components/Paginacao/QuantidadeItemsPorPagina";
import { BotaoLink } from "../../../components/Botoes/BotaoLink";
import { Tabela } from "../../../components/Tabela";
import { ModalErroDadosNaoCarregados } from "../../../components/Modals";
import { ApiBuscaDadosTodosAdministradores } from "../../../utils/api";
import { To } from "react-router-dom";

export function ListaAdministradores() {
  const [data, setData] = useState<TabelaTypes[]>([]);

  useEffect(() => {
    // api.get('administrador')
    ApiBuscaDadosTodosAdministradores()
      .then((item) => {
        setData(item.data)
      })
      .catch((erro) => {
        ModalErroDadosNaoCarregados();
        console.error(erro);
      });
  }, []);

  const columns: readonly Column<TabelaTypes>[] = useMemo(() => [
    {
      Header: () => null,
      isVisible: false,
      id: 'administradores',
      hideHeader: false,
      columns: [
        {
          Header: 'id',
          accessor: 'id',
          id: 'id'
        },
        {
          Header: 'Nome',
          accessor: 'nome',
          id: 'nome'
        },
        {
          Header: () => null,
          id: 'menu_item',
          Cell: (cell: PropsWithChildren<CellProps<never, any>>) => {
            const id_administrador = cell.row.values['id'];

            return (
              <ListaAdministradoresItemDropdown to={`/administrador/${id_administrador}`} />
            );
          }
        },
      ],
    },
  ], []);

  const initialState: Partial<TableState<TabelaTypes>> = { pageIndex: 0 };

  const table_options: TableOptions<TabelaTypes> = { columns, data, initialState };

  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow,
    state, setGlobalFilter, canPreviousPage, canNextPage, pageOptions,
    pageCount, gotoPage, nextPage, previousPage, setPageSize,
    state: { pageIndex, pageSize }, } = useTable(table_options, useGlobalFilter, useSortBy, usePagination);

  return (
    <ContainerApp>
      <Row>
        <Col md={12} className="mt-3 mb-3">
          <Titulo tag="h1">Lista de administradores</Titulo>
        </Col>
        <Col md={12} className="d-flex justify-content-between align-items-center flex-row">
          <QuantidadeItemsPorPagina
            pageSize={pageSize}
            setPageSize={setPageSize}
          />
          <CampoFiltroGlobalTabela
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        </Col>
        <Tabela
          getTableProps={getTableProps}
          headerGroups={headerGroups}
          getTableBodyProps={getTableBodyProps}
          page={page}
          prepareRow={prepareRow}
        />
        <Col md={12} className="d-flex justify-content-end align-items-center flex-row mb-5">
          <ExibePaginaInicioFim
            pageIndex={pageIndex}
            pageOptions={pageOptions}
          />
          <Paginacao
            gotoPage={gotoPage}
            nextPage={nextPage}
            previousPage={previousPage}
            canPreviousPage={canPreviousPage}
            canNextPage={canNextPage}
            pageCount={pageCount}
          />
          <IrParaPagina
            pageIndex={pageIndex}
            gotoPage={gotoPage}
          />
        </Col>
      </Row>
    </ContainerApp>
  );
}

interface ListaAdministradoresItemDropdownProps {
  to: To;
}

function ListaAdministradoresItemDropdown(props: ListaAdministradoresItemDropdownProps) {
  const { to } = props;
  return (
    <UncontrolledButtonDropdownEstilizado>
      <DropdownToggle caret className="caret-off d-flex justify-content-center align-items-center w-50 btn-success">
        <BsFillGearFill size={20} />
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem>
          <BotaoLink
            to={to}
            color="light"
            className="nav-link text-center"
          >Exibir</BotaoLink>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledButtonDropdownEstilizado>
  );
}

const UncontrolledButtonDropdownEstilizado = styled(UncontrolledButtonDropdown)`
  .caret-off::before {
    display: none;
  }

  .caret-off::after {
      display: none;
  }
  
  width: 100%;
`;
