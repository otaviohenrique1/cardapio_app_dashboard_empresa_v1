export const EMAIL_INVALIDO = "Email invalido";
export const valor_minimo_carateres = 8;
export const MINIMO_CARACTERES = `Minimo ${valor_minimo_carateres} carateres`;
export const valor_maximo_carateres = 64;
export const MAXIMO_CARACTERES = `Maximo ${valor_maximo_carateres} carateres`;

export const valoresIniciaisFormularioAdministrador: AdministradorTypes = {
  nome: "",
  email: "",
  senha: "",
};

export const dadosIniciaisFormularioLogin: LoginTypes = {
  email: "",
  senha: ""
};

export const valoresIniciaisFormularioEmpresa: AdministradorTypes = {
  nome: "",
  email: "",
  senha: "",
};

export const valoresIniciaisAdministradorDados: AdministradorDadosTypes = {
  id: "",
  nome: "",
  email: "",
  senha: "",
  codigo: "",
  data_cadastro: "",
  data_modificacao_cadastro: ""
};

/* Alterar se precisar colocar atributo cadastro ativo */
export const valoresIniciaisEmpresaDados: EmpresaDadosTypes = {
  id: "",
  nome: "",
  email: "",
  senha: "",
  // ativo: false,
  codigo: "",
  data_cadastro: "",
  data_modificacao_cadastro: ""
};

export const dadosIniciaisUsuarioLogado: UsuarioLogadoTypes = {
  id: '',
  nome: ''
};
