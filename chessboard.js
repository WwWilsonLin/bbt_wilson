var turn = true;
var canvas = document.getElementById("chessboard");
var cxt = canvas.getContext("2d");
for (var i = 0; i < 21; i++) {
	cxt.moveTo(i*25 , 0);
	cxt.lineTo(i*25 , 500);
	cxt.moveTo(0 , i*25);
	cxt.lineTo(500 , i*25);
	cxt.stroke();
}
 canvas.onclick = function(e){
 	e = e || window.event;
 	var rect = canvas.getBoundingClientRect();   
 	var x = e.clientX - rect.left * (canvas.width / rect.width);
    var y = e.clientY - rect.top * (canvas.height / rect.height);
	//console.log(x);console.log(y);
	var chess_x = Math.round(x/25) * 25;
	var chess_y = Math.round(y/25) * 25;
	//console.log(chess_x);console.log(chess_y);
	if (turn == true){
		black(chess_x,chess_y);
		turn = false;
	}
	else{
		white(chess_x,chess_y);
		turn = true;
	}
 }
 function white(chess_x,chess_y){
 	//白棋
	cxt.beginPath();
	cxt.arc(chess_x,chess_y,12,0,360,false);
	cxt.lineWidth=1;
	cxt.fillStyle="#FFF";
	cxt.fill();
	cxt.strokeStyle="#000";
	cxt.stroke();
	cxt.closePath();
 }
function black(chess_x,chess_y){
	//黑棋
	cxt.beginPath();
	cxt.arc(chess_x,chess_y,12,0,360,false);
	cxt.lineWidth=1;
	cxt.fillStyle="#000";
	cxt.fill();
	cxt.strokeStyle="#000";
	cxt.stroke();
	cxt.closePath();
}
	