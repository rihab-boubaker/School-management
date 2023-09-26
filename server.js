
//import app file
const app= require("./backend/app");
//make server listening on port 3000
//http://localhost:3000
app.listen(3000, () => {
    console.log("be server is listening on port 3000 ....");
});