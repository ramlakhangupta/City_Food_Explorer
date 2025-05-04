import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomToast = () => {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={2000}
      hideProgressBar={false}
      closeOnClick
      pauseOnHover
      theme="colored"
      toastStyle={{
        backgroundColor: "#fefefe",
        color: "#2d2d2d",
        fontWeight: "600",
        borderRadius: "10px",
        fontSize: "16px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        borderLeft: "6px solid #a28c79",
      }}
    />
  );
};

export default CustomToast;
