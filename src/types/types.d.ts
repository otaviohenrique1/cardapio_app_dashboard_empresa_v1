/* Types */
type ButtonColors =
  "primary" |
  "secondary" |
  "success" |
  "danger" |
  "warning" |
  "info" |
  "light" |
  "dark" |
  "link";

type DataHoraFormatos =
  "HH:mm" |
  "HH:mm:ss" |
  "dd/MM/yyyy" |
  "yyyy-MM-dd" |
  'yyyy-MM-dd HH:mm' |
  'dd/MM/yyyy HH:mm' |
  'yyyy-MM-dd HH:mm:ss' |
  'dd/MM/yyyy HH:mm:ss';

type CampoInputTypes =
  "text" |
  "number" |
  "email" |
  "password";

/* Parte da Tabela da Homepage */
interface TabelaTypes {
  /* Alterar se precisar colocar atributo cadastro ativo */
  id: number;
  nome: string;
  ativo: boolean | string;
  // ativo: string;
}

/* Parte do Login */
interface LoginTypes {
  email: string;
  senha: string;
}

interface UsuarioLogadoTypes {
  id: string;
  nome: string;
}

/* Parte da Empresa */
interface EmpresaTypes {
  nome: string;
  email: string;
  senha: string;
  confirmacao_senha: string;
  ativo: boolean | string;
}

interface EmpresaDadosTypes extends EmpresaTypes {
  /* Alterar se precisar colocar atributo cadastro ativo */
  id: string;
  // ativo: boolean;
  codigo: string;
  data_cadastro: string;
  data_modificacao_cadastro: string;
}

/* Parte do Administrador */
interface AdministradorTypes {
  nome: string;
  email: string;
  senha: string;
  confirmacao_senha: string;
}

interface AdministradorDadosTypes extends AdministradorTypes {
  id: string;
  codigo: string;
  data_cadastro: string;
  data_modificacao_cadastro: string;
}
