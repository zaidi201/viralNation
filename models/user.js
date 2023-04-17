module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "user",
    {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      userName: Sequelize.STRING,
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      verificationToken: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      alter: true,
      freezeTableName: true,
      tableName: "user",
      timestamps: true,
      underscored: true,
    }
  );
};
