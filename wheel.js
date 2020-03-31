var $wheel = (function(){
    var $content = $('<div class="slider" id="slider"><div class="slide"><img src="img/b5.png" alt=""></div><div class="slide"><img src="img/b1.png" alt=""></div><div class="slide"><img src="img/b2.png" alt=""></div><div class="slide"><img src="img/b3.png" alt=""></div><div class="slide"><img src="img/b4.png" alt=""></div><div class="slide"><img src="img/b5.png" alt=""></div><div class="slide"><img src="img/b1.png" alt=""></div></div><span id="left"><</span><span id="right">></span><ul class="nav" id="navs"><li id="li1">1</li><li id="li2">2</li><li id="li3">3</li><li id="li4">4</li><li id="li5">5</li></ul>');
    var $box = $('.box');
    var index = 1;
    var intervalId;
    var doing = false;
    var cfg = {
        container:'#box'
    }; 
    function show(conf){
        $(cfg.container).append($content);
        $.extend(cfg,conf);
        autoNextPage();
        function autoNextPage(){
            $("#li"+(index)).attr("class","active");
            intervalId = setInterval(function(){
                nextPage(true);
            },3000);
        }
        $box.mouseover(function(){
            // console.log("移入");
            clearInterval(intervalId);
        });
        $box.mouseout(function(){
            // console.log("移出");
            autoNextPage();
        });
        // 移上
        $('#left').mouseover(function(){
            $('#left').css('opacity',0.5);
        })
        $('#right').mouseover(function(){
            $('#right').css('opacity',0.5);
        })
        // 移下
        $('#left').mouseout(function(){
            $('#left').css('opacity',0);
        })
        $('#right').mouseout(function(){
            $('#right').css('opacity',0);
        })
        // 点击
        if(doing == false){
            $('#left').click(function(){
                doing = true;
                nextPage(true);
            })
        }
        if(doing == false){
            $('#right').click(function(){
                doing = true;
                nextPage(false);
            })
        }
        // 点击下面按钮
        $('ul').find('li').on('click', function(){
            index = $(this).index();
            $('li').removeAttr("class");
            nextPage(true);
        })
    }
    function autoSixPage(){
        setTimeout(function(){
            nextPage(true);
        },0);
    }
    function ZSixPage(){
        setTimeout(function(){
            nextPage(false);
        },0);
    }
    function nextPage(next){
        var targetLeft = 0;
        if(next){ //右键
            if(index==6){
                autoSixPage()
                index=1;
                targetLeft = 0;
                // console.log("左键："+index);
                $('#slider').css('transform','translateX('+targetLeft+'px)');
                $('#slider').css('transition-property','transform');
                $('#slider').css('transition-duration','0s');
            }
            else{
                index++;
                targetLeft = -1200*(index-1);
                // console.log("左键："+index);
                if(index == 6){
                    $("#li1").attr("class","active");
                    $("#li5").removeAttr("class");
                }
                else if(index == 1){
                    $("#li1").attr("class","active");
                    $("#li5").removeAttr("class");
                }
                else{
                    $("#li"+(index)).attr("class","active");
                    $("#li"+(index-1)).removeAttr("class");
                }
                $('#slider').css('transform','translateX('+targetLeft+'px)');
                $('#slider').css('transition-property','transform');
                $('#slider').css('transition-duration','1s');
            }
        }
        else{
            if(index == 0){
                ZSixPage();
                index=5;
                targetLeft = -4800;
                // console.log("右键："+index);
                $('#slider').css('transform','translateX('+targetLeft+'px)');
                $('#slider').css('transition-property','transform');
                $('#slider').css('transition-duration','0s');
            }
            else{
                index--;
                targetLeft = -1200*(index-1);
                // console.log("右键："+index);
                if(index == 0){
                    $("#li5").attr("class","active");
                    $("#li1").removeAttr("class");
                }
                else if(index == 5){
                    $("#li5").attr("class","active");
                    $("#li1").removeAttr("class");
                }
                else{
                    $("#li"+(index)).attr("class","active");
                    $("#li"+(index+1)).removeAttr("class");
                }
                $('#slider').css('transform','translateX('+targetLeft+'px)');
                $('#slider').css('transition-property','transform');
                $('#slider').css('transition-duration','1s');
            }
        }
        doing = false;
    }
    return {
        show:show
    }
}())