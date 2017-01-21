var turn = true;

var arr = new Array();          
for(var i = -3; i < 24 ; i++){          
	arr[i*25] = new Array();     
	for(var j = -3; j < 24; j++){      
		arr[i*25][j*25] = ""; 
	} 
}

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
	if (chess_x == 0 || chess_x == 500 || chess_y == 0 || chess_y == 500 || arr[chess_x][chess_y] !== ""){}
	else{
		if (turn == true){
			document.getElementById('message').innerHTML = '轮到白方了';
			black(chess_x,chess_y);
			turn = false;
		}
		else{
			document.getElementById('message').innerHTML = '轮到黑方了';
			white(chess_x,chess_y);
			turn = true;
		}
		console.log(arr);
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
	arr[chess_x][chess_y] = "white";
	check("white",chess_x,chess_y);
 }
function black(chess_x,chess_y){
	//黑棋
	cxt.beginPath();
	cxt.arc(chess_x,chess_y,12,0,360,false);
	cxt.lineWidth = 1;
	cxt.fillStyle = "#000";
	cxt.fill();
	cxt.strokeStyle = "#000";
	cxt.stroke();
	cxt.closePath();
	arr[chess_x][chess_y] = "black";
	check("black",chess_x,chess_y);
}

function check(s,x,y){
	var k=0;
	var arrx = x / 25;
	var arry = y / 25;
	//横
	for(var i = (arrx - 4); i < (arrx + 5); i++){
		if (arr[i*25][y] == s){
			k++;
			if (k == 5){
				document.getElementById('message').innerHTML = s + ' WIN!!!';
				break;
			}
		}
		else {
			k = 0;
		}
	}
	//竖
	for(var j = (arry - 4); j < (arry + 5); j++){
		if (arr[x][j*25] == s){
			k++;
			if (k == 5){
				document.getElementById('message').innerHTML = s + ' WIN!!!';
				break;
			}
		}
		else {
			k = 0;
		}
	}
	//斜45
	for(var i = -4; i < 5; i++){
		if (arr[x - (i * 25)][y + (i * 25)] == s){
			k++;
			if (k == 5){
				document.getElementById('message').innerHTML = s + ' WIN!!!';
				break;
			}
		}
		else {
			k = 0;
		}
	}
	//斜135
	for(var i = -4; i < 5; i++){
		if (arr[x + (i * 25)][y + (i * 25)] == s){
			k++;
			if (k == 5){
				document.getElementById('message').innerHTML = s + ' WIN!!!';
				break;
			}
		}
		else {
			k = 0;
		}
	}



	//竖
	// for(var i = 1; i < 20; i++){          
	// 	for(var j = 1; j < 20; j++){      
	// 		if (arr[i*25][j*25] == s){
	// 			k++;
	// 			if (k == 5){
	// 				document.getElementById('message').innerHTML = s + ' WIN!!!';
	// 			}
	// 		}
	// 		else {
	// 			k = 0;
	// 		}
	// 	} 
	// }
	// //横
	// for(var j = 1; j < 20 ; j++){          
	// 	for(var i = 1; i < 20; i++){      
	// 		if (arr[i*25][j*25] == s){
	// 			k++;
	// 			if (k == 5){
	// 				document.getElementById('message').innerHTML = s + ' WIN!!!';
	// 			}
	// 		}
	// 		else {
	// 			k = 0;
	// 		}
	// 	} 
	// }
	// //斜
	// for(var i = 1; i < 15; i++){

	// }
}