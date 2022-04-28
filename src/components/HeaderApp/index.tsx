import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Nav, Navbar, NavItem, Collapse, DropdownItem, DropdownMenu, DropdownToggle, NavbarBrand, NavbarToggler, Dropdown } from "reactstrap";
import { BiUserCircle } from "react-icons/bi";
import { MdMenuBook } from "react-icons/md";
import { ModalConfirmacao, ModalConfirmacaoProps } from "../Modals";
import { Titulo } from "../Titulo";

interface HeaderAppProps {
  data_usuario_logado: UsuarioLogadoTypes;
}

export function HeaderApp(props: HeaderAppProps) {
  const { data_usuario_logado } = props;

  const navigate = useNavigate();

  const [aberto, setAberto] = useState<boolean>(false);
  const toggle = () => {
    setAberto(!aberto)
  };

  const [dropdownAberto, setDropdownAberto] = useState<boolean>(false);
  const toggleDropdown = () => {
    setDropdownAberto(!dropdownAberto)
  };

  function logout() {
    const data_modal: ModalConfirmacaoProps = {
      icone: "warning",
      titulo: "Aviso",
      mensagem: "Deseja sair?"
    };

    ModalConfirmacao(data_modal)
      .then((result) => {
        if (result.isConfirmed) {
          sessionStorage.clear();
          navigate("/");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <Navbar color="dark" dark expand="sm" light>
      <NavbarBrand>
        <Link to="/home" className="nav-link d-flex flex-row">
          <MdMenuBook size={30} color="white" />
          <span className="fw-bold ms-2 text-white">Administração</span>
        </Link>
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse navbar isOpen={aberto}>
        <Nav className="me-auto d-flex justify-content-between w-100" navbar>
          <NavItem>
            <Link to="/home" className="nav-link">Inicio</Link>
          </NavItem>
          <NavItem>
            <Link to="/administrador/lista" className="nav-link">Administradores</Link>
          </NavItem>
          <Dropdown toggle={toggleDropdown} isOpen={dropdownAberto}>
            <DropdownToggle caret className="d-flex flex-row justify-content-center align-items-center">
              <Titulo tag="h6" className="m-0">{data_usuario_logado.nome}</Titulo>
              {/* <h6 className="m-0">{props.data_usuario_logado.nome}</h6> */}
              <BiUserCircle size={30} className="ms-2" />
            </DropdownToggle>
            <DropdownMenu dark>
              <DropdownItem>
                <Link
                  to={`/administrador/${props.data_usuario_logado.id}`}
                  className="nav-link"
                  // onClick={() => {
                  //   alert(`id => ${props.data_usuario_logado.id}`);
                  // }}
                >Perfil</Link>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={logout}>Sair</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Nav>
      </Collapse>
    </Navbar>
  );
}