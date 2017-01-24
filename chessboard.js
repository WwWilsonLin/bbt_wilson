var turn = "b";
var n = 0;  //记录落子个数
var winner = "";
var storage = [];

var arr = new Array();          
function clean(){
	for(var i = -3; i < 24 ; i++){          
		arr[i*25] = new Array();     
		for(var j = -3; j < 24; j++){      
			arr[i*25][j*25] = ""; 
		} 
	}
}
clean();

var canvas = document.getElementById("chessboard");
var cxt = canvas.getContext("2d");
//打印棋盘
function print(){
	for (var i = 0; i < 21; i++) {
		cxt.beginPath();
		cxt.moveTo(i*25 ,  0 );
		cxt.lineTo(i*25 , 500);
		cxt.lineTo(i*25 ,  0 );
		cxt.lineTo(i*25 , 500);
		cxt.moveTo( 0 , i*25);
		cxt.lineTo(500, i*25);
		cxt.moveTo( 0 , i*25);
		cxt.lineTo(500, i*25);
		cxt.stroke();
	}
}
print();
//落子
canvas.onclick = function(e){
 	e = e || window.event;
 	//获取坐标
 	var rect = canvas.getBoundingClientRect();   
 	var x = e.clientX - rect.left * (canvas.width / rect.width);
    var y = e.clientY - rect.top * (canvas.height / rect.height);
	var chess_x = Math.round(x/25) * 25;
	var chess_y = Math.round(y/25) * 25;

	if (chess_x == 0 || chess_x == 500 || chess_y == 0 || chess_y == 500 || arr[chess_x][chess_y] !== "" || winner !== ""){}
	else{
		if (turn == "w"){
			document.getElementById('message').innerHTML = '轮到黑方了';
			chess("white",chess_x,chess_y);
			check("white",chess_x,chess_y);
			n++;
			turn = "b";
		}
		else{
			document.getElementById('message').innerHTML = '轮到白方了';
			chess("black",chess_x,chess_y);
			check("black",chess_x,chess_y);
			n++;
			turn = "w";
		}
	} 
}
//打印棋子
function chess(s,chess_x,chess_y){	
	cxt.beginPath();
	cxt.arc(chess_x,chess_y,12,0,360,false);
	cxt.lineWidth = 1;
	if (s == "white"){
		cxt.fillStyle = "#FFF";
	}
	else if (s == "black"){
		cxt.fillStyle = "#000";
	}
	cxt.fill();
	cxt.strokeStyle = "#000";
	cxt.stroke();
	cxt.closePath();
	arr[chess_x][chess_y] = s;
	store(n,s,chess_x,chess_y);
}

//胜负判定
function check(s,x,y){
	var k=0;
	var arrx = x / 25;
	var arry = y / 25;
	//横
	for(var i = (arrx - 4); i < (arrx + 5); i++){
		if (arr[i*25][y] == s){
			k++;
			if (k == 5){
				win(s);
				break;
			}
		}
		else {
			k = 0;
		}
	}
	//竖
	k = 0;
	for(var j = (arry - 4); j < (arry + 5); j++){
		if (arr[x][j*25] == s){
			k++;
			if (k == 5){
				win(s);
				break;
			}
		}
		else {
			k = 0;
		}
	}
	//斜45
	k = 0;
	for(var i = -4; i < 5; i++){
		if (arr[x - (i * 25)][y + (i * 25)] == s){
			k++;
			if (k == 5){
				win(s);
				break;
			}
		}
		else {
			k = 0;
		}
	}
	//斜135
	k = 0;
	for(var i = -4; i < 5; i++){
		if (arr[x + (i * 25)][y + (i * 25)] == s){
			k++;
			if (k == 5){
				win(s);
				break;
			}
		}
		else {
			k = 0;
		}
	}
}
function win(s){
	winner = s;
	if (s == "white"){
		document.getElementById('message').innerHTML = "白方赢了!!!";
	}
	else if (s == "black"){
		document.getElementById('message').innerHTML = "黑方赢了!!!";
	}
}
//存储
function store(n,s,chess_x,chess_y){
	storage[n] = {
		x : chess_x,
		y : chess_y,
		who : s
	}
}
//本地存储
var save = document.getElementById("save");
var read = document.getElementById("read");
save.onclick = function(){
	localStorage.storage = JSON.stringify(storage);
	localStorage.n = n;
	localStorage.turn = turn;
}
read.onclick = function(){
	//读档
	storage = JSON.parse(localStorage.storage || JSON.stringify([]));//如果没有本地存储怎么搞？
	n = localStorage.n;
	if (isNaN(n)){
		n = 0;
	}
	turn = localStorage.turn || "b";
	//清空棋盘
	cxt.clearRect(0, 0, 500, 500);
	print();
	clean();

	if (turn == "w"){
		document.getElementById('message').innerHTML = '轮到白方了';
	}
	else {
		document.getElementById('message').innerHTML = '轮到黑方了';
	}
	console.log(storage);
	for (var i = 0; i < n; i++){
		arr[storage[i]["x"]][storage[i]["y"]] = storage[i]["who"];
		if (storage[i]["who"] == "black"){
			black(storage[i]["x"],storage[i]["y"]);
		}
		else if (storage[i]["who"] == "white"){
			white(storage[i]["x"],storage[i]["y"]);
		}
	}
	console.log(arr);
}
var newg = document.getElementById("new");
newg.onclick = function(){
	window.location = "五子棋.html"
}