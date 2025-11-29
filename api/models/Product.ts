import { DataTypes, Model } from 'sequelize';
import sequelize from './config/db'; // Import your Sequelize instance
import License from './License'; // Import the License model

class Product extends Model {
  public productID!: number;
  public productName!: string;
  public minQuantity!: number;
  public licenseID!: number;

  // Other model methods and associations can be defined here

  // Define the model associations in the static init method
  public static initModel() {
    return Product.init(
      {
        productID: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement:true,
        },
        licenseID: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: License,
            key: 'licenseID',
          },
        },
        productName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        minQuantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        modelName: 'Products',
        timestamps: false,
      }
    );
  }
}

export default Product;
