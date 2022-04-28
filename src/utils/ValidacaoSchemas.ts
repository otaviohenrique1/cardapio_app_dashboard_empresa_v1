import * as Yup from "yup";
import { EMAIL_INVALIDO, valor_minimo_carateres, MINIMO_CARACTERES, valor_maximo_carateres, MAXIMO_CARACTERES } from "./constantes";
import { Mensagem } from "./utils";

const nome = Yup
  .string()
  .required(Mensagem.GeraMensagemErro("nome"));

const email = Yup
  .string()
  .email(Mensagem.GeraMensagemErro(EMAIL_INVALIDO))
  .required(Mensagem.GeraMensagemErro("email"));

const senha = Yup
  .string()
  .min(valor_minimo_carateres, MINIMO_CARACTERES)
  .max(valor_maximo_carateres, MAXIMO_CARACTERES)
  .required(Mensagem.GeraMensagemErro("senha"));

const confirmacao_senha = Yup
  .string()
  .when("senha", {
    is: (val: string) => (val && val.length > 0 ? true : false),
    then: Yup.string().oneOf(
      [Yup.ref("senha")],
      "As senhas não são iguais!"
    )
  });
  
export const validacaoSchemaFormularioAdministrador = Yup.object().shape({
  nome, email, senha, confirmacao_senha
});

export const schemaValidacaoFormularioLogin = Yup.object().shape({
  email, senha,
});

/* Alterar se precisar colocar atributo cadastro ativo */
export const validacaoSchemaFormularioEmpresa = Yup.object().shape({
  nome, email, senha,
});
