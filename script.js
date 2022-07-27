// create 7 ships [5,4,3,2,2]
const gamecontainer = document.getElementById('gameboard');

let shipstorage = [
  { title: 'Carrier', length: '5', count: 0 },
  { title: 'Battleship', length: '4', count: 0 },
  { title: 'Cruiser', length: '3', count: 0 },
  { title: 'Destroyer', length: '2', count: 0 },
  { title: 'Destroyertwo', length: '2', count: 0 },
  { title: 'Submarine', length: '1', count: 0 },
  { title: 'Submarinetwo', length: '1', count: 0 },
];
function ship(shipstorage) {
  for (let i = 0; i < shipstorage.length; i++) {
    smallship = document.createElement("div")
    smallship.setAttribute("id", shipstorage[i].title)
    gamecontainer.appendChild(smallship)
    for (let j = 0; j < shipstorage[i].length; j++) {
      smallshipbox = document.createElement('div')
      smallshipbox.style.height = '50px';
      smallshipbox.style.width = '50px';
      smallshipbox.classList.add('ships')
      let identity  = `${shipstorage[i].title}${j}${i}`
      smallshipbox.setAttribute("id", identity)
      smallshipbox.addEventListener("click", hit)
      smallship.appendChild(smallshipbox)

    }
  }
}

function hit(e) {
  let shipcounter = e.path[0].id[e.path[0].id.length - 1];
  let targets = document.getElementById(e.path[0].id);
  targets.innerText = 'X';
  targets.classList.add('hit');
  shipstorage[shipcounter].count += 1;
  isSunk();
}

function isSunk() {
  console.log(shipstorage[1])
  for(let i = 0 ; i < shipstorage.length ; i++) {
    if(shipstorage[i].length == shipstorage[i].count) {
      for(let j = 0; j < shipstorage[i].length ; j++) {
        let sunken = document.getElementById(`${shipstorage[i].title}${j}${i}`);
        sunken.classList.add('sunk');
      }
    }
  }
}

function gameboard(height) {
  for (let i = 0; i < height; i++) {
    bigbox = document.createElement('div');
    gamecontainer.appendChild(bigbox);
    for (let j = 0; j < height; j++) {
      let box = document.createElement('div');
      box.classList.add(`${i}${j}`);
      box.classList.add("box")
      box.style.height = '50px';
      box.style.width = '50px';
      box.addEventListener("click", function() {
        box.classList.add("hit")
      })
      bigbox.appendChild(box);
    }
  }
}

ship(shipstorage)