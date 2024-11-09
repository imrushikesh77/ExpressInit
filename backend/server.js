import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();

import dbConnect from "./dbConfig/dbConnect.js";

const PORT = process.env.PORT || 5000;

dbConnect().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})


