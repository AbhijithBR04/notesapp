"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
 
    }
  }
  Note.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: { msg: "user must put something" },
          notEmpty: { msg: "note must not be empty" },
        },
      },
    },
    {
      sequelize,
      tableName: "notes",
      modelName: "Note",
    }
  );
  return Note;
};
