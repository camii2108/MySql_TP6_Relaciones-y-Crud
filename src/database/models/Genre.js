module.exports = (sequelize, dataTypes) => {
      let alias = "Genre";
      let cols = {
            id: {
                  type: dataTypes.INTEGER(10).UNSIGNED,
                  primaryKey: true,
                  autoIncrement: true,
                  allowNull: false,
            },
            name: {
                  type: dataTypes.STRING(100),
                  allowNull: false,
            },
            ranking: {
                  type: dataTypes.INTEGER(10).UNSIGNED,
                  allowNull: false,
            },
            active: {
                  type: dataTypes.BOOLEAN,
                  allowNull: false,
            },
      };
      let config = {
            tableName: "genres",
            //timestamps: false,
            createdAt: "created_at",
            updatedAt: "updated_at",
      };
      const Genre = sequelize.define(alias, cols, config);

      Genre.associate = (models) => {
            Genre.hasMany(models.Movie, {
                  as: "movies",
                  foreignKey: "genre_id",
            });
      };

      return Genre;
};
