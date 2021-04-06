const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories - associated Products included
router.get('/', (req, res) => {
  Category.findAll({
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_name']
      }
    ]
  })
  .then(resCategory => res.json(resCategory))
  .catch( err => {
    console.log(err);
    res.status(500).json(err);
  });
});


  // find one category by its `id` value - associated Products included
router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price']
      }
    ]
  })
  .then((dbCategoryData) => {
    if(!dbCategoryData){
      res.status(404).json({ message: 'There is NO category found with id!'});
      return;
    }
    res.json(dbCategoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

 // create a new category
router.post('/', (req, res) => {
  Category.create({
    id: req.body.id,
    category_name: req.body.category_name
 })
 .then(newCategory => res.json(newCategory))
 .catch(err => {
   console.log(err);
   res.status(500).json(err);
 }) 
});


// update a category by its `id` value
router.put('/:id', (req, res) => {
  Category.update({
    where: {
      id: req.params.id
    }
  })
  .then(updCategory => {
    if(!updCategory) {
      res.status(404).json({ message: 'No category with searched id'});
      return;
    }
    res.json(updCategory);
  })
  
});


 // delete a category by its `id` value
router.delete('/:id', (req, res) => {
  Category.destroy ({
    where: {
      id: req.params.id
    }
  })
  .then(delCategory => {
    if (!delCategory) {
      res.status(404).json({ message: 'No category found with searched id'});
      return;
    }
    res.json(delCategory);
  })
});

module.exports = router;
