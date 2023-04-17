module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "movie",
    {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      movieName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      director: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      releaseDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      alter: true,
      freezeTableName: true,
      tableName: "movie",
      timestamps: true,
      underscored: true,
    }
  );
};
