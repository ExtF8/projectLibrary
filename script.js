// TODO add is Read indicator class

document.addEventListener('DOMContentLoaded', () => {
    // Query selectors for dialog modal
    const dialog = document.querySelector('dialog');
    const newBookBtn = document.getElementById('newBookBtn');

    // Query selector for new book form submitting
    const submitForm = document.querySelector('.book-form');

    // Array for added books
    const myLibrary = [];

    // "Show the dialog" button opens the dialog modally
    newBookBtn.addEventListener('click', () => {
        dialog.showModal();
    });

    // Book object
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
                    <h3>Title:
                    ${book.title}</h3>
                    <p>Author: ${book.author}</p>
                    <p>Pages: ${book.numberOfPages}</p>
                    <div class="button-container">
                        <button class="button-89 toggle-read" data-index='${index}'>read?</button>
                        <button class="button-89 remove-book" data-index='${index}'>Remove</button>
                    </div>
                </div>
             `;

            const readButton = bookCardContainer.querySelector('.toggle-read');
            const removeButton =
                bookCardContainer.querySelector('.remove-book');

            // Toggle status of is book read boolean
            readButton.addEventListener('click', (event) => {
                const index = parseInt(event.target.getAttribute('data-index'), 10);
                toggleReadStatus(index);
            });
            // Remove book
            removeButton.addEventListener('click', (event) => {
                const index = parseInt(event.target.getAttribute('data-index'), 10);
                removeBook(index);
            });

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

        // Closes the dialog
        document.getElementById('addBookModal').close();

        // Reset form after closing
        event.target.reset();
    });

    displayBooks();
});
