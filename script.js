var canvas    = document.getElementById("scene");
var ctx       = canvas.getContext("2d");
var particles = [];

function drawScene(){

 canvas.width = png.width+100;
 canvas.height = png.height+100;
 canvas.addEventListener('mousemove', move, false);

 ctx.drawImage(png, 0, 0);

 var data = ctx.getImageData(0, 0, png.width, png.height);
 ctx.clearRect(0,0,canvas.width, canvas.height);

 for (var y = 0, y2 = data.height; y < y2; y=y+4) {
  for (var x = 0, x2 = data.width; x < x2; x=x+4) {
   if (data.data[(y * 4 * data.width) + (x * 4) + 3] > 128) {
    var particle = {
     x : x+100,
     y : y+100,
          y0: y+100,
          x0: x+100,
          xDelta: 0,
          yDelta: 0
    };
    particles.push(particle);
   }
  }
 }

    console.log(particles);
 ctx.fillStyle = "White";
  
  var renderStuff = setInterval(function() {
  ctx.clearRect(0,0,canvas.width, canvas.height);
 for(var i=0, j=particles.length;i<j;i++){
  var particle = particles[i];
   ctx.save();
    if(Math.sqrt(Math.pow(particle.x-particle.x0,2)+Math.pow(particle.y-particle.y0, 2)) > 1){
       particle.x += particle.xDelta/200;
       particle.y += particle.yDelta/200;
    }else{
       particle.x = particle.x0;
       particle.y =  particle.y0;
    }
  ctx.fillRect(particle.x, particle.y, 2, 2);
 }
  }, 1);

}

var png = new Image();
png.onload = drawScene;
png.src = "img/png.png";

var offsetX = canvas.offsetLeft;
var offsetY = canvas.offsetTop;
    
function doMouseOver(e){
 mouseX = parseInt(e.clientX - offsetX);
    mouseY = parseInt(e.clientY - offsetY);
 ctx.clearRect(0,0,canvas.width, canvas.height);
 for(var i=0, j=particles.length;i<j;i++){
  var xDistance = particles[i].x - mouseX;
     var yDistance = particles[i].y - mouseY;
     var distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);
     angle = Math.atan2(yDistance,xDistance);
     particles[i].x += Math.cos(angle) * 10;
      particles[i].y += Math.sin(angle) * 10;
   ctx.fillRect(particles[i].x, particles[i].y, 2, 2);
 }
}
function move(e){

 mouseX = parseInt(e.clientX - offsetX);
  mouseY = parseInt(e.clientY - offsetY);

 for(var i=0, j=particles.length;i<j;i++){
     var xDistance = particles[i].x - mouseX;
     var yDistance = particles[i].y - mouseY;
     var distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);

    if (distance < 20) {
      angle = Math.atan2(yDistance,xDistance);
      particles[i].x += Math.cos(angle) * distance;
      particles[i].y += Math.sin(angle) * distance;

      particles[i].yDelta = particles[i].y0 - particles[i].y;
      particles[i].xDelta = particles[i].x0 - particles[i].x;
    }
     
 }
}
