// -------------------------------------🐠 Variables JS
let itemSize = 0;
let seaCreaturesArray = ["🐠", "🐬", "🧜‍♀️", "🦑", "🐡", "🦭"];
let listOfItems = [];
let items = "";
let gridWidth = "";
const paddingAndBorder = 32;
let difficulty = 0;
let remainingTime = 30;
let timer = null;
let verticalMatch = [];
let horizontalMatch = [];
let score = 0;
let combo = 1;
let animationDelay = 200;

// -------------------------------------🐠 Variables DOM
const grid = document.querySelector("#grid");
const gridContainer = document.querySelector("#grid-container");
const controlsContainer = document.querySelector(".container.controls");
const timerCountdown = document.querySelector(".timer-countdown");
const comboCounter = document.querySelector("#combo");
const scoreCounter = document.querySelector("#score");
const finalScore = document.querySelector("#final-score");
// -------------------------------------🐠 Modals
const startGameModal = document.querySelector(".start-game");
const playGameButton = document.querySelector(".play-game");
const gameDifficultyModal = document.querySelector(".game-difficulty");
const easyButton = document.querySelector(".game-easy");
const normalButton = document.querySelector(".game-normal");
const difficultButton = document.querySelector(".game-difficult");
const gameOverModal = document.querySelector(".game-over");
const newGameButtons = document.querySelectorAll(".new-game");
const restartGameIcon = document.querySelector(".restart-game.icon");
const gameRestartModal = document.querySelector(".game-restart");
const cancelButton = document.querySelector(".cancel");
const restartGameButton = document.querySelector(".restart-game.button");

//-------------------------------------🐠 General Actions
const hideModal = (modal) => modal.classList.add("hidden");
const showModal = (modal) => modal.classList.remove("hidden");

// -------------------------------------🐠

//-------------------------------------🐠 Modals Actions
newGameButtons.forEach((button) => {
  button.onclick = () => {
    button.closest(".overlay").classList.add("hidden");
    gameDifficultyModal.classList.remove("hidden");
    clearTimeout(timer);
    remainingTime = 30;
    resetScore();
  };
});

restartGameIcon.onclick = () => {
  gameRestartModal.classList.remove("hidden");
  clearTimeout(timer);
};

cancelButton.onclick = () => {
  gameRestartModal.classList.add("hidden");
  countdown();
};

restartGameButton.onclick = () => {
  gameOverModal.classList.add("hidden");
  retrieveDifficultySetting();
  clearTimeout(timer);
  remainingTime = 30;
  countdown();
  resetScore();
};

//REtrieves the difficulty that the user chose when the game started
retrieveDifficultySetting = () => {
  if (difficulty === "9") {
    startEasyGame();
  } else if (difficulty === "8") {
    startNormalGame();
  } else if (difficulty === "7") {
    startDifficultGame();
  }
};

const revisarDificultadElegida = () => {
  if (nivelDificultad === "facil") {
    grillaFacil();
  } else if (nivelDificultad === "normal") {
    grillaNormal();
  } else if (nivelDificultad === "dificil") {
    grillaDificil();
  }
};

// -------------------------------------🐠

/**
 * Defines grid size
 */
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

// -------------------------------------🐠 Create random items
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
  let firstClickedSquare = document.querySelector(".selected");

  if (firstClickedSquare != null) {
    let secondClickedSquare = e.target;
    if (areAdjacent(firstClickedSquare, secondClickedSquare)) {
      changePositions(firstClickedSquare, secondClickedSquare);
      if (thereAreMatches()) {
        verticalMatches();
        horizontalMatches();
        deleteAndDropEmojis(totalMatchesIntersection());
        resetClicks(firstClickedSquare, secondClickedSquare);
      } else {
        setTimeout(
          () => changePositions(firstClickedSquare, secondClickedSquare),
          animationDelay * 2
        );
      }
    } else {
      firstClickedSquare.classList.remove("selected");
      secondClickedSquare.classList.add("selected");
    }
  } else {
    let firstClickedSquare = e.target;
    firstClickedSquare.classList.add("selected");
  }
};

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

const thereAreMatches = () => {
  return verticalMatches().length > 0 || horizontalMatches().length > 0;
};

/**
 * When matches exits, it finds them
 *
 */
