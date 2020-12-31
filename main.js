// -------------------------------------🐠 Variables JS
let itemSize = 0;
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
    defineItemSize(6)
    createGridArray(width, height);
    createGridStructure();
};

startGame(6, 6);

//Listens to the clicks and stores them in order to compare their positions later 
const storeClicksOnItems = () => {
    const allSquares = document.querySelectorAll("#grid > div")

    let firstClickedSquare = ''
    let secondClickedSquare = ''

    for (let square of allSquares) {
        square.onclick = (e) => {
            firstClickedSquare = e.target
            console.log("click 1")

            for (let secondSquare of allSquares) {
                secondSquare.onclick = (e) => {
                    secondClickedSquare = e.target
                    console.log("click 2")
                    areAdjacent(firstClickedSquare, secondClickedSquare)
                }
            }
        }
    }
}

storeClicksOnItems()

//Compares the position of each clicked square and checks whether they are adjacent or not
const areAdjacent = (firstSquare, secondSquare) => {
    const datax1 = Number(firstSquare.dataset.x)
    const datay1 = Number(firstSquare.dataset.y)
    const datax2 = Number(secondSquare.dataset.x)
    const datay2 = Number(secondSquare.dataset.y)

    if (datax1 === datax2 && datay1 === datay2 + 1 || datax1 === datax2 && datay1 === datay2 - 1 || datay1 === datay2 && datax1 === datax2 + 1 || datay1 === datay2 && datax1 === datax2 - 1) {
        console.log('son adyacentes')
    }
    else {
        console.log('no son adyacentes')
    }
}

