import * as Yup from "yup";
import { Mensagem } from "./utils";

export const EMAIL_INVALIDO = "E-mail invalido";
export const MINIMO_CARACTERES = "Minimo 8 carateres";
export const MAXIMO_CARACTERES = 'Maximo 64 carateres';
export const valor_minimo_carateres = 8;
export const valor_maximo_carateres = 64;

export const valoresIniciaisFormularioAdministrador: FormularioAdministradorTypes = {
  nome: "",
  email: "",
  senha: "",
};

export const validacaoSchemaFormularioAdministrador = Yup.object().shape({
  nome: Yup
    .string()
    .required(Mensagem.GeraMensagemErro('nome')),
  email: Yup
    .string()
    .email(EMAIL_INVALIDO)
    .required(Mensagem.GeraMensagemErro('email')),
  senha: Yup
    .string()
    .min(valor_minimo_carateres, MINIMO_CARACTERES)
    .max(valor_maximo_carateres, MAXIMO_CARACTERES)
    .required(Mensagem.GeraMensagemErro('senha')),
});

export const dadosIniciaisFormularioLogin: FormularioLoginTypes = {
  email: "",
  senha: ""
};

export const schemaValidacaoFormularioLogin = Yup.object().shape({
  email: Yup
    .string()
    .email(EMAIL_INVALIDO)
    .required(Mensagem.GeraMensagemErro('email')),
  senha: Yup
    .string()
    .min(valor_minimo_carateres, MINIMO_CARACTERES)
    .max(valor_maximo_carateres, MAXIMO_CARACTERES)
    .required(Mensagem.GeraMensagemErro('senha')),
});

/* Alterar se precisar colocar atributo cadastro ativo */
export const valoresIniciaisFormularioEmpresa: FormularioAdministradorTypes = {
  nome: "",
  email: "",
  senha: "",
};

/* Alterar se precisar colocar atributo cadastro ativo */
export const validacaoSchemaFormularioEmpresa = Yup.object().shape({
  nome: Yup
    .string()
    .required(Mensagem.GeraMensagemErro('nome')),
  email: Yup
    .string()
    .email(EMAIL_INVALIDO)
    .required(Mensagem.GeraMensagemErro('email')),
  senha: Yup
    .string()
    .min(valor_minimo_carateres, MINIMO_CARACTERES)
    .max(valor_maximo_carateres, MAXIMO_CARACTERES)
    .required(Mensagem.GeraMensagemErro('senha')),
});


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

export const valoresIniciaisAdministradorDados: AdministradorDadosTypes = {
  id: "",
  nome: "",
  email: "",
  senha: "",
  codigo: "",
  data_cadastro: "",
  data_modificacao_cadastro: ""
};