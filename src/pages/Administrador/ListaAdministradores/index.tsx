import { useEffect, useMemo, useState } from "react";
import { useGlobalFilter, usePagination, useSortBy, useTable } from "react-table";
import { Col, DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledButtonDropdown } from "reactstrap";
import { Titulo } from "../../../components/Titulo";
import { BsFillGearFill } from "react-icons/bs";
import styled from "styled-components";
import { CampoFiltroGlobalTabela } from "../../../components/Filtros";
import { ContainerApp } from "../../../components/ContainerApp";
import api from "../../../utils/api";
import { ExibePaginaInicioFim } from "../../../components/Paginacao/ExibePaginaInicioFim";
import { IrParaPagina } from "../../../components/Paginacao/IrParaPagina";
import { Paginacao } from "../../../components/Paginacao/Paginacao";
import { QuantidadeItemsPorPagina } from "../../../components/Paginacao/QuantidadeItemsPorPagina";
import { BotaoLink } from "../../../components/Botoes";
import { Tabela } from "../../../components/Tabela";
import { ModalErroDadosNaoCarregados } from "../../../components/Modals";

export function ListaAdministradores() {
  const [data, setData] = useState<TabelaTypes[]>([]);

  useEffect(() => {
    api.get('administrador')
      .then((item) => {
        setData(item.data)
      })
      .catch((erro) => {
        ModalErroDadosNaoCarregados();
        console.error(erro);
      });
  }, []);

  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow,
    state, setGlobalFilter, canPreviousPage, canNextPage, pageOptions,
    pageCount, gotoPage, nextPage, previousPage, setPageSize,
    state: { pageIndex, pageSize }, } = useTable({
      columns: useMemo(() => [{
        Header: () => null,
        isVisible: false,
        id: 'usuarios',
        hideHeader: false,
        columns: [
          { Header: 'id', accessor: 'id', id: 'id' },
          { Header: 'Nome', accessor: 'nome', id: 'nome' },
          {
            Header: () => null,
            id: 'menu_item',
            Cell: (cell) => {
              const id_empresa = cell.row.values['id'];

              return (
                <UncontrolledButtonDropdownEstilizado>
                  <DropdownToggle caret className="caret-off d-flex justify-content-center align-items-center w-50 btn-success">
                    <BsFillGearFill size={20} />
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>
                      <BotaoLink
                        to={`/empresa/${id_empresa}`}
                        color="light"
                        className="nav-link text-center"
                      >Exibir</BotaoLink>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledButtonDropdownEstilizado>
              );
            }
          },
        ],
      },], [])
      , data, initialState: { pageIndex: 0 },
    }, useGlobalFilter, useSortBy, usePagination);

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

const UncontrolledButtonDropdownEstilizado = styled(UncontrolledButtonDropdown)`
  .caret-off::before {
    display: none;
  }

  .caret-off::after {
      display: none;
  }
  
  width: 100%;
`;
