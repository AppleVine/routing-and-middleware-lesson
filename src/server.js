const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extemded: true}));

app.use((request, response, next) => {
    console.log("middleware happened (all routes)!");

    request.info = {
        url: request.originalUrl,
        ip: request.ip,
        route: request.route
    }
    
    if (request.info.weather == null){
        throw("no weather provided");
    }
    next();
});

app.use((error, request, response, next) => {
    console.log("Some error occured!");

    response.json({
        error: error,
        message: "Server doesn't like you.",
        favouriteColor: "blue"
    })
   
    next()
})

app.get("/", (request, response) => {
    
    response.json({
        message: "Hello World",
        info: request.info
    })
});

app.post("/", (request, response) => {
    response.json({
        recievedData: request.body
    })
})

app.use("/dynamicRoute", (request, response, next) => {
    console.log("middleware happened but not for the root route.");
    next();
})

app.get("/someNewRoute", (request, response) => {
    response.json({
        message: "Hello there.",
        info: request.info
    })
});

app.get("/dynamicRoute/:message/:favouriteColor", (request, response) => {

    let message = request.params.message;
    let favouriteColor = request.params.favouriteColor;

    response.json({
        confirmation: "Route working!",
        // params: {
            // message: message,
            // params: params
        // }
        params: request.params,
        queryParams: request.query
    })
})

module.exports = {
    app
}