// -------------------------------------🐠 Variables JS
let itemSize = 0;
let seaCreaturesArray = ["🐠", "🐬", "🧜‍♀️", "🦑", "🐡", "🦞"];
let listOfItems = [];
let items = "";
let gridWidth = "";
const paddingAndBorder = 42

// -------------------------------------🐠 Variables DOM
const grid = document.querySelector("#grid");
const gridContainer = document.querySelector("#grid-container");
const controlsContainer = document.querySelector(".container.controls")

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
  const mobileSize = window.matchMedia("(max-width: 575.98px)");
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
  gridContainer.style.width = `${gridWidth + paddingAndBorder}px`;
  gridContainer.style.height = `${gridWidth + paddingAndBorder}px`;
  controlsContainer.style.width = `${gridWidth + paddingAndBorder}px`;
};

const createSquare = (x, y, items) => {
  const square = document.createElement("div");
  square.addEventListener("click", storeClicksOnItems);
  square.dataset.x = x;
  square.dataset.y = y;
  square.style.height = `${itemSize}px`;
  square.style.width = `${itemSize}px`;
  square.style.top = `${x * itemSize}px`;
  square.style.left = `${y * itemSize}px`;
  square.innerHTML = items;
  square.classList.add("square");
  square.classList.add("emoji");

  return square;
};

/**
 * Creates the array of items using the width and the height as length according the difficulty that has been chosen
 * @param {number} width
 * @param {number} height
 */
const createGridArray = (width, height) => {
  for (let i = 0; i < width; i++) {
    listOfItems[i] = [];
    for (let j = 0; j < height; j++) {
      listOfItems[i][j] = getRandomItems(seaCreaturesArray);
    }
  }
  return listOfItems;
};

/**
 * Creates the structure in html
 */
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
// -------------------------------------🐠 Select Items
/**
 * Gives a selected class to the first div clicked
 * @param {div} firstClickedSquare
 */
const selectItems = (firstClickedSquare) => {
  if (!firstClickedSquare.className.includes("selected")) {
    firstClickedSquare.classList.add("selected");
  }
};

/**
 * Listens to the clicks, sores them and looks for new matches
 */

const storeClicksOnItems = (e) => {
  let firstClickedSquare = document.querySelector(".selected")

  if (firstClickedSquare != null) {

    let secondClickedSquare = e.target
    if (areAdjacent(firstClickedSquare, secondClickedSquare)) {
      changePositions(firstClickedSquare, secondClickedSquare)
      if (thereAreMatches()) {
          verticalMatches()
          horizontalMatches()
          console.log('hay matches')
      } else {
          setTimeout(() => changePositions(firstClickedSquare, secondClickedSquare), 400)               
      }
    } else {
          firstClickedSquare.classList.remove("selected")
          secondClickedSquare.classList.add("selected") ///checkear, se puede mejorar
    }
  } else {
      let firstClickedSquare = e.target
      firstClickedSquare.classList.add("selected")
    }
};

/**
 * Looks for new matches and replaces the emojis for new ones
 */
const createNewEmojis = (arrayMatches) => {
    for (let i = 0; i < arrayMatches.length; i++) {
      let x = arrayMatches[i][0];
      let y = arrayMatches[i][1];
      displayNewEmojisJS(listOfItems, x, y)
      let match = selectMatchHTML(x,y)
      match.classList.add('hidden'); ////Cambiar por una animacion
  
      displayNewEmojisHTML(match,x,y)
    } 
  }

const displayNewEmojisJS = (array, x, y) => {
  for (let i = 0; i < array.length; i++) {
  listOfItems[x][y] = getRandomItems(seaCreaturesArray)
  }
  return listOfItems[x][y]
}

const selectMatchHTML = (x,y) => {
  return document.querySelector(
    `div[data-x='${[x]}'][data-y='${[y]}']`,
  );
};

const displayNewEmojisHTML = (match,x,y) => {
  setTimeout(() => {
    match.innerHTML = `${listOfItems[x][y]}`;
    match.classList.remove('hidden');
    if (thereAreMatches()) {
      verticalMatches()
      horizontalMatches()
    }
  }, 700);
}

/**
 * Compares the position of each clicked square and checks whether they are adjacent or not
 * @param {div} firstSquare
 * @param {div} secondSquare
 */
const areAdjacent = (firstSquare, secondSquare) => {
  const datax1 = Number(firstSquare.dataset.x);
  const datay1 = Number(firstSquare.dataset.y);
  const datax2 = Number(secondSquare.dataset.x);
  const datay2 = Number(secondSquare.dataset.y);

  if (
    (datax1 === datax2 && datay1 === datay2 + 1) ||
    (datax1 === datax2 && datay1 === datay2 - 1) ||
    (datay1 === datay2 && datax1 === datax2 + 1) ||
    (datay1 === datay2 && datax1 === datax2 - 1)
  ) {
    return true;
  } else {
    return false;
  }
};

