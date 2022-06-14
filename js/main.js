/* HERE WE GO AGAIN. OK LET'S SEE*/
//First we catch the board
const $board = document.getElementById('board');


//We add some constants
playerOne = 'Player one';
playerTwo = 'Player two';
let $divForTheWinner = document.createElement('div');
$divForTheWinner.setAttribute('class', 'text-success text-center h1 mt-1');
$board.after($divForTheWinner);

//Then we catch every box of the board in an array
//First we declarate the array
let $boardArray = new Array(3);
for (i=0; i<$boardArray.length; i++){
    $boardArray[i] = new Array($boardArray.length);
}

//Then we catch every box by its ID
let counter = 1;
for(row in $boardArray){
    for(column in $boardArray){
        $boardArray[row][column] = document.getElementById(counter.toString());
        counter++;
    }
}

// We need to a function to verify lines
//Rows
function verifyRow(){
    console.log('Verificando Filas')
    let rowVerified = false;
    for (row in $boardArray) {
        //We initialize a counter
        let rowItemCounter = 0;
        //Verifying rows
        for (column in $boardArray) {
            console.log('Fila: ' + row);
            console.log('       Columna: ' + column);
            //If the element has a child, we add +1 to the counter    
            if ($boardArray[row][column].childElementCount != 0) {
                rowItemCounter++;
            }
        }

        console.log('Mensaje antes de verificar fila ' + row)
        //If the counter equals 3, it means that the items in the whole row have a child
        if (rowItemCounter == 3) {
            //So we can verify if all the icons in the row are the same
            if (rowValidation(row)) {
                console.log('Fila Verificada!');
                rowVerified = true;
                break;
            }
            console.log ('Mensaje despues de verificar fila ' + row);    
        } else {
            console.log('Fila no verificada, vamos a la siguiente');
        }
    }
    return rowVerified;
}

//Columns
function verifyColumn(){
    console.log('Vericando columnas')
    let columnVerified = false;
    for (column in $boardArray) {
        //Initialize a counter
        let columnItemCounter = 0;
        for (row in $boardArray) {
            //Verifying Columns
            console.log ('Columna: ' + column);
            console.log('       Fila:' + row);
            //If the item has a child, we add +1 to the counter   
            if ($boardArray[row][column].childElementCount != 0) {
                columnItemCounter++;
            }
            console.log('Contador hijos: ' + columnItemCounter);
        }
        console.log('Mensaje antes de verificar columna ' + column);
        //If the counter equals 3, it means that the items in the whole column have a child
        if (columnItemCounter == 3) {
            //So, we can check if all the children are the same
            if (columnValidation(column)) {
                console.log('Columna Verificada!');
                columnVerified = true;
                break;
            }
            console.log('Mensaje después de verificar columna' + column);
        } else {
            console.log('Columna no verificada, vamos a la siguiente')
        }
    }
    return columnVerified;
}

//Diagonals
mainDiagonal = new Array(3);
secondaryDiagonal = new Array(3);

//We fill the elements on the principal diagonal
function createMainDiagonal(){
    for (let i=0; i<mainDiagonal.length; i++){
        mainDiagonal[i] = $boardArray[i][i];
    };
};
createMainDiagonal();

//and fill the elements of the secondary diagonal
function createSecondaryDiagonal(){
    let rowAndColumn;

    for (row in $boardArray){
        for(column in $boardArray){
            rowAndColumn = parseInt(row) + parseInt(column);
            if(rowAndColumn == 2){
                secondaryDiagonal[column] = $boardArray[row][column];
            }
        }
    }
};
createSecondaryDiagonal();

//function for validate if a row has the same item in all its elements
function rowValidation(row){
    rowItem = [];
    for (i=0; i<3; i++){
        rowItem[i] = $boardArray[row][i].children[0].alt;
    }
    if(rowItem[0]==rowItem[1])
        return rowItem[1] == rowItem[2];
    else return false;
}

//function for validate if a column has the same item in all its elements
function columnValidation(column){
    columnItem = [];
    for (i=0; i<3; i++){
        columnItem[i] = $boardArray[i][column].children[0].alt;
    }
    if(columnItem[0]==columnItem[1])
        return columnItem[1] == columnItem[2];
    else return false;
}

//function for validate if a diagonal has the same item in all its elements
function diagonalValidation(diagonal){
    let counter = 0;
    for(let i=0; i<diagonal.length; i++){
        if (diagonal[i].childElementCount != 0){
            counter++;
        }
    }
    if(counter == 3){
        for(let i=0; i<diagonal.length; i++){
            diagonal[i] = diagonal[i].children[0].alt;
        }
    }
    if(diagonal[0]==diagonal[1]){
        return diagonal[1]==diagonal[2];
    }
    else return false;
}

const errorMessage = "Field already taken, choose another one (:";
const $errorMessage = document.createElement('p');

