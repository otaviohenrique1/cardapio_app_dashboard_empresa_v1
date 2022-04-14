import { format } from "date-fns";
import { SHA512, enc, lib, /* PBKDF2, */ AES, format as format_crypto_js } from "crypto-js";

export class ConversorListas {
  /**
   * Converte array de objetos lista de ingredientes para uma string
   */
  static ConverteArrayObjetosParaString2(lista: { nome: string }[]) {
    return JSON.stringify(lista);
  }

  /**
   * Converte string lista de ingredientes para uma array de objetos
   */
  static ConverteStringParaArrayObjetos2(texto: string) {
    return JSON.parse(texto);
  }
}

/**
 * Classe que exibe mensagem.
 */
export class Mensagem {
  /**
   * Gera mensagem simples.
   * @param mensagem Valor do tipo string
   * @return Valor do tipo string
   */
  static GeraMensagem(mensagem: string) {
    return mensagem;
  }

  /**
   * Gera mensagem de erro.
   * @param nome_campo Valor do tipo string
   * @return Valor do tipo string
   */
  static GeraMensagemErro(nome_campo: string) {
    let texto = `Campo ${nome_campo} esta vazio`;
    let resultado = this.GeraMensagem(texto);
    return resultado;
  }
}

/**
 * Classe que formata dados.
 */
export class FormatadorDados {
  /**
   * Formata a exibição da senha
   * Troca os caracteres da senha por '*' (asteriscos)
   * e limita o tamanho do texto em um determinado valor de caracteres.
   * @param senha Valor do tipo string
   * @param tamanho_string Valor do tipo number (Opcional)
   * @return Valor do tipo string
   * @example
   *  0123456789 => **********
   */
  static FormataExibicaoSenha(senha: string, tamanho_string?: number): string {
    let valida_tamanho_string = (tamanho_string !== undefined) ? tamanho_string : 10;
    let resultado = senha
      .replaceAll(/[0-9a-zA-Z]/g, '*')
      .slice(0, valida_tamanho_string);
    return resultado;
  }

  /**
   * Formata data e hora
   * Formata um valor do tipo Date no formato 'dd/MM/yyyy às HH:mm'.
   * @param data Valor do tipo Date
   * @return Valor do tipo string com formato 'dd/MM/yyyy às HH:mm'
   * @example
   *  Tue Apr 12 2022 14:34:14 GMT-0300 => 12/04/2022 às 14:34
   */
  static FormataDataHora(data: Date) {
    let data_formatada = this.FormataData(data);
    let hora_formatada = this.FormataHora(data);
    let resultado = `${data_formatada} às ${hora_formatada}`;
    return resultado;
  }

  /**
   * Formata hora
   * Formata um valor do tipo Date no formato 'HH:mm'.
   * @param data Valor do tipo Date
   * @return Valor do tipo string com formato 'HH:mm'
   * @example
   *  Tue Apr 12 2022 14:34:14 GMT-0300 => 14:34
   */
  static FormataHora(data: Date) {
    let resultado = format(new Date(data), 'HH:mm');
    return resultado;
  }

  /**
   * Formata data
   * Formata um valor do tipo Date no formato 'dd/MM/yyyy'.
   * @param data Valor do tipo Date
   * @return Valor do tipo string com formato 'dd/MM/yyyy'
   * @example
   *  Tue Apr 12 2022 14:34:14 GMT-0300 => 12/04/2022
   */
  static FormataData(data: Date) {
    let resultado = format(new Date(data), 'dd/MM/yyyy');
    return resultado;
  }

  /**
   * Gera data formata
   * Pega o valor da data atual e retorna um valor
   * com formato 'dd/MM/yyyy'.
   * @return Data atual no tipo string com formato 'dd/MM/yyyy'
   * @example
   *  Tue Apr 12 2022 14:34:14 GMT-0300 => 12/04/2022
   */
  static GeraDataFormata() {
    let resultado = format(new Date(), 'dd/MM/yyyy');
    return resultado;
  }

  /**
   * Gera data formata
   * Pega o valor da data atual e retorna um valor
   * com formato 'yyyy-MM-dd'.
   * @return Data atual no tipo string com formato 'yyyy-MM-dd'
   * @example
   *  Tue Apr 12 2022 14:34:14 GMT-0300 => 2022-04-12
   */
  static GeraDataFormata2() {
    let resultado = format(new Date(), 'yyyy-MM-dd');
    return resultado;
  }

  /**
   * Gera data e hora formata
   * Pega o valor da data atual e retorna um valor
   * com formato 'yyyy-MM-dd HH:mm:ss'.
   * @return Data atual no tipo string com formato 'yyyy-MM-dd HH:mm:ss'
   * @example
   *  Tue Apr 12 2022 14:34:14 GMT-0300 => 2022-04-12 14:34:14
   */
  static GeraDataComHoraFormata() {
    let resultado = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    return resultado;
  }

