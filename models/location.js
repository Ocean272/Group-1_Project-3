const { Model, DataTypes } = require("sequelize");

module.exports = function (sequelize){
  class Location extends Model {}

  Location.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      located_at: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cuisineId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      priceId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      openingHour: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
          type: DataTypes.DATE,
          field: "createdAt",
      },
      updatedAt: {
          type: DataTypes.DATE,
          field: "updatedAt",
      },
    },


    {
      sequelize,
      tableName: "location",
      modelName: "Location",
    }
  );

  return Location;
};