// -------------------------------------🐠 Clickable Effect
/**
 * Gives a clickable effect to the selected item
 */
const clickable = () => {
  let emojisList = document.querySelectorAll(".emoji");

  for (let emoji of emojisList) {
    emoji.onclick = () => {
      emoji.classList.toggle("clickable");
    };
  }
};

/**
 * Changes the position of two selected divs
 * @param {div} firstSquare
 * @param {div} secondSquare
 */
const changePositions = (firstSquare, secondSquare) => {
  const datax1 = Number(firstSquare.dataset.x);
  const datax2 = Number(secondSquare.dataset.x);
  const datay1 = Number(firstSquare.dataset.y);
  const datay2 = Number(secondSquare.dataset.y);

  let tempVariable = listOfItems[datax1][datay1];
  listOfItems[datax1][datay1] = listOfItems[datax2][datay2];
  listOfItems[datax2][datay2] = tempVariable;

  firstSquare.style.top = `${datax2 * itemSize}px`;
  secondSquare.style.top = `${datax1 * itemSize}px`;
  firstSquare.style.left = `${datay2 * itemSize}px`;
  secondSquare.style.left = `${datay1 * itemSize}px`;

  firstSquare.dataset.x = datax2;
  secondSquare.dataset.x = datax1;
  firstSquare.dataset.y = datay2;
  secondSquare.dataset.y = datay1;
};

/**
 * Finds matches
 */


/**
 * Starts game whitout initial matches
 */
const startDifficultGame = () => {
  do {
    emptyHTMLGrid();
    startGame(6, 6);
  } while (thereAreMatches());
};

const startGame = (width, height) => {
  defineItemSize(width);
  createGridArray(width, height);
  createGridStructure();
  // storeClicksOnItems();
};

/**
 * Checks for matches at initiation
 */

const thereAreMatches = () => {
  return thereAreVerticalMatches() || thereAreHorizontalMatches()
};

/**
 * Checks whether matches exist or not
 * 
 */
const thereAreVerticalMatches = () => {
  let verticalMatch = [];

  for (let i = 0; i < listOfItems.length; i++) {
    for (let j = 0; j < listOfItems[i].length; j++) {
      if (
        listOfItems[i + 1] &&
        listOfItems[i + 2] &&
        listOfItems[i][j] === listOfItems[i + 1][j] &&
        listOfItems[i][j] === listOfItems[i + 2][j]
      ) {
        return true
      }
    }
  }
return false
};

const thereAreHorizontalMatches = () => {
  let horizontalMatch = [];

  for (let i = 0; i < listOfItems.length; i++) {
    for (let j = 0; j < listOfItems[i].length; j++) {
      if (
        listOfItems[j + 1] &&
        listOfItems[j + 2] &&
        listOfItems[i][j] === listOfItems[i][j + 1] &&
        listOfItems[i][j] === listOfItems[i][j + 2]
      ) {
        return true
      }
    }
  }
return false
};

/**
 * Finds the existing matches
 * 
 */
const verticalMatches = () => {
  let verticalMatch = [];

  for (let i = 0; i < listOfItems.length; i++) {
    for (let j = 0; j < listOfItems[i].length; j++) {
      if (
        listOfItems[i + 1] &&
        listOfItems[i + 2] &&
        listOfItems[i][j] === listOfItems[i + 1][j] &&
        listOfItems[i][j] === listOfItems[i + 2][j]
      ) {
        verticalMatch = verticalMatch.concat([
          [i, j],
          [i + 1, j],
          [i + 2, j],
        ]);
      }
    }
  }
  createNewEmojis(verticalMatch)
};

const horizontalMatches = () => {
  let horizontalMatch = [];

  for (let i = 0; i < listOfItems.length; i++) {
    for (let j = 0; j < listOfItems[i].length; j++) {
      if (
        listOfItems[j + 1] &&
        listOfItems[j + 2] &&
        listOfItems[i][j] === listOfItems[i][j + 1] &&
        listOfItems[i][j] === listOfItems[i][j + 2]
      ) {
        horizontalMatch = horizontalMatch.concat([
          [i, j],
          [i, j + 1],
          [i, j + 2],
        ]);
      }
    }
  }
  createNewEmojis(horizontalMatch)
};

const emptyHTMLGrid = () => {
  grid.textContent = "";
};

//----------THIS WILL BE REPLACED ONCE WE HAVE THE DIFFICULTY.ONCLICK FUNCTIONS WORKING-----
startDifficultGame();
