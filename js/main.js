/* HERE WE GO AGAIN. OK LET'S SEE*/
//First I catch the board
const $board = document.getElementById('board');

//Then I add an event listener  to the board (click)
$board.addEventListener('click', e=>{
    drawAnO(e);
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