const Sequelize = require("sequelize");
require("dotenv").config();

//db configuration
const sequelize = new Sequelize(
  process.env.DB,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: process.env.dialect,
    operatorsAliases: 0,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//requiring models
db.user = require("./user")(sequelize, Sequelize);

db.movie = require("./movie")(sequelize, Sequelize);
db.review = require("./review")(sequelize, Sequelize);

db.review.belongsTo(db.user, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "userId",
});
db.user.hasMany(db.review, {
  foreignKey: "userId",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

db.review.belongsTo(db.movie, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "movieId",
});
db.movie.hasMany(db.review, {
  foreignKey: "movieId",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

module.exports = db;
