import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-toastify/dist/ReactToastify.css";
import "./assets/scss/themes.scss";

import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Route from "./Routes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 120000,
    },
  },
});

function App() {
  const navigate = useNavigate();
  // useEffect(() => {
  //   checkAutoLogin(navigate, signOut);
  // }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
      />
      <Route />
    </QueryClientProvider>
  );
}

export default App;
