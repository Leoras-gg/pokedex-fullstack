const validatePokemon = (req, res, next) => {
  const { name, number, types, image } = req.body;

  if (!name || !number || !types || !image) {
    return res.status(400).json({
      message: "All fields are required"
    });
  }

  if (!Array.isArray(types)) {
    return res.status(400).json({
      message: "Types must be an array"
    });
  }

  next();
};

export default validatePokemon;