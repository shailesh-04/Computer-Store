import env from "@config/env";
import app from "@config/app";

app.listen(env.PORT,()=>{
    console.log("server started : http://localhost:"+env.PORT);
});