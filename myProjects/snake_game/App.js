// javascript code goes here
const container= document.getElementById("gameContainer");
const mgamecontainer= document.getElementById("mgameContainer");
const height=document.getElementById('height');
const width=document.getElementById('width');
const speed=document.getElementsByClassName('speed');
const maincontainer=document.getElementById('maincontainer');
const mcontainer=document.getElementById('mcontainer');
const arr=[];
let l=40;
let b=40;
let food;
let pixelId;
let time=100;
let length=5;
let tintrvl;
let direction='right';
let isLargescreen=true;
let snakeContainer;
let snakeBody=[1,2,3,4,5];
btn.addEventListener('click',reset);
const increaseSpeed = () => {
    time=time - 2 *(time > 50);
    clearInterval(tintrvl);
    tintrvl=setInterval(update,time);
}
const debounce=control();
function reset(){
    document.getElementById('over').style.display='none';
    arr.length=0;
    length=5;
    direction='right';
    let id=window.setInterval(() => {}, 0);
    while(id--){
        window.clearInterval(id);
    }
    crteGame();
}
function crteGame(){
    snakeBody=[1,2,3,4,5];
    if(isLargescreen){
        container.innerHTML='';
        document.getElementById('pointsEarned').textContent=0;
        l=parseInt(height.value);
        b=parseInt(width.value);
        container.style.width=b*.625+'rem';
        container.style.height=l*.625+'rem';
        time=200-speed[0].value;
        container.style.gridTemplateColumns=`repeat(${b},.625rem)`;
        container.style.gridTemplateRows=`repeat(${l},.625rem)`;
        // pixelId=parseInt(l/2);
        pixelId=5;
        for(let i=1;i<=l*b;i++){
            const div=document.createElement("div");
            div.id="pixel"+i;
            div.className="pixel";
            arr.push(i);
            container.append(div);
        }
    }
    else{
        mgamecontainer.innerHTML='';
        l=parseInt(height.value);
        b=parseInt(width.value);
        document.getElementById('mscore').textContent='Score: 0';
        mgamecontainer.style.width=screen.width+'px';
        mgamecontainer.style.height=screen.width+'px';
        time=200-speed[1].value;
        mgamecontainer.style.gridTemplateColumns=`repeat(${b},1fr)`;
        mgamecontainer.style.gridTemplateRows=`repeat(${l},1fr)`;
        // pixelId=parseInt(l/2);
        pixelId=5;
        for(let i=1;i<=l*b;i++){
            const div=document.createElement("div");
            div.id="pixel"+i;
            div.className="pixel";
            arr.push(i);
            mgamecontainer.append(div);
        }
    }
    snakeContainer=document.getElementsByClassName('pixel');
    arr.splice(pixelId-1,5);
    placeFood();
    document.getElementById(`pixel${food}`).className="food pixel";
    //document.getElementById("pixel800").className="snakeBodyPixel";
    document.addEventListener("keydown", debounce);
    tintrvl=setInterval(update,time);
}
function placeFood() {
    const indx = Math.floor(Math.random() * (arr.length-1));
    food=arr[indx];
}
function update(){
    let isEaten=false;
    if(pixelId==food) {
        isEaten=true;
        length++;
        if(isLargescreen) document.getElementById('pointsEarned').textContent=length-5;
        else document.getElementById('mscore').textContent=`Score: ${length-5}`;
        placeFood();
        document.getElementById(`pixel${food}`).className="food pixel";
        increaseSpeed();
    }
    let pxl;
    if(direction=='left') {
        if(pixelId%b==1) pixelId=pixelId+b-1;
        else pixelId=pixelId-1;
        pxl=document.getElementById(`pixel${pixelId}`);
        if(pxl.className.includes('snakeBodyPixel')) {
            gameOver();
            return;
        }
        snakeBody.push(pixelId);
    }
    if(direction=='up'){
        if(pixelId>=1 && pixelId<=b) pixelId=pixelId+l*b-b;
        else pixelId=pixelId-b;
        pxl=document.getElementById(`pixel${pixelId}`);
        if(pxl.className.includes('snakeBodyPixel')) {
            gameOver();
            return;
        }
        snakeBody.push(pixelId);
    }
    if(direction=='down'){
        if(pixelId>=l*b-b+1 && pixelId<=l*b) pixelId=pixelId-(l*b-b);
        else pixelId=pixelId+b;
        pxl=document.getElementById(`pixel${pixelId}`);
        if(pxl.className.includes('snakeBodyPixel')) {
            gameOver();
            return;
        }
        snakeBody.push(pixelId);
    }
    if(direction=='right'){
        if(pixelId%b==0) pixelId=pixelId-(b-1);
        else pixelId=pixelId+1;
        pxl=document.getElementById(`pixel${pixelId}`);
        if(pxl.className.includes('snakeBodyPixel')) {
            gameOver();
            return;
        }
        snakeBody.push(pixelId);
    }

    for(const ele of snakeContainer){
        if(ele.className.includes('food')) ele.className='food pixel';
        else ele.className="pixel";
    }
    for(let i=0;i<snakeBody.length;i++){
        if(i===snakeBody.length-1) snakeContainer[snakeBody[i]-1].className="front pixel";
        else snakeContainer[snakeBody[i]-1].className="snakeBodyPixel pixel";
    }

    if(!isEaten) arr.push(snakeBody.shift()); 
    const index=arr.indexOf(pixelId);
    arr.splice(index,1);
}
function control(){
    let tmr;
    return (e)=>{
        clearTimeout(tmr);
        tmr=setTimeout(()=>{
            clearTimeout(tmr);
            changeDirection(e)
        },time);
    }
}
function changeDirection(e) {
    if (e.code == "ArrowUp" && direction!='down') {
        direction='up';
    }
    else if (e.code == "ArrowDown" && direction!='up') {
        direction='down';
    }
    else if (e.code == "ArrowLeft" && direction!='right' ) {
        direction='left';
    }
    else if (e.code == "ArrowRight" && direction!='left') {
        direction='right';
    }
}
function gameOver(){
    clearInterval(tintrvl);
    document.getElementById('over').style.display='block';
}
document.getElementById('start').addEventListener('click',start);
function start(){
    height.value=40;
    width.value=40;
    if(isLargescreen) speed[0].value=100;
    else speed[1].value=100;
    reset();
}
const x = window.matchMedia("(max-width: 480px)");
function myFunction(x) {
    if (x.matches) {
      maincontainer.style.display='none';
      mcontainer.style.display='block';
      isLargescreen=false;
      start();
    } else {
      maincontainer.style.display='grid';
      mcontainer.style.display='none';
      isLargescreen=true;
      start();
    }
  }
myFunction(x);
document.getElementById('setSpeed').addEventListener('click',reset);
document.getElementById('newGame').addEventListener('click',start);
document.getElementById('upb').addEventListener('click',()=>{
    const obj={code:"ArrowUp"}
    debounce(obj);
});
document.getElementById('leftb').addEventListener('click',()=>{
    const obj={code:"ArrowLeft"}
    debounce(obj);
});
document.getElementById('rightb').addEventListener('click',()=>{
    const obj={code:"ArrowRight"}
    debounce(obj);
});
document.getElementById('downb').addEventListener('click',()=>{
    const obj={code:"ArrowDown"}
    debounce(obj);
});