//variable declarations
const form = document.getElementById('form');
const table = document.getElementById('table');
const tbody = document.querySelector('tbody');
const deleteBtn = document.querySelectorAll('a.delete-book');

/* Append message to form */
let div = document.createElement('div');
div.style.display == 'none';
div.style.position = 'absolute';
form.appendChild(div);

class Information {

  constructor(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }

}

class UI {

appendInfo(book){
  let text = document.createElement('tr');
  text.innerHTML = '<td>' + book.title + '</td>';
  text.innerHTML += '<td>' + book.author + '</td>';
  text.innerHTML += '<td>' + book.isbn + '</td>';
  text.innerHTML += '<td> <a class="delete-book">X</a> </td>';
  tbody.appendChild(text);
  }


clearFields(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';

}  

message(message, color){
    div.style.display = 'block';
    div.style.color = color;
    div.textContent = message;

    window.setTimeout(function(){
      div.style.display = 'none';
    }, 3000);
}

delete(target){
if(target.className == 'delete-book'){
return target.parentNode.parentNode.remove();
}
}

}


class Store {

  static getBooks(){
   let books;
   if(localStorage.getItem('books') === null){
     books = [];
   } else{
    books = JSON.parse(localStorage.getItem('books'));
   }

   return books;

  }

/*
  static displayBooks(){
  let storage = JSON.parse(localStorage.getItem('books'));
  let text;

  if(storage){
  storage.forEach(function(val, index){
  text = document.createElement('tr');
  text.innerHTML += '<td>' + val + '</td>';
  text.innerHTML += '<td>' + val + '</td>';
  text.innerHTML += '<td>' + val + '</td>';
  //text.innerHTML += '<td> <a class="delete-book">X</a> </td>';
  tbody.appendChild(text);
  
  });
}

  }
  */

  static addBook(newBook){
     const books = Store.getBooks();
     books.push(newBook);

     localStorage.setItem('books', JSON.stringify(newBook));
  }


  static removeBook(){

  }

 

}


// Event listeners
function loadEventListeners(){
form.addEventListener('submit', handleInfo);
tbody.addEventListener('click', handleDelete);
//document.addEventListener("DOMContentLoaded", getFromLocalStorage);
}

loadEventListeners();

function getFromLocalStorage(){
  Store.displayBooks();
}

//Handle Information function
function handleInfo(event){
event.preventDefault();

let titleInput = document.getElementById('title').value,
    authorInput = document.getElementById('author').value,
    isbnInput = document.getElementById('isbn').value;

    const ui = new UI();

//if values are not empty
if(titleInput != '' && authorInput != '' && isbnInput != ''){
const newBook = new Information(titleInput, authorInput, isbnInput);
ui.appendInfo(newBook);
Store.addBook(newBook);
ui.message('Book Added', 'green');
ui.clearFields();

} else{
  ui.message('Please fill in all fields', 'red');
}

}

//Handle Delete function
function handleDelete(event){
const ui = new UI();
ui.delete(event.target);
ui.message("Book Removed", "orange");
}







