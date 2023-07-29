const Product = require("./Product");
const Category = require("./Category");
const Tag = require("./Tag");
const ProductTag = require("./ProductTag");

Product.belongsTo(Category, {
  foreignKey: "category_id",
});

Category.hasMany(Product, {
  foreignKey: "category_id",
});

Product.belongsToMany(Tag, {
  through: {
    model: ProductTag,
    foreignKey: "Product_id",
    unique: false,
  },
});

Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
    foreignKey: "tag_id",
    unique: false,
  },
});
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
