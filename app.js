
//variable declaration
const form = document.getElementById('form');
const table = document.getElementById('table');
const tbody = document.querySelector('tbody');
const deleteBtn = document.querySelectorAll('a.delete-book');

/* Append message to form */
let div = document.createElement('div');
div.style.display == 'none';
div.style.position = 'absolute';
form.appendChild(div);



// Information Constructor
function Information(title, author, isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn;

  }



// UI constructor
function UI(){}


//UI prototypes
UI.prototype.appendInfo = function(book){
  let text = document.createElement('tr');
  text.innerHTML = '<td>' + book.title + '</td>';
  text.innerHTML += '<td>' + book.author + '</td>';
  text.innerHTML += '<td>' + book.isbn + '</td>';
  text.innerHTML += '<td> <a class="delete-book">X</a> </td>';
  tbody.appendChild(text);
  }


UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';

}  

UI.prototype.message = function(message, color){
    div.style.display = 'block';
    div.style.color = color;
    div.textContent = message;

    window.setTimeout(function(){
      div.style.display = 'none';
    }, 3000);
}

UI.prototype.delete = function(target){

if(target.className == 'delete-book'){
return target.parentNode.parentNode.remove();
}

}



// Event listeners
form.addEventListener('submit', handleInfo);
tbody.addEventListener('click', handleDelete);



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





