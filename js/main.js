/* HERE WE GO AGAIN. OK LET'S SEE*/
//First I catch the board
const $board = document.getElementById('board');

//Then I catch every box of the board in an array
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

// We verify Lines
//Rows
//console.log('Verificando Filas')
for(row in $boardArray){
    //We initialize a counter
    let rowItemCounter = 0;
    
    //Verifying rows
    for(column in $boardArray){
        //console.log('Fila: ' + row);
        //console.log('       Columna: ' + column);
        //If the element has a child, we add +1 to the counter    
        if($boardArray[row][column].childElementCount !=0){
            rowItemCounter++;
        }
    }
    
    //console.log('Mensaje antes de verificar fila ' + row)
    //If the counter equals 3, it means that the items in the whole row have a child
    if (rowItemCounter== 3){   
        //So we can verify if all the icons in the row are the same
        if (verifyRow(row)){
            //console.log('Fila Verificada!')
            break;
        }
        //console.log ('Mensaje despues de verificar fila ' + row);    
    }
    else{
        //console.log('Fila no verificada, vamos a la siguiente');
    }
}

//Columns
//console.log('Vericando columnas')
for(column in $boardArray){
    //Initialize a counter
    let columnItemCounter = 0;
    for(row in $boardArray){
        let columnItemCounter = 0;
        //Verifying Columns
        //console.log ('Columna: ' + column);
        //console.log('       Fila:' + row);
        //If the item has a child, we add +1 to the counter   
        if($boardArray[row][column].childElementCount !=0){
            columnItemCounter++;
        }
    }
    //console.log('Mensaje antes de verificar columna ' + column);
    //If the counter equals 3, it means that the items in the whole column have a child
    if(columnItemCounter==3){
        //So, we can check if all the children are the same
        if(verifyColumn(column)){
            //console.log('Columna Verificada!');
            break;
        }
        //console.log('Mensaje después de verificar columna' + column);
    }
    else{
        //console.log('Columna no verificada, vamos a la siguiente')
    }
}

//Diagonals
mainDiagonal = new Array(3);
secondaryDiagonal = new Array(3);

//We fill the elements on the principal diagonal
function createMainDiagonal(){
    for (let i=0; i<mainDiagonal.length; i++){
        mainDiagonal[i] = $boardArray[i][i];
    };
    
    console.log(mainDiagonal);
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
    console.log(secondaryDiagonal);
};

createSecondaryDiagonal();

//function for verify rows
function verifyRow(row){
    rowItem = [];
    for (i=0; i<3; i++){
        rowItem[i] = $boardArray[row][i].children[0].alt;
    }
    if(rowItem[0]==rowItem[1])
        return rowItem[1] == rowItem[2];
    else return false;
}

//function for verify columns
function verifyColumn(column){
    columnItem = [];
    for (i=0; i<3; i++){
        columnItem[i] = $boardArray[column][i].children[0].alt;
    }
    if(columnItem[0]==columnItem[1])
        return columnItem[1] == columnItem[2];
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

//Then I add an event listener  to the board (click)
$board.addEventListener('click', (e)=>{
    //console.log(isPlayerOneTurn);
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
    }
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