import express from "express";
import 'dotenv/config';

const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send("TUNE IT HOMEPAGE");
})

app.listen(port, () => {
    console.log(`Application is listening on PORT: ${port}`);
})