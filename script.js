document.addEventListener('DOMContentLoaded', () => {
    // Query selectors for dialog modal
    const dialog = document.querySelector('dialog');
    const newBookBtn = document.getElementById('newBookBtn');

    // Query selector for new book form submitting
    const submitForm = document.querySelector('.book-form');

    // Query selector for Library container
    const libraryContainer = document.querySelector('.library-container');

    // Book Class
    class Book {
        // the constructor
        constructor(author, title, numberOfPages, isRead) {
            this.author = author;
            this.title = title;
            this.numberOfPages = numberOfPages;
            this.isRead = isRead;
        }
        // Prototype for is book read boolean
        toggleReadStatus() {
            this.isRead = !this.isRead;
        }
    }

    // Library Class
    class Library {
        constructor() {
            this.books = [];
        }

        // add new book to library
        addBook(newBook) {
            this.books.push(newBook);
            this.displayBooks();
        }

        // Remove book
        removeBook(index) {
            this.books.splice(index, 1);
            this.displayBooks();
        }

        // Toggle status of is book read boolean
        toggleReadStatus(index) {
            this.books[index].toggleReadStatus();
            this.displayBooks();
        }

        // displaying and adding books in library
        displayBooks() {
            libraryContainer.innerHTML = '';

            this.books.forEach((book, index) => {
                const bookCardContainer = this.createBookCardContainer(
                    book,
                    index
                );
                libraryContainer.appendChild(bookCardContainer);
            });
        }

        // creating book card container
        createBookCardContainer(book, index) {
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

            this.attachEventListenersToBookCard(bookCardContainer, book, index);

            return bookCardContainer;
        }

        // attaching query selectors to book card
        attachEventListenersToBookCard(bookCardContainer, book, index) {
            const readButton = bookCardContainer.querySelector('.toggle-read');
            const removeButton =
                bookCardContainer.querySelector('.remove-book');

            // Event listeners
            readButton.addEventListener('click', handleBookIsReadClick);
            removeButton.addEventListener('click', removeBookFromLibrary);

            // Initializes checkbox
            readButton.checked = book.isRead;
        }
    }

    // Initialize Library
    const myLibrary = new Library();

    // Event Listeners
    // "Show the dialog" button opens the dialog modally
    newBookBtn.addEventListener('click', () => {
        dialog.showModal();
    });

    submitForm.addEventListener('submit', (event) => {
        // Prevent default to avoid Submit error
        event.preventDefault();

        // Get values from form
        const author = document.getElementById('author').value;
        const title = document.getElementById('title').value;
        const numberOfPages = parseInt(document.getElementById('pages').value);
        const isRead = document.getElementById('isRead').checked;

        // Create new Book and add it to the library
        const newBook = new Book(author, title, numberOfPages, isRead);
        myLibrary.addBook(newBook);

        // Closes the dialog
        document.getElementById('addBookModal').close();

        // Reset form after closing
        event.target.reset();
    });

    // Event listeners for read button toggle and remove book from library
    // Toggle status of is book read boolean
    function handleBookIsReadClick(event) {
        const index = parseInt(event.target.getAttribute('data-index'), 10);
        myLibrary.toggleReadStatus(index);
    }

    // Remove book
    function removeBookFromLibrary(event) {
        const index = parseInt(event.target.getAttribute('data-index'), 10);
        myLibrary.removeBook(index);
    }

    myLibrary.displayBooks();
});
