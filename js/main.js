var zuoBiao;
var dirs = new Array("up", "dom", "left", "right");
var dir = dirs[1];
var divs;
var mov = false;
var isEnd = true;
var startBtn;
var m;
var endDiv;

function main() {
    /*0-15,16-31,32-47,48-63,
    63-79,80-95,95-111,112-127,
    128-143,144-159,160-175,176-191
    192-207.208-223,224-239,240-255;
    */
    divs = document.getElementsByClassName("grid-cell");
    endDiv=document.getElementById("End");
    zuoBiao = new Array();
    //控制方向
    control();
    move();
}
//移动并检查是否死亡
function move() {
    if (isEnd) {
        return;
    }
    mov = true;
    var head = zuoBiao[zuoBiao.length - 1];
    divs[zuoBiao[0]].style.backgroundColor = "#ffffff";//令尾巴等于白色（即 移除）
    //检查是否撞到身体；
    for (var j = 0; j < zuoBiao.length - 1; j++) {
        if (head == zuoBiao[j]) {
            isEnd = true;
            endDiv.style.display="block";
        }
    }
    var isEat=isEatEgg();
    //删除尾巴方法
    function deleteTail() {
        if (!isEat) {
            zuoBiao.shift();
        }
    }

    switch (dir) {
        case dirs[0]:
            deleteTail();
            if (head - 16 < 0) {
                endDiv.style.display="block";
                isEnd = true;
                break;
            }
            zuoBiao.push(head - 16);
            break;
        case dirs[1]:
            deleteTail();
            if (head + 16 > 255) {
                endDiv.style.display="block";
                isEnd = true;
                break;
            }
            zuoBiao.push(head + 16);
            break;
        case dirs[2]:
            deleteTail();
            if ((head + 1) % 16 == 0) {
                endDiv.style.display="block";
                isEnd = true;
                break;
            }
            zuoBiao.push(head + 1);
            break;
        case dirs[3]:
            deleteTail();
            if (head % 16 == 0) {
                endDiv.style.display="block";
                isEnd = true;
                break;
            }
            zuoBiao.push(head - 1);
            break;
        default:
            break;
    }
    //显示
    for (var i = 0; i < zuoBiao.length; i++) {
        divs[zuoBiao[i]].style.backgroundColor = "#000000";
    }
    if (!isEnd) {
        m=setTimeout("move()", 300);
    }
}
//控制方向
function control() {
    document.onkeydown = function (e) {
        if (mov == false) {
            return;
        }//mov的作用：只用第一次输入的方向
        mov = false;

        switch (e.keyCode) {
            case 38:
                if (dir != dirs[1]) dir = dirs[0];
                break;
            case 40:
                if (dir != dirs[0]) dir = dirs[1];
                break;
            case 39:
                if (dir != dirs[3]) dir = dirs[2];
                break;
            case 37:
                if (dir != dirs[2]) dir = dirs[3];
                break
            default:
                break;
        }
    };
}
//开始游戏
function start() {
    startBtn = document.getElementById("btn");
    startBtn.onclick = function () {
        endDiv.style.display="none";
        clearTimeout(m);//关闭上一个定时器
        for(var i=0;i<zuoBiao.length;i++){//清空原来的蛇身
            divs[zuoBiao[i]].style.backgroundColor="#ffffff";
        }
        zuoBiao.splice(0, zuoBiao.length );//清空原来的蛇身坐标
        for(var i=0;i<divs.length;i++){//清除原来的鸡蛋
            if(divs[i].hasChildNodes()){
                divs[i].innerHTML="";
            }
        }
        Egg();
        var x=parseInt(Math.random() * 140 + 33);
        zuoBiao.push(x,x+1,x+2);//随机生成三节身体
        isEnd=false;
        dir = dirs[1];//反向向下
        move();
    }
}
//加载初始方法的方法
function AddLoadEvent(func) {
    var d = window.onload;
    if (typeof window.onload != 'function') {
        window.onload=func;
    }else{
        window.onload=function () {
            d();
            func();
        }
    }
}
//随机生成鸡蛋的方法
function Egg() {
    divs[parseInt(Math.random() * 140 + 33)].innerHTML="●";
}
//是否吃到鸡蛋
function isEatEgg(){
    for(var i=0;i<zuoBiao.length;i++){
        if(divs[zuoBiao[i]].hasChildNodes()){
            Egg();
            divs[zuoBiao[i]].innerHTML="";
            return true;
        }
    }
    return false;
}
AddLoadEvent(main);
AddLoadEvent(start);