  /**
   * Formata valor monetario
   * Substitui o '.' (ponto) por ',' (virgula),
   * fixa o valor em 2 casas decimais e
   * converte o valor do tipo number para o tipo string.
   * @param valor Valor do tipo number
   * @return Valor monetario no tipo string
   * @example
   *  10.0 => 10,0
   */
  static FormataValorMonetarioTexto(valor: number) {
    let resultado = valor
      .toFixed(2)
      .toString()
      .replace('.', ',');
    return resultado;
  }
}

export class FormatadorCrypto {
  /**
   * Converte senha para um hash usando SHA512.
   * @param senha Valor do tipo string
   * @return Valor hash
   */
  static mensagemSHA512(senha: string) {
    const resultado = SHA512(senha).toString(enc.Hex);
    return resultado;
  }

  // var ciphertext = CryptoJS.AES.encrypt('my message', 'secret key 123').toString();
  static encrypt_message(mensagem: string | lib.WordArray) {
    const secret_key = "chave_teste"; /* alterar, colocar chave RSA */
    let resultado = AES
      .encrypt(mensagem, secret_key)
      .toString(format_crypto_js.OpenSSL);
    return resultado;
  }

  static decrypt_message(mensagem: string | lib.CipherParams) {
    const secret_key = "chave_teste"; /* alterar, colocar chave RSA */
    let resultado = AES
      .decrypt(mensagem, secret_key)
      .toString(enc.Utf8);
    return resultado;
  }
  // Decrypt
  // var bytes  = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
  // var originalText = bytes.toString(CryptoJS.enc.Utf8);
}


// export function gerarSalt() {
//   return lib.WordArray.random(128 / 8).toString(enc.Hex);
// }

// export function gerarKey512Bits1000Iterations(senha: string, salt: string) {
//   ;
//   // var key512Bits1000Iterations = CryptoJS.PBKDF2(senha, salt, {
//   //   keySize: 512 / 32,
//   //   iterations: 1000
//   // });
//   var key512Bits1000Iterations = CryptoJS.PBKDF2(senha, salt);
//   return key512Bits1000Iterations;
// }

// export function gerarSenha(senha: string) {
//   let salt = gerarSalt();
//   let senhaESalt = sha512(senha);
// }

// import { randomBytes, createHmac } from "crypto";

// export function gerarSalt(size: number) {
//   return randomBytes(size).toString('hex');
// }

// export function sha512(senha: string, salt: string) {
//   let hash = createHmac('sha512', salt);
//   hash.update(senha);
//   let hash2 = hash.digest('hex');
//   return { salt, hash2 };
// }

// export function gerarSenha(senha: string) {
//   let salt = gerarSalt(16);
//   let senhaESalt = sha512(senha, salt);
//   return senhaESalt;
// }

// export function login(senhaDoLogin: string, saltNoBanco: string, hashNoBanco: string) {
//   var senhaESalt = sha512(senhaDoLogin, saltNoBanco)
//   return hashNoBanco === senhaESalt.hash2;
// }

// export function gerarPBKDF2(senha: string, salt: string) {
//   let keySize = 256;
//   // let iterations = 1000;
//   let key = PBKDF2(senha, salt, {
//     keySize: keySize / 32,
//     // iterations: iterations
//   });
//   return key;
// }

// export function encryptSenha(msg: string, senha: string) {
//   let salt = gerarSalt();
//   return;
// }

/*
  export function ConverteArrayObjetosParaString2(lista: { nome: string }[]) {
    return JSON.stringify(lista);
  }

  export function ConverteStringParaArrayObjetos2(texto: string) {
    return JSON.parse(texto);
  }

  export function senhaSHA512(senha: string) {
    return SHA512(senha).toString(enc.Hex);
  }

  export function Mensagem(texto: string) {
    return texto;
  }

  export function MensagemErro(campo: string) {
    return Mensagem(`Campo ${campo} esta vazio`);
  }

  export function FormataExibicaoSenha(senha: string): string {
    return (senha).replaceAll(/[0-9a-zA-Z]/g, '*').slice(0, 20);
  }

  export function FormataDataHora(valor: Date) {
    let dataFinal = format(valor, 'dd/MM/yyyy');
    let horaFinal = format(valor, 'HH:mm');
    return `${dataFinal} às ${horaFinal}`;
  }

  export function GeraDataFormata() {
    return format(new Date(), 'dd/MM/yyyy');
  }

  export function FormataData(valor: string) {
    return format(new Date(valor), 'dd/MM/yyyy');
  }

  export function FormataValorMonetarioTexto(valor: number) {
    return valor.toFixed(2).toString().replace('.', ',');
  }
*/