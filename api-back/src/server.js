import express from 'express';
import mysql from "mysql2/promise";
import cors from "cors";

const app = express();

// configurer CORS lors de la connexion de react avec notre server API
// quand on fait une requête entre deux origines différents (domaine, port ...), il faut autoriser cette communication avec CORS sinon on aura une erreur
// on autorise donc l'origine de notre application react (http://localhost:5173) à communiquer avec notre serveur API
app.use(cors({
    origin: "http://localhost:5173",
}));

const pool = mysql.createPool({
    host: "localhost",
    database: "wiki-character",
    user: "root",
    password: "",
});

pool.getConnection().then((connection) => {
    console.log("connected to database");
    connection.release();
});

app.get("/api/v1/character/all", async (req, res) => {
    const query = "SELECT * FROM `characters`";
    const [data] = await pool.execute(query);

    res.json(data);
});


app.listen(9000, ()=> console.log("server running on port 9000"));