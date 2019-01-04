/*
* @Author: dell
* @Date:   2018-12-22 15:53:10
* @Last Modified by:   dell
* @Last Modified time: 2018-12-29 20:22:09
*/
function getStyle(obj,style){
	if(obj.currentStyle){
		return obj.currentStyle[style];
	}
	else{
		return getComputedStyle(obj,null)[style];
	}
}
// 轮播图
function animate(obj,json,callback){
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var stop=true;
		for(var key in json){
			var now=0;
			if(key=='opacity'){
				now=parseInt(getStyle(obj,key)*100);
			}
			else{
				now=parseInt(getStyle(obj,key));
			}
			var speed=(json[key]-now)/8;
			speed=speed>0 ? Math.ceil(speed) : Math.floor(speed);
			var cur=now + speed;
			if(key=='opacity'){
				obj.style[key]=cur/100;
			}
			else{
				obj.style[key]=cur+'px';
			}				
			if(json[key]!==cur){
				stop=false;
			}
		}
		if(stop){
			clearInterval(obj.timer);
			callback && callback();
		}
	},30);
}
function navmove(){
	for(var i=0;i<lists.length;i++){
		lists[i].className=" ";
	}
	if(index>6){
		lists[0].className="active";
	}
	else if(index<=0){
		lists[5].className="active";
	}
	else{
		lists[index-1].className="active";
	}
}
function next(){
	if(isMoving){
		return ;
	}
	index++;
	navmove();
	isMoving=true;
	animate(slider,{left:-800*index},function(){
		if(index==7){
			index = 1;
			slider.style.left = '-800px';			
		}
		isMoving=false;
	});
}
function pre(){
	if(isMoving){
		return ;
	}
	index--;
	navmove();
	isMoving=true;
	animate(slider,{left:-800*index},function(){
		if(index==0){
			index=6;
			slider.style.left='-4800px';
		}
		isMoving=false;
	})
}
// 公告栏
function animate1(){
	timer1=setInterval(function(){
		var now=(parseInt(getStyle(middley,'top')));
		if(now==-377){
			now=0;
		}
		var cur=now-1;
		middley.style.top=cur+'px';
	},12)
}
// 右边浮动框
function animate2(obj){
	if(obj.index1){
		clearInterval(obj.timer1);
	}
	clearInterval(obj.timer);
	obj.index=true;
	obj.timer=setInterval(function(){
		var now=(parseInt(getStyle(obj,'right')));
		if(now==0){
			clearInterval(obj.timer);
			obj.index=false;
		}
		else{
			var cur=now+1;
			obj.style.right=cur+'px';
		}
	},3)
}
function animate3(obj){
	if(obj.index){
		clearInterval(obj.timer);
	}
	clearInterval(obj.timer1);
	obj.index1=true;
	obj.timer1=setInterval(function(){
		var now=(parseInt(getStyle(obj,'right')));
		if(now==-80){
			clearInterval(obj.timer1);
			obj.index1=false;
		}
		else{
			var cur=now-1;
			obj.style.right=cur+'px';
		}
	},3)
}