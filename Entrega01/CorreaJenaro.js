class User {

    //Constructor
    constructor(name, surname, books = [], pets = []) {
        this.name = name;
        this.surname = surname;
        this.books = books;
        this.pets = pets;
    }

    getFullName() {
        return `${this.name} ${this.surname}`;
    }

    addPet(pet) {
        this.pets.push(pet);
    }

    countPets() {
        return this.pets.length;
    }

    addBook(name, author) {
        this.books.push(
            {
                name: name,
                author: author
            }
        );
    }

    getBookNames() {
        let names = [];

        /* Usage of Array.prototype.map() :

            The map() method creates a new array 
            populated with the results 
            of calling a provided function 
            on every element in the calling array.

        */
        return names = this.books.map(book => book.name);

        //Alternative solution, although I find it less readable
        // return names = this.books.map(({ name }) => name);
    }

}

// Initializing values
let books = [
    {
        name: 'Lord of the flies',
        author: 'William Golding'
    },
    {
        name: 'Foundation',
        author: 'Isaac Asimov'
    }
];

// Creating User
let usuario = new User('Elon', 'Musk', books);

// Adding pets
usuario.addPet('doge');
usuario.addPet('cat');

// Adding book
usuario.addBook('Atomic Habits', 'James Clear');

// Examples
console.log("Amount of pets: " + usuario.countPets());

console.log(usuario.getBookNames());

usuario.getBookNames().forEach(name => console.log(name));

console.log("Full name: " + usuario.getFullName());
