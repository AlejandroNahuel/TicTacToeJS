/* HERE WE GO AGAIN. OK LET'S SEE*/
//First I catch the board
const $board = document.getElementById('board');
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