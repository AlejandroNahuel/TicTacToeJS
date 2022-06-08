playerOneTurn = true;
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
});