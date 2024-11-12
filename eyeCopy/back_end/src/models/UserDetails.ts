import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import UserAddresses from './UserAddress';

class UserDetails extends Model {
    public id!: number;
    public firstName!: string;
    public lastName!: string;
    public email!: string;
    public password!: string;
    public gender!: string | null;
    public phone_no!: string | null;
    public doctor_type!: string;
    public profileImg!:string | null;
}

UserDetails.init(
    {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gender: {
            type: DataTypes.ENUM('Male','Female','Other'),
            allowNull: true,
        },
        phone_no: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        doctor_type: {
            type:DataTypes.ENUM('OD','MD'),
            allowNull: false,
        },
        profileImg: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'UserDetails',
    }
);


// --------------------------------------------

UserDetails.hasMany(UserAddresses, { foreignKey: 'doctor_id', as: 'addresses' });
UserAddresses.belongsTo(UserDetails, { foreignKey: 'doctor_id', as: 'user' });



export default UserDetails;