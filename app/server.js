const { AllRoutes } = require('./routes/router');

module.exports = class Application {

    #express = require('express');
    #app = this.#express();

    constructor(DB_URI, PORT) {
        this.configDatabase(DB_URI);
        this.configApplication();
        this.createServer(PORT);
        this.createRoutes();
        this.errorHandler();
    }

    configApplication() {
        this.#app.use(this.#express.json());
        this.#app.use(this.#express.urlencoded({ extended: true }));
    }

    configDatabase(DB_URI) {
        const mongoose = require('mongoose');
        mongoose.set("strictQuery", false);
        mongoose.connect(DB_URI, (error) => {
            if(error) throw error;
            return console.log("Connected To Database...");
        })
    }

    createServer(PORT) {
        const http = require('http');
        const server = http.createServer(this.#app);
        server.listen(PORT, () => {
            console.log(`Server Is Up And Online On Port ${PORT}`);
        });
    }

    createRoutes() {
        this.#app.get("/", (req, res, next) => {
            return res.json({
                message: "Library Management System",
                author: "Mohammad Peyravi"
            });
        });

        this.#app.use(AllRoutes);
    }

    errorHandler() {
        //? 404 Page
        this.#app.use((req, res, next) => {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "صفحه یا آدرس مورد نظر یافت نشد"
            });

        });

        //? Error Handler
        this.#app.use((err, req, res, next) => {
            const status = err?.status || 500;
            const message = err?.message || "Internal Server Error!";
            return res.status(status).json({
                status,
                success: false,
                message
            });
        })
    }
    
}