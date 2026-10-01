import app from "./app.js";


async function start() {

    app.listen(3000, () => {
        console.log("3 - rodando porta 3000");
    });

}

start();
