import mongoose from 'mongoose';

const moviesSchema = new mongoose.Schema(
    {
        title: {
            type: String
        },
        imageSrc: {
            type: String
        },
        genre: {
            type: String
        },
        rating: {
            type: [
                [
                    { type: String }, // Cadena de texto
                    { type: String }  // Número
                ],
                { type: String },      // Número
                { type: String }       // Cadena de texto
            ]
        }
    },
    {
        versionKey: false
    }
);

const movieModel = mongoose.model("movies", moviesSchema);
export default movieModel;