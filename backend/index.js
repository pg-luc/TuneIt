import express from "express";

const app = express();

app.get('/', (res, req) => {
    console.log(req);
    return res.statusCode(234).send("HELLO WORLD");
})