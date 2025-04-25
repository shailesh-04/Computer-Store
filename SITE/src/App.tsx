import AppRouter from "@routes/AppRouter";
import { useEffect } from "react";
import { authorize } from "./services/Auth";
import { useUser } from "./context/UserContext";
function App() {
    const {login} = useUser();
    useEffect(()=>{
        authorize().then((res)=>{
            localStorage.setItem("accessToken",res.accessToken);
            login(res.data);
        }).catch((err)=>{
            console.log(err);
        });
    },[]);
    
    return (
        <AppRouter/>
    );
}
export default App;
