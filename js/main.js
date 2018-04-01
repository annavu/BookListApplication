//Book Constructor
function Book(title, author, link) {
  this.title = title;
  this.author = author;
  this.link = link;
}


//UI Constructor
function UI() {}

//add book to list
UI.prototype.addBookToList = function(book) {
  const list = document.getElementById("book-list");
  //create tr element
  const row = document.createElement("tr");
  //insert columns
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td><a target="_blank" href="${book.link}" class="open">${book.link}</a></td>
  <td><a href="#" class="delete">X</a></td>
  `;

  list.appendChild(row);
}

//delete book
UI.prototype.deleteBook = function(target) {
  if(target.className === "delete") {
    target.parentElement.parentElement.remove();
    console.log(target);
  }
}

//clear fields
UI.prototype.clearFields = function() {
  document.getElementById("book-form").reset();
}

//show alert
UI.prototype.showAlert = function(msg, className) {
  //create div
  const div = document.createElement("div");
  //add class
  div.className = `alert ${className}`;
  //add text
  div.appendChild(document.createTextNode(msg));
  //get parent
  const container = document.querySelector(".container");
  const form = document.getElementById("book-form");
  //insert alert
  container.insertBefore(div,form);
  //disappear alert after 3s
  setTimeout(function() {
    document.querySelector(".alert").remove()
  },3000)
}


//event listeners

document.getElementById("book-form").addEventListener("submit", function(e) {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const link = document.getElementById("link").value;

  //instantiate book
  const book = new Book(title,author,link);
  

  //instantiate UI
  const ui = new UI();

  //validate
  if(title === "" || author === "" || link === "") {
    ui.showAlert("Please fill in all fields", "error");
  } else {
    
    //add book to list
    ui.addBookToList(book);

    //show success
    ui.showAlert("Book added!", "success");

    //clear fields
    ui.clearFields();
  }

  e.preventDefault();
})


//listen for delete
document.getElementById("book-list").addEventListener("click", function(e) {

  //instantiate UI
  const ui = new UI();
  //delete book
  ui.deleteBook(e.target);

})