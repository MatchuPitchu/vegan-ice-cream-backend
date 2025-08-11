const validateJoi = (schema) => (req, res, next) => {
  const results = schema.validate(req.body)
  // return important to finish execution of function befor going to next()
  if (results.error) return res.status(400).json(results.error)
  next()
}

export default validateJoi
