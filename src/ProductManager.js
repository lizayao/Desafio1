const fs = require('fs')

class ProductManager {
    constructor(path) {
        this.products = [];
        this.path = path;
    }

    async addProduct(data) {
        const newProduct = {
            id: this.products.length + 1,
            title: data.title,
            description: data.description,
            price: data.price,
            thumbnail: data.thumbnail,
            code: data.code,
            stock: data.stock ?? 1
        }
        await this.getProducts()

        const requiredFields = ['title', 'description', 'price', 'thumbnail', 'code', 'stock'];
        const missingFields = requiredFields.filter(field => !data[field]);
        if (missingFields.length > 0) {
            console.error('Error, faltan completar los siguientes campos: ', missingFields);
            return;
        }

        const codeExists = this.products.some(product => product.code === data.code);

        if (codeExists) {
            console.error("El código del producto ya existe:", data.code);
            return;
        }
        this.products.push(newProduct);
        await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2))
        console.log(`Se agregó el producto "${data.title}"`);
    }

    async createFile() {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2))
            console.log(`El archivo ${this.path} fue creado correctamente`)
        } catch (error) {
            console.log('Error al crear el archivo', { error })
        }
    }

    async getProducts() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8')
            this.products = JSON.parse(data)
            console.log(this.products)
            return this.products
        } catch (error) {
            console.log('Error al leer el archivo', { error })
            this.products = []
            return []
        }
    }

    getProductById(id) {
        const product = this.products.find((p) => p.id === id);
        if (product) {
            return product;
        } else {
            console.log("Not found");
            return null;
        }
    }


}


const manager = new ProductManager('./products.json');

const product = {
    title: 'Taza de gato',
    description: 'Taza de porcelana con forma de gato',
    price: 2000,
    thumbnail: 'https://d3ugyf2ht6aenh.cloudfront.net/stores/369/984/products/taza-lila____1-08de3701ce228fd8a416234187100692-640-0.jpg',
    code: 'PROD563',
    stock: 50
};

manager.addProduct(product);

console.log(manager.getProducts())


const productManager = new ProductManager('./products.json');
productManager.createFile()
productManager.getProducts()