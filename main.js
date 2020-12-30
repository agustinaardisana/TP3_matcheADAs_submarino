// -------------------------------------🐠 Variables JS
const itemSize = 50;
const seaCreaturesArray = ["🐠", "🐬", "🧜‍♀️", "🐙", "🐡", "🦞"];
const list = [];
const items = "";

// -------------------------------------🐠 Variables DOM
const grid = document.querySelector(".grid");

// -------------------------------------🐠

const getRandomNumber = (seaCreaturesArray) => {
  let arrayLength = seaCreaturesArray.length;
  return Math.floor(Math.random() * arrayLength);
};
const getRandomItems = (seaCreaturesArray) => {
  return seaCreaturesArray[getRandomNumber(seaCreaturesArray)];
};

const createGrid = (width, height) => {
  const gridWidth = itemSize * width;
  grid.style.width = `${gridWidth}px`;

  for (let i = 0; i < width; i++) {
    listOfItems[i] = [];
    for (let j = 0; j < height; j++) {
      listOfItems[i][j] = getRandomItems(seaCreaturesArray);
    }
  }

  grid.innerHTML = "";
  for (let i = 0; i < listOfItems.length; i++) {
    for (let j = 0; j < listOfItems[i].length; j++) {
      items = getRandomItems(seaCreaturesArray);
      listOfItems[i][j] = items;
      grid.innerHTML += `<div data-x="${i}" data-y="${j}"> ${items}</div>`;
    }
  }

  return grid;
};
