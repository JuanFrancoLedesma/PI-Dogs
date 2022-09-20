const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height: {
      type: DataTypes.STRING,
      allowNull: false
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: false
    },
    life_span: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'Unknown'
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'https://us.123rf.com/450wm/krisdog/krisdog1808/krisdog180800609/107313215-perro-silueta-animal-dom%C3%A9stico.jpg?ver=6'
    },
    createdByUser: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },{
    timestamps: false
  });
};
