var c = document.createElement("canvas");
c.id = "foobar";
c.width = 200; c.height = 100;
c.style.border = "1px solid black";
document.body.appendChild(c);
var ctx = c.getContext("2d");
ctx.fillStyle = "#00FF00";
ctx.fillRect(0, 0, 150, 75);
