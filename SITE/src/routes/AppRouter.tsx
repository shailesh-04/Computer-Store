import { BrowserRouter,Routes,Route} from "react-router-dom";
import Login from "@pages/login";
export default function AppRouter() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" Component={Login}/>
        </Routes>
    </BrowserRouter> 
  )
}
