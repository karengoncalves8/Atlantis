import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from "./routes";
import sequelize from "./config/db"; 
import init from './config/init';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

const PORT = process.env.PORT || 5000;

sequelize.sync({ force: false })  
  .then(async () => {
    console.log('Database synchronized');

    await init();
    
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  })
  .catch((error) => {
    console.error('Error syncing the database:', error);
});