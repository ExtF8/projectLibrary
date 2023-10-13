const myLibrary = [];

function Book(author, title, numberOfPages, isRead) {
    // the constructor
    (this.author = author),
        (this.title = title),
        (this.numberOfPages = numberOfPages),
        (this.isRead = isRead);
}

function addBookToLibrary() {
    // do stuff here
}

const dialog = document.querySelector('dialog');
const newBookBtn = document.getElementById('newBookBtn');
const closeButton = document.querySelector('dialog button');

// "Show the dialog" button opens the dialog modally
newBookBtn.addEventListener('click', () => {
    dialog.showModal();
});

// "Close" button closes the dialog
closeButton.addEventListener('click', () => {
    dialog.close();
});
