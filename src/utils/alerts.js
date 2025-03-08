import Swal from "sweetalert2";

export const showError = (message = "An error has occurred") =>
    Swal.fire({
        title: "Error!",
        text: message,
        icon: "error",
        showCancelButton: false,
        confirmButtonText: "Close",
        customClass: {
            popup: "custom-swal-popup",
            confirmButton: "btn btn-red",
        },
    });

export const showLoad = (title = "Loading!", message = "Please wait...") =>
    Swal.fire({
        title: title,
        text: message,
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
            Swal.showLoading();
        },
    })

export const showSuccess = (title = "Success!", body = "Your data has been saved!", autoclose = true) =>
    Swal.fire({
        title: title,
        html: body,
        icon: "success",
        showCancelButton: false,
        confirmButtonText: "Close",
        customClass: {
            popup: "custom-swal-popup",
            confirmButton: "btn btn-blue",
        },
        timer: autoclose ? 1500 : undefined, // Auto-close after 3 seconds if `autoclose` is true
        timerProgressBar: autoclose, // Show progress bar only if auto-closing
    });