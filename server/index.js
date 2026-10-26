require('dotenv').config();
const http = require('http');
const app = require('./app');
const db = require('./src/db/models');

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const dbCheck = async () => {
  try {
    await db.sequelize.authenticate();
    console.log(
      `Connection with DB ${process.env.DB_NAME} has been successfully done!`,
    );
  } catch (error) {
    console.log('Can`t connect to DB: ', error.message);
  }
};

dbCheck();

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
