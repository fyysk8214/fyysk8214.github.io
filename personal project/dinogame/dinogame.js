/** @type {HTMLCanvasElement} */
var canvas=document.getElementById('game');
var ctx=canvas.getContext('2d');

let score;
let scoreText;
let highscore;
let highscoreText;
let dino;
let gravity;
let obstacles= [];
let gameSpeed;
let keys ={};
document.addEventListener('keydown',function(evt){
    keys[evt.code]=true;
});
document.addEventListener('keyup',function(evt){
    keys[evt.code]=false;
});

class Dino{
    constructor(x,y,w,h,c){
        this.x=x;
        this.y=y;
        this.w=w;
        this.h=h;
        this.c=c;

        this.dy=0;
        this.jumpForce=15;
        this.originalHeight=h;
        this.grounded=false;
        this.jumpTimer=0;
    }
    

    Draw(){
        var img=new Image()
        if((keys['shiftLeft']||keys['keyS'])&&this.grounded){
            img.src='image/dino_down.png'
            ctx.drawImage(img,this.x,this.y,this.w,this.h);
        }
        else{
            img.src='image/dino_up.png'
        ctx.drawImage(img,this.x,this.y,this.w,this.h);
        }
       
    }
    Jump(){
        if(this.grounded&&this.jumpTimer==0){
            this.jumpTimer=1;
            this.dy-this.jumpForce;
        }
        else if(this.jumpTimer>0&&this .jumpTimer<15){
            this.jumpTimer++;
            this.dy=-this.jumpForce-(this.jumpTimer/50);
        }
    }
    Animate(){
        if (keys['Space'] || keys['KeyW']) {
            this.Jump();
        }
        else {
            this.jumpTimer = 0;
        }

        if (keys['ShiftLeft'] || keys['KeyS']&&this.grounded) {
            this.y+=this.h/2;
            this.h = this.originalHeight / 2;
        }
        else {
            this.h = this.originalHeight;
        }

        this.y += this.dy;

        if(this.y+this.h<canvas.height){
            this.dy+=gravity;
            this.grounded=false;

        }
        else{
            this.dy=0;
            this.grounded=true;
            this.y=canvas.height-this.h;
        }
this.Draw();
}
}

class Obstacle{
    constructor(x,y,w,h,c){
        this.x=x;
        this.y=y;
        this.w=w;
        this.h=h;
        this.c=c;

        this.dx = -gameSpeed;
        this.isbird=false;
    }
    Update(){
        this.x +=this.dx;
        this.Draw();
        this.dx= -gameSpeed;
    }
    Draw(){
        var img=new Image()
        if(this.isbird==true){
            img.src='image/bird.png'
            ctx.drawImage(img,this.x,this.y,this.w,this.h);
        }
        else{
            img.src='image/catus.png'
            ctx.drawImage(img,this.x,this.y,this.w,this.h);
        }
    }
}

class Text {
    constructor(t,x,y,a,c,s){
        this.t=t;
        this.x=x;
        this.y=y;
        this.a=a;
        this.c=c;
        this.s=s;
    }

    Draw(){
        ctx.beginPath();
        ctx.fillStyle=this.c;
        ctx.font=this.s+"px sans-serif";
        ctx.textAlign=this.a;
        ctx.fillText(this.t,this.x,this.y);
        ctx.closePath();
    }
}

function SpawnObstacle() {
    let size=RandomIntInRange(20,70);
    let type=RandomIntInRange(0,1);
    let obstacle=new Obstacle(canvas.width+size,canvas.height-size,size,size,'#2484E4');
    if(type==1){
        obstacle.y-=dino.originalHeight-10;
        obstacle.isbird=true;
    }
    obstacles.push(obstacle);
}
function RandomIntInRange(min,max){
    return Math.round(Math.random()*(max-min)+min);
}
function Start(){
    canvas.width=window.innerWidth-20;
    canvas.height=window.innerHeight-20;
    
    ctx.font="20px sams-serif";

    gameSpeed=3;
    gravity=1;
    
    score=0;
    highscore=0;
    if(localStorage.getItem('highscore')){
        highscore=localStorage.getItem('highscore');
    }

    dino=new Dino(25,canvas.height-150,50,50,"#ffcdac");
    scoreText=new Text("Score: "+score,25,25,"left","212121","20");
    highscoreText=new Text("Highscore: "+highscore,canvas.width-25,25,"right","#212121","20");
    requestAnimationFrame(Update);
}

let intialSpawnTimer=200;
let spawnTimer=intialSpawnTimer;


function init(){
    obstacles=[];
    score=0;
    spawnTimer=intialSpawnTimer;
    gameSpeed=3;
    window.localStorage.setItem('highscore',highscore);
}

function Update(){
    requestAnimationFrame(Update);
    ctx.clearRect(0,0,canvas.width,canvas.height);
   dino.Animate();

   spawnTimer--;
   if(spawnTimer<=0){
    SpawnObstacle();
    console.log(obstacles);
    spawnTimer=intialSpawnTimer-gameSpeed*8;
    if(spawnTimer<60){
        spawnTimer=60;
    }
   }
   for(let i=0;i<obstacles.length;i++){
    let o=obstacles[i];
    if(o.x+o.w<0){
        obstacles.splice(i,1);
    }
    if(dino.x<o.x+o.w&&
        dino.x+dino.w>o.x&&
        dino.y<o.y+o.h&&
        dino.y+dino.h>o.y
        ){
            init();
        }
    o.Update();
   }
   
   score+=1;
   scoreText.t="Score"+score;
   if(score>highscore){
    highscore=score;
    highscoreText.t="Highscore: "+highscore;
   }
   scoreText.Draw();
   highscoreText.Draw();
   gameSpeed+=0.005;
}


Start();