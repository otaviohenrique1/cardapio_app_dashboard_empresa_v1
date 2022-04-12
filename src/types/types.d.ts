interface TabelaTypes {
  id: number;
  nome: string;
  // ativo: string;
}

interface FormularioUsuarioTypes {
  nome: string;
  email: string;
  senha: string;
}

interface FormularioLoginTypes {
  email: string;
  senha: string;
}

/* Alterar se precisar colocar atributo cadastro ativo */
interface FormularioEmpresaTypes extends FormularioUsuarioTypes {
  // cadastro_ativo: boolean;
}