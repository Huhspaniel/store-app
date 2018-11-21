module.exports = function(connection, Sequelize) {
    const department = connection.define('department', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                is: /^[a-z -()]+$/i
            }
        }
    })
    department.associate = function (models) {
        // department.hasMany(models.product, {
        //     foreignKey: {
        //         allowNull: false,
        //         unique: 'department_product'
        //     }
        // });
    }

    return department;
}