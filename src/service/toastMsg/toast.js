import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastMsg = (status) => {
  if (status === "success") {
    console.log("success------");
    toast.success(` Successfully deleted`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      className: "bg-green-200",
    });
  }

  if (status === "error") {
    console.log("error");
    toast.error(`Error`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      className: "bg-red-200",
    });
  }
};
export default toastMsg;
