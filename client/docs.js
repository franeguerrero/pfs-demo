let btnAdd = document.querySelector('#btnAdd');
btnAdd.addEventListener('click', addToDocs);

let btnProlificAuthor = document.querySelector('#btnProlificAuthor');
btnProlificAuthor.addEventListener('click', findMostProlificAuthor);

let response = document.querySelector('#response');

let btnNewest = document.querySelector('#btnNewest');
btnNewest.addEventListener('click', orderByNewest);

let btnOldest = document.querySelector('#btnOldest');
btnOldest.addEventListener('click', orderByOldest);

let docs = [
  {
    title: 'Cien años de soledad',
    author: 'Gabriel García Márquez',
    genre: 'Literatura',
    year: 1967,
  },
  {
    title: 'La evolución de las especies',
    author: 'Charles Darwin',
    genre: 'Ciencias naturales',
    year: 1859,
  },
  {
    title: 'La República',
    author: 'Platón',
    genre: 'Filosofía',
    year: -380,
  },
  {
    title: 'El Capital',
    author: 'Karl Marx',
    genre: 'Economía',
    year: 1867,
  },
  {
    title: 'El origen de las especies',
    author: 'Charles Darwin',
    genre: 'Ciencias naturales',
    year: 1859,
  },
  {
    title: 'El príncipe',
    author: 'Maquiavelo',
    genre: 'Política',
    year: 1532,
  },
  {
    title: 'La metamorfosis',
    author: 'Franz Kafka',
    genre: 'Literatura',
    year: 1915,
  },
  {
    title: 'La enseñanza de la filosofía',
    author: 'Jacques Derrida',
    genre: 'Educación',
    year: 1981,
  },
  {
    title: 'El Aleph',
    author: 'Jorge Luis Borges',
    genre: 'Literatura',
    year: 1949,
  },
  {
    title: 'La divina comedia',
    author: 'Dante Alighieri',
    genre: 'Literatura',
    year: 1320,
  },
  {
    title: 'El jardín de los senderos que se bifurcan',
    author: 'Jorge Luis Borges',
    genre: 'Literatura',
    year: 1941,
  },
  {
    title: 'La teoría general del empleo, el interés y el dinero',
    author: 'John Maynard Keynes',
    genre: 'Economía',
    year: 1936,
  },
];
updateDocs(docs);

function addToDocs() {
  console.log('Función Agregar');
  let title = document.querySelector('#title').value;
  let author = document.querySelector('#author').value;
  let genre = document.querySelector('#genre').value;
  let year = document.querySelector('#year').value;
  let row = {
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
  document.querySelector('#tblDocs').innerHTML = html;
}
