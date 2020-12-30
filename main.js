// -------------------------------------🐠 Variables JS
const itemSize = 50;
let seaCreaturesArray = ["🐠", "🐬", "🧜‍♀️", "🐙", "🐡", "🦞"];
let listOfItems = [];
let items = "";
let gridWidth = "";

// -------------------------------------🐠 Variables DOM
const grid = document.querySelector("#grid");
const gridContainer = document.querySelector("#grid-container");

// -------------------------------------🐠

const getRandomNumber = (seaCreaturesArray) => {
  let arrayLength = seaCreaturesArray.length;
  return Math.floor(Math.random() * arrayLength);
};
const getRandomItems = (seaCreaturesArray) => {
  return seaCreaturesArray[getRandomNumber(seaCreaturesArray)];
};
const defineItemSize = (numberOfRows) => {
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

const containerGridSize = () => {
  grid.style.width = `${gridWidth}px`;
  grid.style.height = `${gridWidth}px`;
  gridContainer.style.width = `${gridWidth + 20}px`;
  gridContainer.style.height = `${gridWidth + 20}px`;
};

const createSquare = (x, y, items) => {
  const square = document.createElement("div");
  //   square.addEventListener("click", escucharClicks);
  square.dataset.x = x;
  square.dataset.y = y;
  square.style.height = `${itemSize}px`;
  square.style.width = `${itemSize}px`;
  square.style.top = `${x * itemSize}px`;
  square.style.left = `${y * itemSize}px`;
  square.innerHTML = items;
  square.classList.add("square");

  return square;
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
  containerGridSize();
  for (let i = 0; i < listOfItems.length; i++) {
    for (let j = 0; j < listOfItems[i].length; j++) {
      items = getRandomItems(seaCreaturesArray);
      listOfItems[i][j] = items;
      grid.appendChild(createSquare(i, j, items));
    }
  }

  return grid;
};

const startGame = (width, height) => {
  createGridArray(width, height);
  createGridStructure();
};

startGame(6, 6);
