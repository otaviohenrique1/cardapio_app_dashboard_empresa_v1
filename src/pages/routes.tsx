// import { ReactNode, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./HomePage";
import { Login } from "./Login";
import { Pagina404 } from "./Pagina404";
import { EmpresaCadastro } from "./Empresa/EmpresaCadastro";
import { EmpresaDados } from "./Empresa/EmpresaDados";
import { EmpresaEdicao } from "./Empresa/EmpresaEdicao";
import { UsuarioCadastro } from "./Usuario/UsuarioCadastro";
import { UsuarioDados } from "./Usuario/UsuarioDados";
import { UsuarioEdicao } from "./Usuario/UsuarioEdicao";

export function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/usuario/cadastro" element={<UsuarioCadastro/>} />
        <Route path="/usuario/:id" element={<UsuarioDados/>} />
        <Route path="/usuario/:id/edicao" element={<UsuarioEdicao />} />
        <Route path="/home" element={<HomePage/>} />
        <Route path="/empresa/cadastro" element={<EmpresaCadastro/>} />
        <Route path="/empresa/:id" element={<EmpresaDados />} />
        <Route path="/empresa/:id/edicao" element={<EmpresaEdicao />} />
        <Route path="*" element={<Pagina404 />} />
      </Routes>
    </BrowserRouter>
  );
}

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export function AuthProvider(props: AuthProviderProps) {
//   let [user, setUser] = useState<any>(null);

//   return (
//     <div></div>
//   );
// }