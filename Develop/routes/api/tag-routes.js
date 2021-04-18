const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

  // find all tags
  // be sure to include its associated Product data
router.get('/', (req, res) => {
  Tag.findAll ({
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_name']
      }
    ]
  })
  .then(allTags => {
    if (!allTags) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }
    res.json(allTags);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// find a single tag by its `id`
  // be sure to include its associated Product data
router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_name']
      }
    ]
  })
  .then(findTag => {
    if (!findTag) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }
    res.json(findTag);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


// create a new tag
router.post('/', (req, res) => {
  Tag.create({
    id: req.body.id,
    tag_name: req.body.tag_name
  })
  .then(newTag => res.json(newTag))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

  

// update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
});

// delete on tag by its `id` value
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(delTag => {
      if (!delTag) {
        res.status(404).json({ message: 'No tag found with this id' });
        return;
      }
      res.json(delTag);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

  

module.exports = router;
