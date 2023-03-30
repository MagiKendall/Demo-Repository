//code: myself
//music: myself
//inspiration: Dan Shiffman Cube Wave: https://www.youtube.com/watch?v=H81Tdrmz2LA

let angle=0;
let w=15;
let ma;
let maxD;
var maxDD;
var amp;
let hours;
let minutes;
let seconds;
let myFont;
let cnv;
let dl1=50;
let dl2=50;
let dl3=50;

function preload() {
  myFont = loadFont('SFCompactRounded.ttf');
  song=loadSound('loop1.mp3')
}

function setup() {
  cnv=createCanvas(300,300,WEBGL);
  cnv.mouseClicked(psong);
  cnv.mousePressed(rd);
  
  ma=atan(cos(QUARTER_PI));
  maxD=10000;
  
  textFont(myFont);
  song.play();
  amp=new p5.Amplitude();
}


function updateTime() {
  hours = hour();
  if (hours > 12) {
    hours = hours - 12;
  }
  minutes = minute();
  seconds=second();
}


function drawTextClock() {
  fill(0);
  let textX = -80;
  let textY = -150;
  text(hours+":"+minutes+":"+seconds, mouseX-width/2, mouseY-height/2);
  textSize(50);
}

function mousePressed(){}
function mouseClicked(){}

function psong(){
  if(song.isPlaying()){
    song.pause();
    
  }
  else{
    song.play();
  }
}

function rd(){
  dl1=random(0,255);
  dl2=random(0,255);
  dl3=random(0,255);
}

function draw() {
  updateTime();
  background(255);
  drawTextClock(); 
  var vol=amp.getLevel();
  maxDD=maxD*vol;
  if(vol==0){
    maxDD=500;
  }
  push();
  ortho(-400,400,400,-400,0,1000);
  directionalLight(dl1,dl2,dl3,0,-1,0);
  directionalLight(dl2,dl1,dl3,0,1,0);
  directionalLight(dl3,dl2,dl1,1,0,0);
  noStroke();
  rotateX(-ma);
  rotateY(-QUARTER_PI*seconds*0.1);
   
  let offset=0;
  for(let y=0;y<height;y+=w){
    for(let x=0; x<width; x+=w){
      push();
      let d=dist(x,y,width/2,height/2);
      let offset=map(d,0,maxDD,-PI,PI);
      var a=angle+offset;
      h=floor(map(sin(a),-1,1,0,mouseY*0.3));
      translate(x-width/2,0,y-height/2);
      ambientMaterial(255);
      sphere(h);
      pop();
      }
  }
  pop();
  angle+=seconds*0.004;
  
}

