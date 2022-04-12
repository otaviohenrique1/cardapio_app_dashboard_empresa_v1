interface TabelaTypes {
  id: number;
  nome: string;
  // ativo: string;
}

interface EmpresaDadosTypes {
  id: string;
  nome: string;
  email: string;
  senha: string;
  // ativo: boolean;
  codigo: string;
  data_cadastro: string;
  data_modificacao_cadastro: string;
}

interface AdministradorDadosTypes {
  id: string;
  nome: string;
  email: string;
  senha: string;
  codigo: string;
  data_cadastro: string;
  data_modificacao_cadastro: string;
}

interface FormularioLoginTypes {
  email: string;
  senha: string;
}

interface FormularioEmpresaTypes {
  nome: string;
  email: string;
  senha: string;
}

/* Alterar se precisar colocar atributo cadastro ativo */
interface FormularioAdministradorTypes {
  nome: string;
  email: string;
  senha: string;
  // cadastro_ativo: boolean;
}