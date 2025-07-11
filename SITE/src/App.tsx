import AppRouter from "@routes/_index";
import { useEffect } from "react";
import { authorize } from "./services/Auth";
import { useUser } from "./context/UserContext";
import { Toaster } from "react-hot-toast";
function App() {
    const { login } = useUser();
    useEffect(() => {
        authorize()
            .then((res) => {
                localStorage.setItem("accessToken", res.accessToken);
                login(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <AppRouter />
            <Toaster />
        </>
    );
}
export default App;
