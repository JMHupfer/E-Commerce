const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');


router.get('/', async (req, res) => {
  try {
    const tagsData = await Tag.findAll({
      include: [ Product ]
    });
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  try{
  const tagId = await Tag.findByPk(req.params.id, { include:[Product] })
  if (!tagId) {
    res.status(404).json({ message: 'No tags with Id' });
    return;
  }
    res.status(200).json(tagId)
  } catch(err) {
res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try{
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  }catch(err){
    res.status(400).json(err)
  }

});

router.put('/:id', async (req, res) => {
  try {
 const tagId = await Tag.findByPk(req.params.id);
 if(!tagId){
  res.status(404).json({message: 'No tag with Id'})
return; 
}
Tag.update({tag_name: req.body.tag_name}, {where: {id:req.params.id}});
res.status(200).json();  
}catch (err) {
  res.status(500).json(err)
}
});

router.delete('/:id', async (req, res) => {
  try{ 
    let tagId = await Tag.findByPk(req.params.id);
    if(!tagId){
      res.status(404).json({message:'No tag with Id'});
    }
    const tag = await Tag.destroy({where: {id: req.params.id}});
  res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;