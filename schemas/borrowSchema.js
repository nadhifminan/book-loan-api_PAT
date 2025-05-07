// schemas/borrowSchema.js
const Joi = require('joi');

const borrowSchema = Joi.object({
  book_id: Joi.number().integer().required(),
  borrow_date: Joi.date().required(),
  return_date: Joi.date().greater(Joi.ref('borrow_date')).required()
});

module.exports = borrowSchema;
