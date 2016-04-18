function startmarquee(element,lh,speed,delay) {
    //滚动属性(类型,滚动高度,速度,延迟)
    var p=false;
    var t;
    var o=$(element)[0];
    o.innerHTML+=o.innerHTML;
    o.style.marginTop=0;

    function start(){
        t=setInterval(scrolling,speed);
        if(!p) o.style.marginTop=parseInt(o.style.marginTop)-1+"px";
    }

    function scrolling(){
        if(parseInt(o.style.marginTop)%lh!=0){
            o.style.marginTop=parseInt(o.style.marginTop)-1+"px";
            if(Math.abs(parseInt(o.style.marginTop))>=o.scrollHeight/2){
               o.style.marginTop=0; 
            }
        }else{
            clearInterval(t);
            setTimeout(start,delay);
        }
    }

    setTimeout(start,delay);
}
