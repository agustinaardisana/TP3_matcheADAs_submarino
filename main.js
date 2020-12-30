// -------------------------------------🐠 Variables JS
const itemSize = 50;
let seaCreaturesArray = ["🐠", "🐬", "🧜‍♀️", "🐙", "🐡", "🦞"];
let listOfItems = [];
let items = "";
let gridWidth = "";

// -------------------------------------🐠 Variables DOM
const grid = document.querySelector("#grid");

// -------------------------------------🐠

const getRandomNumber = (seaCreaturesArray) => {
  let arrayLength = seaCreaturesArray.length;
  return Math.floor(Math.random() * arrayLength);
};
const getRandomItems = (seaCreaturesArray) => {
  return seaCreaturesArray[getRandomNumber(seaCreaturesArray)];
};
const containerGridSize = (numberOfRows) => {
  itemSize = gridWidth / numberOfRows;
};

const responsiveSizing = () => {
  const mobileSize = window.matchMedia("(max-width: 500px)");
  const mobileSizeSmaller = window.matchMedia("(max-width: 350px)");
  if (mobileSizeSmaller.matches) {
    gridSize = 290;
  } else if (mobileSize.matches) {
    gridSize = 310;
  } else {
    gridSize = 470;
  }
  return gridSize;
};

gridWidth = responsiveSizing();

const createSqueare = (x, y, items) => {
  const squeare = document.createElement("div");
  squeare.dataset.x = x;
  squeare.dataset.y = y;
  squeare.style.height = `${itemSize}px`;
  squeare.style.width = `${itemSize}px`;
  squeare.style.top = `${x * itemSize}px`;
  squeare.style.left = `${y * itemSize}px`;
  squeare.innerHTML = items;

  return squeare;
};

const createGridArray = (width, height) => {
  for (let i = 0; i < width; i++) {
    listOfItems[i] = [];
    for (let j = 0; j < height; j++) {
      listOfItems[i][j] = getRandomItems(seaCreaturesArray);
    }
  }
  return listOfItems;
};

const createGridStructure = () => {
  grid.style.width = `${gridWidth}px`;
  grid.style.height = `${gridWidth}px`;

  for (let i = 0; i < listOfItems.length; i++) {
    for (let j = 0; j < listOfItems[i].length; j++) {
      items = getRandomItems(seaCreaturesArray);
      listOfItems[i][j] = items;
      grid.appendChild(createSqueare(i, j, items));
    }
  }

  return grid;
};

const startGame = (width, height) => {
  createGridArray(width, height);
  createGridStructure();
};

startGame(6, 6);
