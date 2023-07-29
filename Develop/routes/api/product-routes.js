const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll({
      include:[ Category, Tag]
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  try {
    const productId = await Product.findByPk(req.params.id,
       {include: [Category, Tag]}
       );
       if(!productId) {
        res.status(400).json ({message: 'No Product found at Id'});
       return;
      }
      res.status(200).json(productId);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  try {
 const newProduct = await Product.create(req.body)
 res.status(200).json(newProduct);
  }catch(err){
    res.status(400).json(err)
  }
});

router.put('/:id', async (req, res) => {
  try{
const productId = await Product.findByPk(req.params.id);
if(!productId){
  res.status(404).json({message: 'No Product with Id'})
  return;
}
Product.update(
  {product_name:req.body.product_name}, 
  {where: {id: req.params.id}})
  res.status(200).json();
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  try{
    let productId = await Product.findByPk(req.params.id);
    if(!productId) {
      res.status(404).json({message:'No product with this Id'})   
     }
     let product = await Product.destroy({where:{id: req.params.id}});
     res.status(200).json(product);
    } catch (err) {
      res.status(404).json(err)
    };
});

module.exports = router;