const socket = io.connect();

socket.on("messages", (data) => {
    console.log(data);
    renderMessages(data);
});

socket.on("products", (data) => {
    console.log(data);
    renderProducts(data);
});

const addProduct = () => {
    const product = {
        title: document.getElementById("title").value,
        price: document.getElementById("price").value,
        thumbnail: document.getElementById("thumbnail").value,
    };
    socket.emit("new-product", product);

    document.getElementById("title").value = "";
    document.getElementById("price").value = "";
    document.getElementById("thumbnail").value = "";
    return false;
};

const renderProducts = (products) => {
    const table = `<tr style="color: yellow">
    <th>Title</th>
    <th>Price</th>
    <th>Thumbnail</th>
</tr>`;

    document.getElementById("products").innerHTML = table;

    const html = products.map((element, index) => {
        const child = `
            <tr>
            <td>
            ${element.title}
            </td>
            <td>
            ${element.price}
            </td>
            <td>
            <img style="width: 50px; height: 50px;" src="${element.thumbnail}">
            </td>
            </tr>`;

        document.getElementById("products").innerHTML += child;
    });
};

const addMessage = () => {
    const mensaje = {
        email: document.getElementById("name").value,
        text: document.getElementById("message").value,
        date: new Date().toISOString().replace(/T/, " ").replace(/\..+/, ""),
    };
    socket.emit("new-message", mensaje);

    document.getElementById("name").value = "";
    document.getElementById("message").value = "";
    return false;
};

const renderMessages = (messages) => {
    const html = messages
        .map((element, index) => {
            return `
      <div>
      <strong style="color:Blue;">${element.email}</strong>: 
      <em style="color:Brown;">${element.date}</em> 
      <italic style="color:Green;">${element.text}</italic>
      </div>
      `;
        })
        .join(" ");

    console.log(html);

    document.getElementById("messages").innerHTML = html;
};
