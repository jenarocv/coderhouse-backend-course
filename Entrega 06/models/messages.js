const messages = [
    {
        email: "test01@testemail.com",
        text: "¡Hola!, ¿como estas?",
        date: "2021-11-06 20:33:27",
    },
    {
        email: "test02@testemail.com",
        text: "Bien, ¿y tu?",
        date: "2021-11-06 21:33:27",
    },
    {
        email: "test01@testemail.com",
        text: "Muy bien",
        date: "2021-11-06 22:33:27",
    },
];

const getMessages = () => {
    console.log(messages);
    return messages;
};

const saveMessage = (mensaje) => {
    messages.push(mensaje);
};

module.exports = {
    getMessages,
    saveMessage,
};
