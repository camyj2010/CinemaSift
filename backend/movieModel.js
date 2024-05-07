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
                    { type: String }, 
                    { type: String }  
                ],
                { type: String },      
                { type: String }       
            ]
        }
    },
    {
        versionKey: false
    }
);

const movieModel = mongoose.model("movies", moviesSchema);
export default movieModel;