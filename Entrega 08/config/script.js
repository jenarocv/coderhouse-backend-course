const db = require("./mysql-database");

const script = async () => {
  try {
    let tableExists = await db.schema.hasTable("products");
    if (!tableExists) {
      await db.schema.createTable("products", (table) => {
        table.increments("id").primary(),
          table.string("title"),
          table.string("thumbnail"),
          table.float("price");
      });

      const products = [
        {
          title: "Escuadra",
          price: 123.45,
          thumbnail:
            "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
        },
        {
          title: "Calculadora",
          price: 234.56,
          thumbnail:
            "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
        },
        {
          title: "Globo Terráqueo",
          price: 345.67,
          thumbnail:
            "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
        },
      ];
      let response = await db.from("products").insert(products);
    } else {
      console.log("products table already exist.");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { script };
