let btnAdd = document.querySelector('#btnAdd');
btnAdd.addEventListener('click', addToDocs);
let tblDocs = document.querySelector('#tblDocs');

let btnProlificAuthor = document.querySelector('#btnProlificAuthor');
btnProlificAuthor.addEventListener('click', findMostProlificAuthor);

let response = document.querySelector('#response');

let btnNewest = document.querySelector('#btnNewest');
btnNewest.addEventListener('click', orderByNewest);

let btnOldest = document.querySelector('#btnOldest');
btnOldest.addEventListener('click', orderByOldest);

let btnFilter = document.querySelector('#btnFilter');
btnFilter.addEventListener('click', filterByAuthor);

let docs = [];

load();

function generateId() {
  let id = Math.floor(Math.random() * 1000000);
  while (docs.some((doc) => doc.id === id)) {
    id = Math.floor(Math.random() * 1000000);
  }
  return id;
}

function addToDocs() {
  let title = document.querySelector('#title').value;
  let author = document.querySelector('#author').value;
  let genre = document.querySelector('#genre').value;
  let year = document.querySelector('#year').value;
  let row = {
    id: generateId(),
    title: title,
    author: author,
    genre: genre,
    year: year,
  };
  docs.push(row);
  updateDocs(docs);
}

function orderByNewest() {
  let sortedDocs = docs.slice().sort((a, b) => b.year - a.year);
  updateDocs(sortedDocs);
}

function orderByOldest() {
  let sortedDocs = docs.slice().sort((a, b) => a.year - b.year);
  updateDocs(sortedDocs);
}

function findMostProlificAuthor() {
  let authorCount = {};
  for (let r of docs) {
    if (r.author in authorCount) {
      authorCount[r.author]++;
    } else {
      authorCount[r.author] = 1;
    }
  }
  let sortedAuthors = Object.keys(authorCount).sort(
    (a, b) => authorCount[b] - authorCount[a],
  );
  let mostProlificAuthors = [];
  let maxCount = authorCount[sortedAuthors[0]];
  for (let author of sortedAuthors) {
    if (authorCount[author] === maxCount) {
      mostProlificAuthors.push(author);
    }
  }
  let responseText = '';
  if (mostProlificAuthors.length === 1) {
    responseText = `El autor más prolífico es: ${mostProlificAuthors[0]}`;
  } else {
    responseText = `Los autores más prolíficos son: ${mostProlificAuthors.join(
      ', ',
    )}`;
  }
  responseText += ` con ${maxCount} documentos`;
  response.innerHTML = responseText;
}

function updateDocs(docs) {
  let html = '';
  for (let r of docs) {
    html += `
    <tr class="row">
            <td>${r.title}</td>
            <td>${r.author}</td>
            <td>${r.genre}</td>
            <td>${r.year}</td>
            </tr>
            `;
  }
  tblDocs.innerHTML = html;
}
async function load() {
  tblDocs.innerHTML = '<h1>Loading...</h1>';

  try {
    let response = await fetch('/doc');
    if (response.status) {
      docs = await response.json();
      updateDocs(docs);
    } else tblDocs.innerHTML = '<h1>404 Error - FailedURL!</h1>';
  } catch (response) {
    tblDocs.innerHTML = '<h1>500 Connection error</h1>';
  }
}
function filterByAuthor() {
  let author = document.querySelector('#authorFilter').value;
  let filteredDocs = docs.filter((doc) =>
    doc.author.toLowerCase().includes(author.toLowerCase()),
  );
  updateDocs(filteredDocs);
}
