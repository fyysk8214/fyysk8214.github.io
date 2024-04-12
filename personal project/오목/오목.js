const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

let map = Array.from(Array(19), () => Array(19).fill(0));

let white=1;
let black=2;

let lastcolor;//놓은 돌 색
let long;//이어진 돌의수

let turn=0;//턴수

document.addEventListener('click',(e)=>{
    let x=parseInt(Math.round((e.clientX-(20 + (canvas.width-760)/2))/40));
    let y=parseInt(Math.round((e.clientY-(20 + (canvas.height-760)/2))/40));

    //console.log(x+","+y);

    if(map[x][y]!=white && map[x][y]!=black) {
        if(turn%2==0){
            map[x][y]=white;
            lastcolor=white;
            turn++;
        }
        else {
            map[x][y]=black;
            lastcolor=black;
            turn++;
        }

        long=check(x,y,lastcolor);
        if(long>=4){
            if(lastcolor==white){
                alert("white wins");
                clearMap();
            }
            else{
                alert("black wins");
                clearMap();
            }
        }
    }
});


let curX = 0;
let curY = 0;

document.addEventListener('mousemove',(e)=>{
    let x=parseInt(Math.round((e.clientX-(20 + (canvas.width-760)/2))/40));
    let y=parseInt(Math.round((e.clientY-(20 + (canvas.height-760)/2))/40));
    
    console.log(curX+","+curY);
    if(map[curX][curY] != white && map[curX][curY] != black) {
        map[curX][curY] = 0;
    }
    
    if(map[x][y]==0) {
        if(turn%2==0){
            map[x][y]=3;
        }
        else {
            map[x][y]=4;
        }
        curX = x;
        curY = y;
    }
});

function Start() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.font = '20px sans-serif';
    requestAnimationFrame(Update);
}

function Update() {
    requestAnimationFrame(Update);
    //ctx.clearRect(0, 0, canvas.width, canvas.height);

    let bg = new Image();
    bg.src = "리소스/background.png";
    ctx.drawImage(bg, (canvas.width-760)/2, (canvas.height-760)/2, 760, 760);

    mapDraw();
}

function mapDraw() {
    for(let x = 0; x < 19; x++) {
        for(let y = 0; y < 19; y++) {
            if(map[x][y] == white) {
                ctx.beginPath();
                ctx.fillStyle = "white";
                ctx.globalAlpha=1; 
                ctx.arc(x*40 + 20 + (canvas.width-760)/2, y*40 + 20 + (canvas.height-760)/2, 18, 0, Math.PI * 2);
                ctx.fill();
                ctx.closePath();
            }
            if(map[x][y] == black) {
                ctx.beginPath();
                ctx.fillStyle = "black";
                ctx.globalAlpha=1; 
                ctx.arc(x*40 + 20 + (canvas.width-760)/2, y*40 + 20 + (canvas.height-760)/2, 18, 0, Math.PI * 2);
                ctx.fill();
                ctx.closePath();
            }
            if(map[x][y] == 3) {
                ctx.beginPath();
                ctx.fillStyle = "white";
                ctx.globalAlpha=0.7;
                ctx.arc(x*40 + 20 + (canvas.width-760)/2, y*40 + 20 + (canvas.height-760)/2, 18, 0, Math.PI * 2);
                ctx.fill();
                ctx.closePath();
            }
            if(map[x][y] == 4) {
                ctx.beginPath();
                ctx.fillStyle = "black";
                ctx.globalAlpha=0.5; 
                ctx.arc(x*40 + 20 + (canvas.width-760)/2, y*40 + 20 + (canvas.height-760)/2, 18, 0, Math.PI * 2);
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function check(x,y,lastcolor){
    let N=0,E=0,S=0,W=0,NE=0,SE=0,SW=0,NW=0;//방향
    for(let i=1;x-i>=0;i++){
        if(map[x-i][y]==lastcolor){
            N++;
        }
        else{
            break;
        }
    }
    for(let i=1;x+i<=18;i++){
        if(map[x+i][y]==lastcolor){
            S++;
        }
        else{
            break;
        }
    }
    for(let i=1;y-i>=0;i++){
        if(map[x][y-i]==lastcolor){
            W++;
        }
        else{
            break;
        }
    }
    for(let i=1;x+i<=18;i++){
        if(map[x][y+i]==lastcolor){
            E++;
        }
        else{
            break;
        }
    }
    for(let i=1;x-i>=0&&y+i<=18;i++){
        if(map[x-i][y+i]==lastcolor){
            NE++;
        }
        else{
            break;
        }
    }
    for(let i=1;x+i<=18&&y+i<=18;i++){
        if(map[x+i][y+i]==lastcolor){
            SE++;
        }
        else{
            break;
        }
    }
    for(let i=1;x-i>=0&&y-i>=0;i++){
        if(map[x+i][y-i]==lastcolor){
            SW++;
        }
        else{
            break;
        }
    }
    for(let i=1;x-i>=0&&y-i>=0;i++){
        if(map[x-i][y-i]==lastcolor){
            NW++;
        }
        else{
            break;
        }
    }
    let maxlong;
    let row=W+E;
    let column=N+S;
    let down=NW+SE;
    let up=SW+NE;
    maxlong=(((row>column)?row:column)>((down>up)?down:up))?((row>column)?row:column):((down>up)?down:up);//최대 길이
    return maxlong;
}

function clearMap(){
    for(let i=0;i<=18;i++){
        for(let j=0;j<=18;j++){
            map[i][j]=0;
        }
    }
}

Start();