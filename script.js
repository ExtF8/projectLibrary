document.addEventListener('DOMContentLoaded', () => {
    // Array for added books
    const myLibrary = [];

    function Book(author, title, numberOfPages, isRead) {
        // the constructor
        this.author = author;
        this.title = title;
        this.numberOfPages = numberOfPages;
        this.isRead = isRead;
    }

    // Prototype for is book read boolean
    Book.prototype.toggleReadStatus = function () {
        this.isRead = !this.isRead;
    };

    // Function to add new book to library
    function addBookToLibrary(author, title, numberOfPages, isRead) {
        const newBook = new Book(author, title, numberOfPages, isRead);

        myLibrary.push(newBook);
        displayBooks();
    }

    // Function for displaying and adding books in library
    function displayBooks() {
        const libraryContainer = document.querySelector('.library-container');
        libraryContainer.innerHTML = '';

        myLibrary.forEach((book, index) => {
            const bookCardContainer = document.createElement('div');
            bookCardContainer.className = 'book-card-container';
            bookCardContainer.innerHTML = `
                <div class="book-card">
                    <h3>${book.title}</h3>
                    <p>${book.author}</p>
                    <p>${book.numberOfPages}</p>
                    <div class="button-container">
                        <button class="button-89" onclick='toggleReadStatus(${index})'>read?</button>
                        <button class="button-89" onclick='removeBook(${index})'>Remove</button>
                    </div>
                </div>
             `;

            libraryContainer.appendChild(bookCardContainer);
        });
    }

    // Toggle status of is book read boolean
    function toggleReadStatus(index) {
        myLibrary[index].toggleReadStatus();
        displayBooks();
    }

    // Remove book
    function removeBook(index) {
        myLibrary.splice(index, 1);
        displayBooks();
    }

    window.toggleReadStatus = toggleReadStatus;
    window.removeBook = removeBook;

    // Query selector for new book form submitting
    const submitForm = document.querySelector('.book-form');

    submitForm.addEventListener('submit', (event) => {
        // Prevent default to avoid Submit error
        event.preventDefault();

        // Get values from form
        const author = document.getElementById('author').value;
        const title = document.getElementById('title').value;
        const numberOfPages = parseInt(document.getElementById('pages').value);
        const isRead = document.getElementById('isRead').checked;

        // Add book to library
        addBookToLibrary(author, title, numberOfPages, isRead);

        event.target.reset();
    });

    displayBooks();

    // Query selectors for dialog modal
    const dialog = document.querySelector('dialog');
    const newBookBtn = document.getElementById('newBookBtn');
    const addAndCloseBtn = document.querySelector('dialog button');

    // "Show the dialog" button opens the dialog modally
    newBookBtn.addEventListener('click', () => {
        dialog.showModal();
    });

    // "Close" button closes the dialog
    addAndCloseBtn.addEventListener('click', () => {
        dialog.close();
    });
});