$errorMessage.setAttribute('class','text-center text-danger h1');
$board.after($errorMessage);

/*In the logic part, first we need to know who's turn is, so we can decide whether draw an X or an O
For this we make a boolean variable asking for player one turn*/
let isPlayerOneTurn = true;
/* and we use this variable in the listener*/

/*For avoid the players click on a field that is already taken, we need to create a function*/
function isFieldTaken(element){
    if(element.target.localName == 'img'){
        $errorMessage.innerHTML = errorMessage;

        return true;
    }
    else{
        $errorMessage.innerHTML = '';

        return false;
    }
}

//Function that shows a message to the winner
function whosTheWinner(){
    if(!isPlayerOneTurn){                
        return `${playerOne} won!`;
    }
    else{
        return `${playerTwo} won!`;
    }
}

//Then we add an event listener to the board (click)
$board.addEventListener('click', (e)=>{
    //If a field is taken we shouldn't let the players draw their icon in it
    //And ask them to take another one
    if(!isFieldTaken(e)){
        //Depending on who's turn is, we draw an X or an O
        if(isPlayerOneTurn){
            drawAnX(e);
            isPlayerOneTurn = false;
        }
        else{
            drawAnO(e);
            isPlayerOneTurn = true;
        }
        //After a player has drawn his icon we must verify rows, columns and diagonals
        if(verifyRow()){
            launchModal();
            return;
        }
        if(verifyColumn()){
            launchModal();
            return;
        }
        if(diagonalValidation(mainDiagonal)){
            launchModal();
            return;
        }
        if(diagonalValidation(secondaryDiagonal)){
            launchModal();
            return;
        }
    }
})
$modal = document.getElementById('staticBackdrop');
function launchModal(){
    $modalTitle = document.getElementById('staticBackdropLabel');
    $modalTitle.innerHTML = whosTheWinner();   
    $modal.classList.add('show', 'd-block');
    $modal.setAttribute('aria-modal', 'true');
    $modal.setAttribute('role', 'dialog');
    $modal.removeAttribute('aria-hidden');
    document.body.classList.add('modal-open', 'overflow-hidden', 'pe-0');
}

$modalBtn = document.getElementById('modalBtn');
$modalBtn.addEventListener('click', e=>{
    $modal.classList.toggle('d-block');
    $modal.removeAttribute('aria-modal');
    $modal.removeAttribute('role');
    $modal.classList.toggle('show');    
})

//Let's create a function to draw the X icon
function drawAnX(element){
    //We create a variable to catch the clicked element and save into it
    let $clickedElement = element.target;
    
    //Now, we create an HTML element to store our X icon and save it
    //into a variable 
    let $img = document.createElement('img');
    //And we set its attributes src and a class
    $img.setAttribute('src', './img/XBrushedIcon.png');
    $img.setAttribute('class', 'img-width');
    $img.setAttribute('alt', 'X-icon');

    //And now we insert our created element as a child of the clicked element
    $clickedElement.appendChild($img);

    //now we can call this function when an element of the board is clicked
}

//And another one to draw the O icon
function drawAnO(element){
    //We create a variable to catch the clicked element and save into it
    let $clickedElement = element.target;
    
    //Now, we create an HTML element to store our X icon and save it
    //into a variable 
    let $img = document.createElement('img');
    //And we set its attributes src and a class
    $img.setAttribute('src', './img/OBrushedIcon.png');
    $img.setAttribute('class', 'img-width');
    $img.setAttribute('alt', 'O-Icon')

    //And now we insert our created element as a child of the clicked element
    $clickedElement.appendChild($img);

    //now we can call this function when an element of the board is clicked
}













//First code. To have an idea about how to work
/*playerOneTurn = true;
function XorOIcon(){
    if(playerOneTurn) {
        iconPath = './img/XBrushedIcon.png';
        playerOneTurn = false;
    }
    else{
        iconPath = './img/OBrushedIcon.png';
        playerOneTurn = true;
    }
    return iconPath;
}

function addIcon (e){
    imgSource= XorOIcon();
    imgToInsert = document.createElement('img');
    imgToInsert.src = imgSource;
    imgToInsert.classList.add('d-block', 'img-width');
    e.appendChild(imgToInsert);
}

function isAlreadyOccupied(HtmlElement){
    if(HtmlElement.srcElement.localName == 'img'){
        $spanTooltip = document.createElement('span');
        $spanTooltip.setAttribute('class', 'tooltip-content');
        $spanTooltip.innerHTML = 'This box is already taken. Pick another one :)';
        HtmlElement.target.before($spanTooltip)
        console.log(HtmlElement);
        
    }
    else{
        return console.log(false);
    }
}

$board = document.getElementById('board');

$board.addEventListener('click', (e)=>{
    $clickedElement = e.target;
    isAlreadyOccupied(e);
    addIcon($clickedElement);
});*/