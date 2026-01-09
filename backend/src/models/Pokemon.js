import mongoose from "mongoose";

const PokemonSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    number: {
      type: Number,
      required: true,
      unique: true
    },
    types: {
      type: [String],
      required: true
    },
    image: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Pokemon", PokemonSchema);