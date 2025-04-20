import computers,{ computersMigration } from "@migrations/computers";

async function callApi() {
    try {
        
        await computers.create({
            brand:"",
            model:"",
            price:0
        });
        console.log("Successfuly Insert New Record");
    } catch (error) {
        
    }
    const result = await computersMigration.sql("select * from computers");
    console.log(result);   
    process.exit();
}
callApi();

