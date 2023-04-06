let btnAdd = document.querySelector('#btnAdd');
btnAdd.addEventListener('click', addToVehs);
let btnTrucks = document.querySelector('#btnTrucks');
btnTrucks.addEventListener('click', filterTrucks);
let btnCars = document.querySelector('#btnCars');
btnCars.addEventListener('click', filterCars);
let tblVeh = document.querySelector('#tblVeh');
let btnShowAll = document.querySelector('#btnShowAll');
btnShowAll.addEventListener('click', showAll);

let vehs = [];

load();

function showAll() {
  updateVehs(vehs);
}

function filterTrucks() {
  let filteredVehs = vehs.filter((veh) => veh.loadCapacity);
  updateVehs(filteredVehs);
}

function filterCars() {
  let filteredVehs = vehs.filter((veh) => !veh.loadCapacity);
  updateVehs(filteredVehs);
}

function updateVehs(vehs) {
  let html = '';
  for (let r of vehs) {
    html += `
      <tr class="row">
              <td>${r.brand}</td>
              <td>${r.model}</td>
              <td>${r.plate}</td>
              <td>${r.year}</td>
              <td>${r.price}</td>
              <td>${
                r.loadCapacity
                  ? `${r.loadCapacity}Kg`
                  : 'Sin capacidad de carga'
              }</td>
              </tr>
              `;
  }
  tblVeh.innerHTML = html;
}

async function load() {
  tblVeh.innerHTML = '<h1>Loading...</h1>';
  try {
    let response = await fetch('/veh');
    if (response.status) {
      vehs = await response.json();
      updateVehs(vehs);
    } else tblVeh.innerHTML = '<h1>404 Error - FailedURL!</h1>';
  } catch (response) {
    tblVeh.innerHTML = '<h1>500 Connection error</h1>';
  }
}

async function addToVehs() {
  let brand = document.querySelector('#brand').value;
  let model = document.querySelector('#model').value;
  let plate = document.querySelector('#plate').value;
  let year = document.querySelector('#year').value;
  let price = document.querySelector('#price').value;
  let loadCapacity = document.querySelector('#loadCapacity').value;
  let vehicle = {
    brand,
    model,
    plate,
    year: parseInt(year),
    price: parseInt(price),
  };
  loadCapacity ? (vehicle.loadCapacity = parseInt(loadCapacity)) : null;

  try {
    let response = await fetch('/veh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vehicle),
    });
    if (response.ok) {
      vehs.push(vehicle);
      updateVehs(vehs);
    } else {
      console.error(
        'Error adding vehicle:',
        response.status,
        response.statusText,
      );
    }
  } catch (error) {
    console.error('Error adding vehicle:', error);
  }
}
