import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:3333/'
});

export default api;

/* ApiBuscaLoginAdministrador */
export interface ApiBuscaLoginAdministradorTypes {
  data: { email: string; senha: string; };
  auth: { username: string; password: string; };
}

export function ApiBuscaLoginAdministrador(data_login: ApiBuscaLoginAdministradorTypes) {
  // api.post('administrador/login', data, { auth })
  const { data, auth } = data_login;
  return api.post('administrador/login', data, { auth });
}

/* ApiBuscaDadosTodosAdministradores */
export function ApiBuscaDadosTodosAdministradores() {
  // api.get('administrador')
  return api.get('administrador');
}

/* ApiBuscaDadosUmAdministrador */
export function ApiBuscaDadosUmAdministrador(id: string) {
  // api.get(`administrador/${id}`)
  return api.get(`administrador/${id}`);
}

/* ApiCadastroAdministrador */
export interface ApiCadastroAdministradorTypes {
  nome: string;
  email: string;
  senha: string;
  data_cadastro: string;
  data_modificacao_cadastro: string;
}

export function ApiCadastroAdministrador(data_cadastro: ApiCadastroAdministradorTypes) {
  // api.post('usuario', data)
  return api.post('administrador', data_cadastro);
}

/* ApiEdicaoAdministrador */
export interface ApiEdicaoAdministradorTypes {
  id: string;
  nome: string;
  email: string;
  senha: string;
  data_modificacao_cadastro: string;
}

export function ApiEdicaoAdministrador(data_edicao: ApiEdicaoAdministradorTypes) {
  // api.put(`administrador/${id}`, data)
  return api.put(`administrador/${data_edicao.id}`, data_edicao);
}

/* ApiBuscaDadosTodasEmpresas */
export function ApiBuscaDadosTodasEmpresas() {
  // api.get('usuario')
  return api.get('usuario');
}

/* ApiCadastroEmpresa */
export interface ApiCadastroEmpresaTypes {
  nome: string;
  email: string;
  senha: string;
  ativo: boolean | string;
  data_cadastro: string;
  data_modificacao_cadastro: string;
}

export function ApiCadastroEmpresa(data_cadastro: ApiCadastroEmpresaTypes) {
  // api.post('usuario', data)
  return api.post('usuario', data_cadastro);
}

/* ApiEdicaoEmpresa */
export interface ApiEdicaoEmpresaTypes {
  id: string;
  nome: string;
  email: string;
  senha: string;
  ativo: boolean | string;
  data_modificacao_cadastro: string;
}

export function ApiEdicaoEmpresa(data_edicao: ApiEdicaoEmpresaTypes) {
  // api.put(`usuario/${id}`, data)
  return api.put(`usuario/${data_edicao.id}`, data_edicao);
}

/* ApiBuscaDadosUmaEmpresa */
export function ApiBuscaDadosUmaEmpresa(id: string) {
  // api.get(`usuario/${id}`)
  return api.get(`usuario/${id}`);
}
