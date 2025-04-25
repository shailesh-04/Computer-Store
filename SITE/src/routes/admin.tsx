import { Route } from "react-router-dom";
import Index from "@pages/admin/index";
export default function Admin():React.ReactElement{
    return <Route path="/admin" element={<Index />}></Route>;
}
