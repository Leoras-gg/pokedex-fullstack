import Pokemon from "../models/Pokemon.js";

export const createPokemon = async (req, res) => {
  try {
    const { name, number, types, image } = req.body;

    const pokemon = await Pokemon.create({
      name,
      number,
      types,
      image
    });

    return res.status(201).json(pokemon);
  } catch (error) {
    return res.status(400).json({
      message: "Error creating Pokémon",
      error: error.message
    });
  }
};

export const getAllPokemons = async (req, res) => {
  try {
    const pokemons = await Pokemon.find().sort({ number: 1 });

    return res.status(200).json(pokemons);
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching Pokémons",
      error: error.message
    });
  }
};
