import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./HomePage";
import { Login } from "./Login";
import { Pagina404 } from "./Pagina404";
import { EmpresaCadastro } from "./Empresa/EmpresaCadastro";
import { EmpresaDados } from "./Empresa/EmpresaDados";
import { EmpresaEdicao } from "./Empresa/EmpresaEdicao";
import { AdministradorCadastro } from "./Administrador/AdministradorCadastro";
import { AdministradorDados } from "./Administrador/AdministradorDados";
import { AdministradorEdicao } from "./Administrador/AdministradorEdicao";
import { ListaAdministradores } from "./Administrador/ListaAdministradores";

export function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/administrador/lista" element={<ListaAdministradores/>} />
        <Route path="/administrador/cadastro" element={<AdministradorCadastro/>} />
        <Route path="/administrador/:id" element={<AdministradorDados/>} />
        <Route path="/administrador/:id/edicao" element={<AdministradorEdicao />} />
        <Route path="/home" element={<HomePage/>} />
        <Route path="/empresa/cadastro" element={<EmpresaCadastro/>} />
        <Route path="/empresa/:id" element={<EmpresaDados />} />
        <Route path="/empresa/:id/edicao" element={<EmpresaEdicao />} />
        <Route path="*" element={<Pagina404 />} />
      </Routes>
    </BrowserRouter>
  );
}
