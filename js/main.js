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
for(row in $boardArray){
    let rowItemCounter = 0;
    let columnItemCounter = 0;
    
    for(column in $boardArray){
        //Verifying rows
        console.log('Fila: ' + row);
        console.log('       Columna: ' + column)     
        if($boardArray[row][column].childElementCount !=0){
            rowItemCounter++;
        }
        if (rowItemCounter== 3){
            console.log('Mensaje antes de verificar fila ' + row)   
            if (verifyRow(row)){
                console.log('Fila Verificada!')
                break;
            }
            console.log ('Mensaje despues de verificar fila ' + row);    
        }

        //Verifying Columns
        console.log ('Columna: ' + column);
        console.log('       Fila:' + row)     
        if($boardArray[column][row].childElementCount !=0){
            columnItemCounter++;
        }
        if(columnItemCounter==3){
            console.log('Mensaje antes de verificar columna ' + column);
            if(verifyColumn(column)) break;
            console.log('Mensaje después de verificar columna' + column)
        }
    }
}

function verifyRow(row){
    rowItem = [];
    for (i=0; i<3; i++){
        rowItem[i] = $boardArray[row][i].children[0].alt;
    }
    if(rowItem[0]==rowItem[1])
        return rowItem[1] == rowItem[2];
    else return false;
}

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