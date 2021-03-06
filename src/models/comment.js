module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("Comments", {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    task: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });
  Comment.associate = models => {
    Comment.belongsTo(models.Users, {
      as: "user",
      foreignKey: "userId",
    });
  };
  return Comment;
};
