const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('tiktok', 'root', null, {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});
const connection = async () =>{  // function test
    try {
        await sequelize.authenticate();
        console.log('ket noi thanh cong.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}
connection()  