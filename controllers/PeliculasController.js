const Peliculas = require('../models/Peliculas');

const PeliculasController ={
    async create(req, res) {
        try {
            const pelicula = await Peliculas.create({ ...req.body });
            res.status(201).send(pelicula);

        } catch (error) {
            console.log(error);
        }
    },
    async getAll(req, res) {
        try {
            const peliculas = await Peliculas.find();
            res.status(200).json(peliculas);
        } catch (error) {
            console.log(error);
        }
    },
    async getAllSSR(req, res) {
        try {
            const peliculas = await Peliculas.find();
            res.send(`
                <h1>WIS</h1>
                ${peliculas
                    .map(pelicula => {
                        return (
                            `<div>
                            
                            <img src="${pelicula.imageUrl}" alt="${pelicula.name}" width="200" height="auto"><br>
                            <h2> ${pelicula.name}</h2>
                            <p>Descripción: ${pelicula.description}</p>
                            <p>Categoría: ${pelicula.category}</p>
                            <p>Plataforma: ${pelicula.platform}</p>
                            <p>Puntuación Imdb: ${pelicula.imdbRating}</p>
                            <p>Año de lanzamiento: ${pelicula.releaseYear}</p>
                            <p>Actores principales: ${pelicula.actors.join(', ')}</p>
                            <p>Director: ${pelicula.director}</p>                                                        <br>
                            <iframe width="560" height="315" src="${pelicula.trailerUrl}" frameborder="0" allowfullscreen></iframe>
                                <br>   <br>
                            </div>`
                        );
                    })
                    .join('')}
            </div>`);
        } catch (error) {
            console.log(error);
        }
    },
    
    async getByID(req, res) {
        try {
            const id = req.params._id;
            const pelicula = await Peliculas.findById(id);
            if (!pelicula) {
                return res.status(404).json({ error: 'Película no encontrada' });
            }
            res.json(pelicula);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Problema al buscar la película por ID' });
        }
    },
    async updateByName(req, res) {
        try {
            const name = req.params.name;
            const newName = req.body.newName;
            const updatedPelicula = await Peliculas.findOneAndUpdate({ name }, { name: newName }, { new: true });
            if (!updatedPelicula) {
                return res.status(404).json({ mensaje: 'Película no encontrada' });
            }
            res.json(updatedPelicula);
        } catch (error) {
            console.error('Error actualizando película por nombre:', error);
            res.status(500).json({ error: 'Hubo un problema al actualizar la película' });
        }
    },
    async deletePelicula(req, res) {
        try {
            const _id = req.params.id;
            const deletedPelicula = await Peliculas.findByIdAndDelete(_id);
            if (!deletedPelicula) {
                return res.status(404).json({ mensaje: 'Película no encontrada' });
            }
            res.json({ mensaje: 'Película eliminada', deletedPelicula });
        } catch (error) {
            console.error('Error eliminando película:', error);
            res.status(500).json({ error: 'Hubo un problema al eliminar la película' });
        }
    },
    async renderCreatePeliculaForm(req, res) {
        try {
            res.render('createPeliculaForm');
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al renderizar el formulario de creación de películas' });
        }
    },
    showCreateForm(req, res) {
        res.send(`
            <form action="/peliculas/new" method="POST">
                <label for="name">Nombre:</label>
                <input type="text" id="name" name="name"><br>
                <label for="description">Descripción:</label>
                <input type="text" id="description" name="description"><br>
                <label for="category">Categoría:</label>
                <select id="category" name="category">
                    <option value="Acción">Acción</option>
                    <option value="Comedia">Comedia</option>
                    <option value="Drama">Drama</option>
                </select><br>
                <label for="imdbRating">Puntuación IMDb:</label>
                <input type="number" id="imdbRating" name="imdbRating" min="0" max="10"><br>
                <label for="releaseYear">Año de lanzamiento:</label>
                <input type="number" id="releaseYear" name="releaseYear" min="1900" max="2099"><br>
                <label for="platform">Plataforma:</label>
                <input type="text" id="platform" name="platform"><br>
                <label for="imageUrl">URL de la imagen:</label>
                <input type="text" id="imageUrl" name="imageUrl"><br>
                <label for="actors">Actores principales:</label>
                <input type="text" id="actors" name="actors"><br>
                <label for="director">Director:</label>
                <input type="text" id="director" name="director"><br>
                <label for="trailerUrl">URL del tráiler en YouTube:</label>
                <input type="text" id="trailerUrl" name="trailerUrl"><br>
                <button type="submit">Crear Película</button>
            </form>
        `);
    },
    
    async createPelicula(req, res) {
        try {
            const { name, description, category, imdbRating, releaseYear, platform, imageUrl, actors, director, trailerUrl } = req.body;
            const newPelicula = new Pelicula({ name, description, category, imdbRating, releaseYear, platform, imageUrl, actors, director, trailerUrl });
            await newPelicula.save();
            res.status(201).json(newPelicula);
        } catch (error) {
            console.error('Error al crear la película:', error);
            res.status(500).send('Hubo un problema al crear la película');
        }
    }, 
  
    
};

module.exports = PeliculasController;
