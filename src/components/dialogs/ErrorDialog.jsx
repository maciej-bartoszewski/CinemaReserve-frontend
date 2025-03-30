import Swal from "sweetalert2";

function ErrorDialog({ title, text }) {
  return Swal.fire({
    title,
    text,
    timer: 3000,
    timerProgressBar: true,
    icon: "error",
    background: "#222831",
    color: "#f8f9fa",
    confirmButtonColor: "#0096ff",
  });
}

export default ErrorDialog;
