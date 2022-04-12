import * as Yup from "yup";

export const valoresIniciaisFormularioUsuario: FormularioUsuarioTypes = {
  nome: "",
  email: "",
  senha: "",
};

export const validacaoSchemaFormularioUsuario = Yup.object().shape({
  nome: Yup.string().required("Campo vazio"),
  email: Yup.string().email("E-mail invalido").required("Campo vazio"),
  senha: Yup.string().min(8, "Minimo 8 carateres").max(64, 'Maximo 64 carateres').required("Campo vazio"),
});

export const dadosIniciaisFormularioLogin: FormularioLoginTypes = {
  email: "",
  senha: ""
};

export const schemaValidacaoFormularioLogin = Yup.object().shape({
  email: Yup.string().required('Campo vazio'),
  senha: Yup.string().required('Campo vazio'),
});

/* Alterar se precisar colocar atributo cadastro ativo */
export const valoresIniciaisFormularioEmpresa: FormularioEmpresaTypes = {
  nome: "",
  email: "",
  senha: "",
};

/* Alterar se precisar colocar atributo cadastro ativo */
export const validacaoSchemaFormularioEmpresa = Yup.object().shape({
  nome: Yup.string().required("Campo vazio"),
  email: Yup.string().email("E-mail invalido").required("Campo vazio"),
  senha: Yup.string().min(8, "Minimo 8 carateres").max(64, 'Maximo 64 carateres').required("Campo vazio"),
});
