const Container = require("./index");
const db = new Container("products.txt");

const test = async () => {
    console.log(await db.getAll());
    console.log(
        await db.save({
            title: "milk",
            price: "110",
            thumbnail: "image-url",
        })
    );
    console.log(
        await db.save({
            title: "water",
            price: "80",
            thumbnail: "image-url",
        })
    );
    console.log(
        await db.save({
            title: "bread",
            price: "100",
            thumbnail: "image-url",
        })
    );
    console.log(
        await db.save({
            title: "wine",
            price: "200",
            thumbnail: "image-url",
        })
    );
    console.log(await db.getById(3));

    // Borrar producto existente
    console.log(await db.deleteById("2"));
    console.log(await db.getAll());

    // Borrar producto no existente
    console.log(await db.deleteById("10"));
    console.log(await db.getAll());

    // //Probar comentando la siguiente linea para poder ver los contenidos de productos.txt
    // console.log(await db.deleteAll());
    // console.log(await db.getAll());
};

test();
