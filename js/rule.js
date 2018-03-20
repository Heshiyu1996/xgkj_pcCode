// JavaScript Document
window.onload=function(){
    /*鍙嬫儏閾炬帴婊氬姩*/
    var oRoll= document.getElementById('roll');
    var oUl=oRoll.getElementsByTagName('ul')[0];
    var oli=oUl.getElementsByTagName('li');
    var aBtn=oRoll.getElementsByTagName('a');
    var oSpeed=-1
    oUl.innerHTML+=oUl.innerHTML;
    oUl.style.width=oli[0].offsetWidth*oli.length+'px';
    var timer=null
    timer=setInterval(function(){
        oUl.style.left=oUl.offsetLeft+oSpeed+'px';
        if(oUl.offsetLeft<-oUl.offsetWidth/2){
            oUl.style.left='0px';
        }
        else if(oUl.offsetLeft>0)
        {
            oUl.style.left=-oUl.offsetWidth/2+'px';
        };
    },30);
    aBtn[0].onclick= function(){
        oSpeed=-1;
    };
    aBtn[1].onclick= function(){
        oSpeed=1;
    }
    oUl.onmouseover=function(){
        clearInterval(timer);
    }
    oUl.onmouseout=function(){
        timer=setInterval(function(){
            oUl.style.left=oUl.offsetLeft+oSpeed+'px';
            if(oUl.offsetLeft<-oUl.offsetWidth/2){
                oUl.style.left='0px';
            }
            else if(oUl.offsetLeft>0)
            {
                oUl.style.left=-oUl.offsetWidth/2+'px';
            }
        },30);
    }
}// JavaScript Document