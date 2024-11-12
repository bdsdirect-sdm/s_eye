import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import UserDetails from './UserDetails';

class UserAddresses extends Model {
    public id!: number;
    public doctor_id!: number;
    public address_title!: string;
    public office_phone_number!: string;
    public fax_number!: string;
    public street!: string;
    public city!: string;
    public state!: string | null;
    public country!: string;
    public zip_code!:string;
}

UserAddresses.init(
    {
        address_title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        office_phone_number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fax_number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        street: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        zip_code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        doctor_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

    },
    {
        sequelize,
        modelName: 'UserAddresses',
        paranoid: true,
    }
);


// --------------------------------------------



export default UserAddresses;