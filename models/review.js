module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "review",
    {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
      },
      movieId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "movie",
          key: "id",
        },
      },
      comment: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      alter: true,
      freezeTableName: true,
      tableName: "review",
      timestamps: true,
      underscored: true,
    }
  );
};
