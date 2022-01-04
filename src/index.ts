import express from 'express';
import cors from 'cors';
import sequelize from "./models/index";
import AppRoutes from "./routes/AppRoutes";



const app = express();
const corsOptions = { origin: "http://localhost:3000"};
const PORT = process.env.PORT || 8080;

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

AppRoutes(app);

(async () => {
    await sequelize.sync({force: true});
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
    });
})();




