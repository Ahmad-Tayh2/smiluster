import { DataTypes, Model } from 'sequelize';
import sequelize from './config/db'; // Import your Sequelize instance
import Product from './Product'; // Import the Product model
import License from './License';

class Stock extends Model {
  public stockID!: number;
  public licenseID!: number;
  public productID!: number;
  public quantity!: number;
  public price!: number;
  public provider!: string;
  public note?: string;
  public expiredDate?: Date;

  // Other model methods and associations can be defined here

  // Define the model associations in the static init method
  public static initModel() {
    return Stock.init(
      {
        stockID: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        licenseID: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: License,
            key: 'licenseID',
          },
        },
        productID: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: Product,
            key: 'productID',
          },
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        price: {
          type: DataTypes.FLOAT,
          allowNull: false,
          defaultValue: 0,
        },
        provider: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        note: {
          type: DataTypes.TEXT,
        },
        expiredDate: {
          type: DataTypes.DATE,
        },
      },
      {
        sequelize,
        modelName: 'Stocks',
        timestamps: false,
      }
    );
  }

  static associate(models: any) {
    Stock.belongsTo(models.Product, { foreignKey: 'productID', as: 'product' });
}

}

export default Stock;
