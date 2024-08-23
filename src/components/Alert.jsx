import Swal from "sweetalert2";

export const ToastAlert = (icon, message) => {
  return Swal.fire({
    icon: icon,
    title: message,
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
};

export const CenterAlert = (icon, title, message) => {
  return Swal.fire({
    icon: icon,
    title: title,
    text: message,
  });
};
