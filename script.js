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
                    <p>By: ${book.author}</p>
                    <p>Pages: ${book.numberOfPages}</p>
                    <div class="button-container">
                        <div class="checkbox-wrapper-32">
                            <label for="isRead"> Have you read it? </label>
                            <input type="checkbox" id="isRead" class="toggle-read" data-index="${index}"/>
                            <svg
                                viewBox="0 0 100 100"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M 10 10 L 90 90"
                                    stroke="#000"
                                    stroke-dasharray="113"
                                    stroke-dashoffset="113"
                                ></path>
                                <path
                                    d="M 90 10 L 10 90"
                                    stroke="#000"
                                    stroke-dasharray="113"
                                    stroke-dashoffset="113"
                                ></path>
                            </svg>
                        </div>
                        <button class="button-89 remove-book" data-index='${index}'>Remove</button>
                    </div>
                </div>
             `;

            const readButton = bookCardContainer.querySelector('.toggle-read');
            const removeButton =
                bookCardContainer.querySelector('.remove-book');

            // Toggle status of is book read boolean
            readButton.addEventListener('click', (event) => {
                const index = parseInt(
                    event.target.getAttribute('data-index'),
                    10
                );
                toggleReadStatus(index);
            });
            readButton.checked = book.isRead

            // Remove book
            removeButton.addEventListener('click', (event) => {
                const index = parseInt(
                    event.target.getAttribute('data-index'),
                    10
                );
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
