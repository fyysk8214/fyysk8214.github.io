let clicker=document.getElementById("clicker");
let reset=document.getElementById("time");
var clicktime=0;
var timeset=5;
clicker.addEventListener("click", () => {
    clicktime+=1;
    clicker.innerText="클릭 횠수 : "+clicktime
    if(clicktime==1){
        setTimeout(function(){
    alert("cps:"+clicktime/timeset);
    clicktime=0;
    clicker.innerText="클릭 횠수 : "+clicktime
 },timeset*1000)
    }
});

pl.addEventListener("click", () => {
    if(timeset<10){
        timeset+=1;
    }
    time.innerText="시간 : " +timeset
 });
 
 mi.addEventListener("click", () => {
    if(timeset>=2){
        timeset-=1;
    }
    time.innerText="시간 : " +timeset
 });
