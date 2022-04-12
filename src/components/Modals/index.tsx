import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const SwalModal = withReactContent(Swal);

export function ModalConfirmacaoCadastro() {
  return SwalModal.fire({
    icon: 'success',
    title: "Cadastro realizado com sucesso!",
    buttonsStyling: false,
    confirmButtonText: 'Fechar',
    customClass: {
      confirmButton: 'btn btn-primary',
    },
  });
}

export function ModalErroCadastro() {
  return SwalModal.fire({
    icon: 'error',
    title: "Erro!",
    buttonsStyling: false,
    confirmButtonText: 'Fechar',
    customClass: {
      confirmButton: 'btn btn-primary',
    },
  });
}