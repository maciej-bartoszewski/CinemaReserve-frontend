import Swal from "sweetalert2";

function SuccessDialog({ title, text }) {
  return Swal.fire({
    title,
    text,
    timer: 3000,
    timerProgressBar: true,
    icon: "success",
    background: "#222831",
    color: "#f8f9fa",
    confirmButtonColor: "#0096ff",
  });
}

export default SuccessDialog;
