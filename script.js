// create 7 ships [5,4,3,2,2]
const gamecontainer = document.getElementById('gameboard');

let shipstorage = [
  { title: 'Carrier', length: '5', count: 0, max: 59 },
  { title: 'Battleship', length: '4', count: 0, max: 69 },
  { title: 'Cruiser', length: '3', count: 0, max: 79 },
  { title: 'Destroyer', length: '2', count: 0, max: 89 },
  { title: 'Submarine', length: '1', count: 0, max: 99 },
];

let computershipstorage = [
  { title: 'CompCarrier', length: '5', count: 0, max: 59 },
  { title: 'CompBattleship', length: '4', count: 0, max: 69 },
  { title: 'CompCruiser', length: '3', count: 0, max: 79 },
  { title: 'CompDestroyer', length: '2', count: 0, max: 89 },
  { title: 'CompSubmarine', length: '1', count: 0, max: 99 },
];

function hit(e) {
  console.log(e.path)
  let targets = document.getElementById(e.path[0].id);
  targets.classList.remove('hits')
  targets.classList.remove('bluetime');
  targets.innerText = 'X';
  targets.classList.add('hit');
  if (shipstorage[e.path[0].id[e.path[0].id[0]]] ==='s') {
    shipstorage[e.path[0].id[e.path[0].id.length - 2]].count++;
  } else {
    computershipstorage[e.path[0].id[e.path[0].id.length - 2]].count++;
  }
  isSunk();
}

function isSunk() {
  for(let i = 0 ; i < shipstorage.length ; i++) {
    if(shipstorage[i].length == shipstorage[i].count) {
      for(let j = 0; j < shipstorage[i].length ; j++) {
        let sunken = document.getElementById(`${shipstorage[i].title}${i}${j}`);
        sunken.classList.add('sunk');
      }
    }
  }
  for (let i = 0; i < computershipstorage.length; i++) {
    if (computershipstorage[i].length == computershipstorage[i].count) {
      for (let j = 0; j < computershipstorage[i].length; j++) {
        let sunken = document.getElementById(`${computershipstorage[i].title}${i}${j}`);
        sunken.classList.add('sunk');
      }
    }
  }
}
let ships = 0;
let computerships = 0;
let taken = [];

function gameboard(height, player) {
  let game = document.createElement('div')
  game.classList.add(player)
  for (let i = 0; i < height; i++) {
    bigbox = document.createElement('div');
    game.appendChild(bigbox);
    for (let j = 0; j < height; j++) {
      let box = document.createElement('div');
      box.setAttribute("id", `${player}${j}${i}`);
      box.classList.add("box")
      box.style.height = '30px';
      box.style.width = '30px';
      box.addEventListener("click", function() {
        if(ships == 5) {
          if (
            box.classList.contains('hit') != true &&
            box.classList.contains('sunk') != true
          ) {
            box.classList.add('hits');
          }
        } else if(player == 'first') { 
          ship(`${player}`,`${j}${i}`);
        }
      })

      box.addEventListener("mouseenter", function(){
        box.classList.add("bluetimes")
      })
      box.addEventListener('mouseleave', function () {
        box.classList.remove('bluetimes');
      });
      
      bigbox.appendChild(box);
    }
  }
  gamecontainer.appendChild(game)
}
gameboard(10, 'first')
gameboard(10, 'second')


function ship(board, e){
  let d = parseInt(e)
  console.log(`${board}${d}`);
  if(shipstorage[ships].max > e ) {
    for(let i = 0 ; i < shipstorage[ships].length; i++) {
      let hovership = document.getElementById(`${board}${d}`)
      hovership.classList.add("bluetime")
      hovership.setAttribute('id', `${shipstorage[ships].title}${ships}${i}`);
      hovership.addEventListener('click', hit);
      d += 10
    }
    ships++
  }
}
function random() {
  let current = Math.floor(Math.random() * 100);
  //console.log(current)
  return current
}
function computerboard(c) {
  // need to figure out how to make it work when c < 10
  if(c <= computershipstorage[computerships].max && c > 10) {
    console.log(taken);
    console.log(c)
    if (taken.includes(c) == false && taken.includes(c+10) == false && taken.includes(c+20) == false && taken.includes(c+40) == false) {
      let d = c;
      for (let i = 0; i < computershipstorage[computerships].length; i++) {
        let hovership = document.getElementById(`second${d}`);
        hovership.setAttribute('id',`${computershipstorage[computerships].title}${computerships}${i}`);
        hovership.addEventListener('click', hit);
        taken.push(d);
        d += 10;
      }
      computerships++;
    } else {
      computerboard(random());
    }
  } else {
    computerboard(random())
  }
}

function computerboards() {
  while(computerships < 5) {
    computerboard(random())
  }
}
computerboards()
