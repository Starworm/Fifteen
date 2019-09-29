// initial constants - size of the field (always square!)
let size = 4;

let maxNumber = size*size-1;

// container for fifteen
let cont = document.createElement("div");
cont.style.width = size*100+"px";
cont.style.height = size*100+"px";
cont.classList.add("centered", "container");

// arrays of tiles from 1st to 15th
let square = [];

for (let i = 0; i < maxNumber; i++) {
    let sq = document.createElement("div");
    sq.classList.add("sq", "full");
    sq.textContent = i + 1;
    square.push(sq);
}

// empty tile (last one)
let sqEmp = document.createElement("div");
sqEmp.classList.add("sq", "empty", "nonplaced");
square.push(sqEmp);

// shuffle all tiles
shuffle(square);

// positioning blocks
let block = false;

square.forEach((e, index) => {

    // set coordinates and positions (left, top)
    e.i = (index % size);        //   : i = (max/value)-1     6:   9/6 = 1-1 = 0
    e.j = ~~(index / size);      //     j = (max%value)            9%6 = 3
    e.style.left = e.i * 100 + "px";
    e.style.top = e.j * 100 + "px";

    // move by clicking if possible

    e.addEventListener("click", function () {
        if (!block && isMovable(this)) {
            swapElem(this);
            block = true;
            checked(e);
        }
    });

    // wait till transition is finished the release another block
    e.addEventListener("transitionend", function () {
        block = false;
    });

// adding of a new block to container
    cont.appendChild(e);
});

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        swap(arr, i, nextInt(i + 1));
    }
}

function swap(arr, i, j) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
}

function nextInt(num) {
    return ~~(Math.random() * num);
}

// checking relative positions of element and fill space
// function returns possibility of moving of clicked tile
// the idea is follow:
// ---------------------------------
// | empty | movable | non-movable |
// | tile  |  tile   |   tile      |
// ---------------------------------
// Abs(XcoordMovTile - XemptyTile) = 1 , BUT Abs(XcoordNonMovTile - XemptyTile) > 1
// same to Y
function isMovable(elem) {
    if (elem == sqEmp) return false;

    let si = sqEmp.i;
    let sj = sqEmp.j;
    let ei = elem.i;
    let ej = elem.j;

    if (si == ei)
        return Math.abs(sj - ej) == 1;
    if (sj == ej)
        return Math.abs(si - ei) == 1;
}

function swapElem(elem) {
    [sqEmp.style.left, elem.style.left] = [elem.style.left, sqEmp.style.left];
    [sqEmp.style.top, elem.style.top] = [elem.style.top, sqEmp.style.top];
    [sqEmp.i, elem.i] = [elem.i, sqEmp.i];
    [sqEmp.j, elem.j] = [elem.j, sqEmp.j];
}

function checked(e) {
    let ost = Math.floor(e.innerText % size);
    let cel = Math.floor(e.innerText / size);
    let y = ost == 0 ? cel-1 : cel;
    let x = ost == 0 ? size-1: ost-1;
    if(e.i == x && e.j == y) {
        e.classList.remove("nonplaced");
        e.classList.add("placed");
    }
    else {
        e.classList.remove("placed");
        e.classList.add("nonplaced");
    }
}

// adding container to body - starting the page
document.body.append(cont);