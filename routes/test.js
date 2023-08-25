// routes/items.js
const express = require('express');
const router = express.Router();

/**
 * @openapi
 * /test/items:
 *   get:
 *     summary: Returns a list of items
 *     responses:
 *       200:
 *         description: just some test functions
 */
router.get('/items', (req, res) => {
  const items = ['test 1', 'test 2', 'test 5'];
  res.json(items);
});

/**
 * @openapi
 * /test/scold:
 *   get:
 *     summary: Just return fuck you to whoever makes the request
 *     responses:
 *       200:
 *         description: just some test functions
 */
router.get('/scold', (req, res) => {
    res.json("fuck you");
  });

module.exports = router;
