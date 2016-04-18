/*刮刮卡*/
;(function($){
     //默认参数
     var defaults = {
         img: 'dist/img/pic_26_00.jpg',
         percent: 0.4,
         imgbj: 'dist/img/pic_26.jpg',
         callback: Function
     };

     $.fn.scratch= function (options) {
        var bodyStyle = document.body.style;
        bodyStyle.mozUserSelect = 'none';
        bodyStyle.webkitUserSelect = 'none';

        var opts = $.extend({}, defaults, options),
            imgurl = opts.img || '',
            img_bj = opts.imgbj || '',
            percent = opts.percent || 0.5,
            callback = opts.callback || {},
            flag = true,
            img = new Image(),
            imgobj = new Image(),
            canvas=this[0];

        canvas.style.backgroundColor='transparent';
        canvas.style.position = 'absolute';
        imgobj.src = img_bj;
        imgobj.addEventListener('load', function(e) {
            console.log('刮刮卡背景加载成功~');
            img.src = imgurl;
            img.addEventListener('load', function(e) {
                console.log('刮刮卡奖励图片加载成功~');
                var ctx;
                var w = img.width,
                    h = img.height;
                var offsetX = $('canvas').offset().left,
                    offsetY = $('canvas').offset().top;
                var mousedown = false;

                function layer(ctx) {
                    var pat=ctx.createPattern(imgobj, "repeat");
                    ctx.fillStyle = pat;
                    ctx.fillRect(0, 0, w, h);
                }

                function eventDown(e){
                    e.preventDefault();
                    mousedown=true;
                }

                function eventUp(e){
                    e.preventDefault();
                    mousedown=false;
                    var imgData=ctx.getImageData(0, 0, w, h),
                        aPx=w*h,
                        num1=0;
                    for(var i=0; i<aPx; i++){
                        if(imgData.data[4*i+3]==0){
                            num1++;
                        }
                    }
                    if(num1>aPx*percent){
                        ctx.fillRect(0, 0, w, h);
                        callback();
                    }
                }

                function eventMove(e){
                    e.preventDefault();
                    if(mousedown) {
                         if(e.changedTouches){
                             e=e.changedTouches[e.changedTouches.length-1];
                         }
                         var x = (e.clientX + document.body.scrollLeft || e.pageX) - offsetX || 0,
                             y = (e.clientY + document.body.scrollTop || e.pageY) - offsetY || 0;
                         with(ctx) {
                             beginPath();
                             arc(x, y, 10, 0, Math.PI * 2);
                             fill();
                         }
                    }
                }

                canvas.width=w;
                canvas.height=h;
                canvas.style.backgroundImage='url('+img.src+')';
                ctx=canvas.getContext('2d');
                ctx.fillStyle='transparent';
                ctx.fillRect(0, 0, w, h);
                layer(ctx);

                ctx.globalCompositeOperation = 'destination-out';

                canvas.addEventListener('touchstart', eventDown);
                canvas.addEventListener('touchend', eventUp);
                canvas.addEventListener('touchmove', eventMove);
                canvas.addEventListener('mousedown', eventDown);
                canvas.addEventListener('mouseup', eventUp);
                canvas.addEventListener('mousemove', eventMove);
            });
        });
    };
})(window.Zepto);
