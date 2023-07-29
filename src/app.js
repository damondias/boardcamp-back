import express, { json } from "express"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()
const app = express();

app.use(cors());
app.use(json());

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`
    Running API boarcamp on port ${PORT},
    Url: http://localhost:${PORT}
`));