const verticalMatches = () => {
  verticalMatch = [];
  for (let i = 0; i < listOfItems.length; i++) {
    for (let j = 0; j < listOfItems[i].length; j++) {
      if (listOfItems[i + 1] && listOfItems[i + 2]) {
        if (
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
  }

  return verticalMatch;
};

const horizontalMatches = () => {
  horizontalMatch = [];
  for (let i = 0; i < listOfItems.length; i++) {
    for (let j = 0; j < listOfItems[i].length; j++) {
      if (listOfItems[j + 1] && listOfItems[j + 2]) {
        if (
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
  }
  return horizontalMatch;
};

const resetClicks = (firstClickedSquare, secondClickedSquare) => {
  firstClickedSquare.classList.remove("selected");
  secondClickedSquare.classList.remove("selected");
  firstClickedSquare = null;
  secondClickedSquare = null;
};

const totalMatchesIntersection = () => {
  let matchesUnfiltered = verticalMatch.concat(horizontalMatch);

  let joint = [];
  let combinedMatches = matchesUnfiltered.filter((coordinates) => {
    let uniqueValue = `${coordinates[0]}${coordinates[1]}`;

    if (!joint.includes(uniqueValue)) {
      joint.push(uniqueValue);

      return true;
    } else {
      return false;
    }
  });
  updateCombos();
  updateScore(combinedMatches);
  return combinedMatches;
};

/**
 * Keeps the score and combos
 */
const updateScore = (combinedMatches) => {
  score += Number(combinedMatches.length) * 100 * combo;
  scoreCounter.textContent = `${score}`;
};

const updateCombos = () => {
  combo++;
  comboCounter.textContent = `${combo}`;
  setTimeout(() => resetCombos(), 700);
};

const resetScore = () => {
  score = 0;
  scoreCounter.textContent = `${score}`;
};

const resetCombos = () => {
  combo = 1;
  comboCounter.textContent = `${combo}`;
};

/**
 * Looks for new matches and replaces the emojis for new ones
 */

const deleteAndDropEmojis = (arrayMatches) => {
  deleteEmoji(arrayMatches);
  setTimeout(() => {
    dropEmojis(arrayMatches);
    searchVoid();
  }, animationDelay * 4);

  if (thereAreMatches()) {
    updateCombos();
    setTimeout(() => deleteAndDropEmojis(totalMatchesIntersection()), 700);
  }
};

const deleteEmoji = (arrayMatches) => {
  for (let i = 0; i < arrayMatches.length; i++) {
    let x = arrayMatches[i][0];
    let y = arrayMatches[i][1];
    let match = selectArrayHTML(x, y);
    match.classList.add("eliminated");
    match.innerHTML = "";
    match.classList.remove("eliminated");
  }
};

const dropEmojis = (arrayMatches) => {
  for (let i = 0; i < arrayMatches.length; i++) {
    let matchedDivPosition = arrayMatches[i];
    let matchedDiv = selectArrayHTML(
      matchedDivPosition[0],
      matchedDivPosition[1]
    );
    let upperEmojiDataX = matchedDivPosition[0] - 1;

    while (upperEmojiDataX >= 0) {
      let upperEmoji = selectArrayHTML(upperEmojiDataX, matchedDivPosition[1]);

      changePositions(matchedDiv, upperEmoji);
      upperEmojiDataX -= 1;
    }
  }
};

const searchVoid = () => {
  let emojisList = document.querySelectorAll(".square");

  for (let emptySquare of emojisList) {
    if (emptySquare.textContent === "") {
      let voidX = emptySquare.dataset.x;
      let voidY = emptySquare.dataset.y;
      let voidEmojiList = selectArrayHTML(voidX, voidY);
      displayNewEmojisJS(listOfItems, voidX, voidY);
      displayNewEmojisHTML(voidEmojiList, voidX, voidY);
    }
  }
};

const selectArrayHTML = (x, y) => {
  return document.querySelector(`div[data-x='${[x]}'][data-y='${[y]}']`);
};

const displayNewEmojisJS = (array, voidX, voidY) => {
  for (let i = 0; i < array.length; i++) {
    listOfItems[voidX][voidY] = getRandomItems(seaCreaturesArray);
  }
  return listOfItems[voidX][voidY];
};

const displayNewEmojisHTML = (voidEmojiList, x, y) => {
  setTimeout(() => {
    voidEmojiList.innerHTML = `${listOfItems[x][y]}`;
    voidEmojiList.classList.add("new");
  }, animationDelay * 3);
  voidEmojiList.classList.remove("new");
};

// -------------------------------------🐠Countdown

const countdown = () => {
  timerCountdown.innerHTML = countdownInMinutes(remainingTime);

  if (remainingTime > 0) {
    remainingTime--;
    timer = setTimeout(countdown, 1000);
  } else {
    endGame();
  }
};

const countdownInMinutes = (seconds) => {
  return (
    Math.floor(seconds / 60) + ":" + ("0" + Math.floor(seconds % 60)).slice(-2)
  );
};

const endGame = () => {
  gameOverModal.classList.remove("hidden");
  finalScore.textContent = `${score}`;
};

// -------------------------------------🐠 Clickable Effect
/**
 * Gives a clickable effect to the selected item
 */
const clickable = () => {
  let emojisList = document.querySelectorAll(".square");

  for (let emoji of emojisList) {
    emoji.onclick = () => {
      emoji.classList.toggle("clickable");
    };
  }
};

/**
 * Starts game whitout initial matches
 */

// Start Game
playGameButton.onclick = () => {
  hideModal(startGameModal);
  selectDifficulty();
};

// Select Difficulty
const selectDifficulty = () => {
  showModal(gameDifficultyModal);

  easyButton.onclick = () => {
    startEasyGame();
    clearTimeout(timer);
    countdown();
  };

  normalButton.onclick = () => {
    startNormalGame();
    clearTimeout(timer);
    countdown();
  };

  difficultButton.onclick = () => {
    startDifficultGame();
    clearTimeout(timer);
    countdown();
  };
};

const startEasyGame = () => {
  do {
    emptyHTMLGrid();
    startGame(9, 9);
    difficulty = 9;
    hideModal(gameDifficultyModal);
    clickable();
  } while (thereAreMatches());
};

const startNormalGame = () => {
  do {
    emptyHTMLGrid();
    startGame(8, 8);
    difficulty = 8;
    hideModal(gameDifficultyModal);
    clickable();
  } while (thereAreMatches());
};

const startDifficultGame = () => {
  do {
    emptyHTMLGrid();
    startGame(7, 7);
    difficulty = 7;
    hideModal(gameDifficultyModal);
    clickable();
  } while (thereAreMatches());
};

const emptyHTMLGrid = () => {
  grid.textContent = "";
};

const startGame = (width, height) => {
  defineItemSize(width);
  createGridArray(width, height);
  createGridStructure();
};
