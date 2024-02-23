const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
   host: process.env.DB_HOST,
   dialect: process.env.DB_DIALECT,
   logging: false,
   dialectOptions: {
      ssl: {
         require: true,
         rejectUnauthorized: false,
      },
   },
});
const connection = async () => {
   // function test
   try {
      await sequelize.authenticate();
      console.log("ket noi thanh cong.");
   } catch (error) {
      console.error("Unable to connect to the database:", error);
   }
};
connection();
