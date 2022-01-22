const fs = require("fs");

class Container {
    constructor(route) {
        this.route = route;
    }

    getAll = async () => {
        try {
            const content = await fs.promises.readFile(this.route, "utf-8");
            return JSON.parse(content);
        } catch (error) {
            await fs.promises.writeFile(
                this.route,
                JSON.stringify([], null, 2)
            );
            const content = await fs.promises.readFile(this.route, "utf-8");
            return JSON.parse(content);
        }
    };

    getById = async (id) => {
        try {
            const products = await this.getAll();
            const product = products.find((p) => p.id === parseInt(id));
            return product;
        } catch (error) {
            return `Product with id: ${id} doesn't exists`;
        }
    };

    getRandom = async () => {
        const products = await this.getAll();
        const random = products[Math.floor(Math.random() * products.length)];
        return random;
    };

    save = async (product) => {
        const products = await this.getAll();

        if (products.length === 0) {
            product.id = 1;
        } else {
            const lastElement = products[products.length - 1];
            const lastId = lastElement.id + 1;
            product.id = lastId;
        }

        products.push(product);

        try {
            await fs.promises.writeFile(
                this.route,
                JSON.stringify(products, null, 2)
            );
            return product.id;
        } catch (error) {}
    };

    deleteAll = async () => {
        try {
            await fs.promises.writeFile(
                this.route,
                JSON.stringify([], null, 2)
            );
        } catch (error) {}
    };

    deleteById = async (id) => {
        const products = await this.getAll();
        const elementToRemove = products.findIndex(
            (p) => p.id === parseInt(id)
        );

        if (elementToRemove > -1) {
            products.splice(elementToRemove, 1);
        }

        try {
            await fs.promises.writeFile(
                this.route,
                JSON.stringify(products, null, 2)
            );
        } catch (error) {}
    };
}

module.exports = Container;
