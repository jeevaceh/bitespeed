
module.exports = (sequelize, DataTypes) => {
    const Contact = sequelize.define('Contact', {
        email: {
            type: DataTypes.STRING,
            allowNull: true
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: true
        },
        linkedId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        linkPrecedence: {
            type: DataTypes.ENUM('primary', 'secondary'),
            allowNull: false
        }
    });

    return Contact;
};
