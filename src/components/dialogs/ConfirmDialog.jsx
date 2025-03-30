import Swal from "sweetalert2";

function ConfirmDialog({ title, text, confirmText, cancelText }) {
  return Swal.fire({
    title,
    text,
    icon: "warning",
    background: "#222831",
    color: "#f8f9fa",
    iconColor: "#0096ff",
    showCancelButton: true,
    confirmButtonColor: "#fb2c36",
    cancelButtonColor: "#0096ff",
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
  });
}

export default ConfirmDialog;
