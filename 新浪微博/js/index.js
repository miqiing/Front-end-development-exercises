$(function(){
    $('body').delegate('.comment','propertychange input',function(){
        if($(this).val().length>0){
            $('.send').prop('disabled',false);
        }else{
            $('.send').prop('disabled',true);
        }
    });

    $('.send').click(function(){
        var $text = $('.comment').val();
        var $weibo = createEle($text);
        $('.messageList').prepend($weibo);
    });

    $('body').delegate('.infoTop','click',function(){
        $(this).text(parseInt($(this).text())+1);
    });
    $('body').delegate('.infoDown','click',function(){
        $(this).text(parseInt($(this).text())+1);
    });
    $('body').delegate('.infoDel','click',function(){
        $(this).parents('.info').remove();
    });
    


    function createEle(text) {
        var $weibo = $("<div class=\"info\">\n" +
            "            <p class=\"infoText\">"+text+"</p>\n" +
            "            <p class=\"infoOperation\">\n" +
            "                <span class=\"infoTime\">"+formartDate()+"</span>\n" +
            "                <span class=\"infoHandle\">\n" +
            "                    <a href=\"javascript:;\" class='infoTop'>0</a>\n" +
            "                    <a href=\"javascript:;\" class='infoDown'>0</a>\n" +
            "                    <a href=\"javascript:;\" class='infoDel'>删除</a>\n" +
            "                </span>\n" +
            "            </p>\n" +
            "        </div>");
        return $weibo;
    }

    function formartDate(){
        var date=new Date();
        var arr=[
            date.getFullYear()+'-',
            date.getMonth()+1+'-',
            date.getDate()+'',
            date.getHours()+':',
            date.getMinutes()+':',
            date.getSeconds()
        ];
        return arr.join('');
    }

    
    
});