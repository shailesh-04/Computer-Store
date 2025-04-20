import computers,{ computersMigration } from "@migrations/computers";

async function callApi() {
    const result = await computersMigration.sql("select * from computers");
    console.log(result);   
    process.exit();
}
callApi();

