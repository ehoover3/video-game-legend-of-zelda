// 1. JAVASCRIPT VARIABLES

const map = [
  "WWWWWWWWWW",
  "WPgggggggW",
  "WWWWWgWWgW",
  "WgWgggWggW",
  "WgWgWWWWWW",
  "WggggWgWFW",
  "WWWWgggWgW",
  "WggggWWWgW",
  "WgWWgWgggW",
  "WggWgggWgW",
  "WWWWWWWWWW",
];

// game objects
let player = {
  x: 0,
  y: 0,
  src: "./assets/link.png",
};

let finish = {
  x: 0,
  y: 0,
};

let mapDiv = document.querySelector(".map");

// 2. BUILD MAP
function buildMap(map) {
  for (let row = 0; row < map.length; row++) {
    let rowDiv = document.createElement("div");
    rowDiv.classList.add("row");

    // make column divs inside each row div
    for (let x = 0; x < map[row].length; x++) {
      let cell = document.createElement("div");
      cell.classList.add("cell");

      let cellType = map[row][x];

      if (cellType === "W") {
        cell.classList.add("wall"); // W -> wall
      }

      if (cellType === "P") {
        cell.classList.add("cell");

        // build player
        cell.classList.add("player"); // P -> player
        player.x = x;
        player.y = row;
      }

      if (cellType === "F") {
        cell.classList.add("finish"); // F -> finish area
        finish.x = x;
        finish.y = row;
      }

       // add cell to row
      rowDiv.append(cell);
    }

    mapDiv.append(rowDiv);
  }
}
buildMap(map);
let cellPixels = 64;

document.querySelector(".player").style.left = player.x * cellPixels - cellPixels + "px";
document.querySelector(".player").style.top = player.y * cellPixels - cellPixels + "px";

function movePlayer(e) {
  // if (e.key === "ArrowLeft")

  switch (e.key) {
    case "ArrowLeft":

    // if 1 to the left is NOT a wall
    if (map[player.y][player.x - 1] !== "W") {

      player.x -= 1;
      }
      document.querySelector(".player").style.background = 'url("./assets/link.png") -64px 0px';
      break;

    case "ArrowRight":
      if (map[player.y][player.x + 1] !== "W") {
        player.x += 1;
      }
      document.querySelector(".player").style.background = 'url("./assets/link.png") -192px 0px';
      break;

    case "ArrowUp":
      if (map[player.y - 1][player.x] !== "W") {
        player.y -= 1;
      }
      document.querySelector(".player").style.background = 'url("./assets/link.png") -128px 0px';
      break;

    case "ArrowDown":
      if (map[player.y + 1][player.x] !== "W") {
        player.y += 1;
      }
      document.querySelector(".player").style.background = 'url("./assets/link.png") 0px 0px';
      break;
  }

  checkWinCondition();

  // re-render player
  let cellPixels = 64;
  document.querySelector(".player").style.left = player.x * cellPixels - cellPixels + "px";
  document.querySelector(".player").style.top = player.y * cellPixels - cellPixels + "px";
  document.querySelector(".player").src = player.src;
}
document.addEventListener("keydown", movePlayer);

function checkWinCondition() {
  let win = document.querySelector(".message");
  player.x === finish.x && player.y === finish.y
    ? (win.textContent = "You win!")
    : (win.textContent = "");
}
