
const Products = require('../models/Products');


const ProductController ={
    async create (req,res){
        try{ const product= await Products.create({...req.body});
        res.status(201).send(product)

        }catch(error) {
            console.log(error);
      
        }

    },
    async getAll(req,res){

        try{
            const products = await Products.find();
            res.status(200).json(products);
        }catch(error){

            console.log(error)
        }
    
    }, async getAllSSR (req, res) {
        try {
            const products = await Products.find();
            res.send(`<h1>Tienda de ropa</h1>
              ${products.map(product => {
                return (
                    `<div>
                    <h2>Producto: ${product.name}</h2>
                    <p>Descripcion: ${product.description}</p>
                    <p>Categoría: ${product.category}</p>
                    <p>Talla: ${product.size}</p>
                    <p>Precio: ${product.price}</p>
                    <img src="${product.imageUrl}" alt="${product.name}">
                    
                    <br> 
                </div>`
                )
              } ).join('')}
            </div>`);
        } catch (error) {
            console.log(error)
        }
      },async getByID (req,res){
        try{
            const id = req.params._id;
            const product = await Products.findById(id);
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.json(product);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Problem to search the product by ID' });
        }
    }, async updateByName(req, res) {
        try {
            const name = req.params.name;
            const newName = req.body.newName;
            const updatedProduct = await Products.findOneAndUpdate({ name }, { name: newName }, { new: true });
            if (!updatedProduct) {
                return res.status(404).json({ mensaje: 'Product not found' });
            }
            res.json(updatedProduct);
        } catch (error) {
            console.error('Error updating product by name:', error);
        }   
        },async updateByName(req, res) {
            try {
                const name = req.params.name;
                const newName = req.body.newName;
                const updatedProduct = await Products.findOneAndUpdate({ name }, { name: newName }, { new: true });
                if (!updatedProduct) {
                    return res.status(404).json({ mensaje: 'Product not found' });
                }
                res.json(updatedProduct);
            } catch (error) {
                console.error('Error updating product by name:', error);
              
            }
        },
    
        async deleteProduct(req, res) {
            try {
                const _id = req.params.id;
                const deletedProduct = await Products.findByIdAndDelete(_id);
                if (!deletedProduct) {
                    return res.status(404).json({ mensaje: 'Product not found' });
                }
                res.json({ mensaje: 'Product deleted', deletedProduct });
            } catch (error) {
                console.error('Error deleting product:', error);
                
            }
        }, async renderCreateProductForm(req, res) {
        try {
       
            res.render('createProductForm');
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al renderizar el formulario de creación de productos.' });
        }
    },showCreateForm: (req, res) => {
        res.send(`
          <form action="/products/new" method="POST">
            <label for="name">Nombre:</label>
            <input type="text" id="name" name="name"><br>


            <label for="description">Descripción:</label>
            <input type="text" id="description" name="description"><br>


            <label for="price">Precio:</label><br>
            <input type="number" id="price" name="price" step="0.01" required><br>
            <br>

            <label for="category">Categoria:</label>
            <select id="category" name="category">           
           
        <option value="Camisetas">Camisetas</option>
        <option value="Pantalones">Pantalones</option>
        <option value="Zapatos">Zapatos</option>
        <option value="Accesorios">Accesorios</option>
        <select>
        <br>
        <label for="size">Talla:</label>
        <select id="size" name="size" required>
        <option value="">Seleccione una talla</option>
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
        <option value="XL">XL</option>
    </select>
    <br>

            <button type="submit">Crear Producto</button>
          </form>
        `);
      },
    
      createProduct: async (req, res) => {
        try {
          const { name, description, price } = req.body;
          const newProduct = new Product({ name, description, price, category, size });
          await newProduct.save();
          res.status(201).json(newProduct)
        } catch (error) {
          console.error('Error al crear el producto:', error);
          res.status(500).send('Hubo un problema al crear el producto');
        }
      }
    };

    
    
    module.exports = ProductController;


 



