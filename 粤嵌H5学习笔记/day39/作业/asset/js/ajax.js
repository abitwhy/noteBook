/* 定义函数 */
function ajax( options ){
    // 1. 在函数内部定义一个默认值对象数据
    var defaults = {
        // 默认get提交方式
        type : "get",
        url : "",
        data : {},
        header:{
            "Content-Type" : "application/x-www-form-urlencoded"
        },
        success:function(){},
        error:function(){},
    };
    // 合并数组
    Object.assign(  defaults ,  options );

    // 创建ajax对象
    var xhr = new XMLHttpRequest();

    // 处理请求参数,拼接字符串  格式: "username=zhangsan&age=23&sex=男";
    var params = "";
    for(var attr in defaults.data){
        params += "&"+ attr + "=" + defaults.data[attr];
    }
    params = params.substr(1);

    // 判断请求方式
    if( defaults.type == "get" ){
        if( JSON.stringify( defaults.data ) != "{}" ){
            if( options.url.indexOf("?") != -1 ){// 如果含有?号
                defaults.url = defaults.url + "&" + params;
            }else{// 如果没有?号
                // get请求传递数据是通过url
                defaults.url = defaults.url + "?" + params;
            }
        }
    }

    // 初始化ajax
    xhr.open( defaults.type , defaults.url );

    // post传递数据是通过send方法
    if( defaults.type == "post" ){
        // 获取defaults中传递过来的请求头
        var ContentType =  defaults.header["Content-Type"] ;

        // 判断不同的请求头,设置请求头信息
        if( ContentType == "application/x-www-form-urlencoded" ){
            xhr.setRequestHeader("Content-Type", ContentType);
            // 发送请求
            xhr.send( params );
        }else if( ContentType == "application/json" ){
            xhr.setRequestHeader("Content-Type", ContentType);

            // 发送请求 注意,需要转成json字符串
            xhr.send( JSON.stringify( defaults.data ) );
        }

        
    }else if( defaults.type == "get" ){
        // 发送请求
        xhr.send();
    }


    // 当状态码发生变化的时候
    xhr.onreadystatechange = function(){
        // 判断ajax状态码
        if( xhr.readyState == 4 ){
            // 判断http状态码
            if( xhr.status == 200 ){
                // 获取服务器端返回的数据类型,响应头信息
                var responseHeader = xhr.getResponseHeader("Content-Type");

                // 判断响应头信息Content-Type是否含有"json"字符串
                if( responseHeader.indexOf( "json" ) != -1 ){
                    defaults.success( JSON.parse( xhr.responseText ) );
                }else{
                    // 调用用户传递过来的success方法
                    defaults.success( xhr.responseText );
                }

            }else{// 如果状态码不是200,我们就调用error错误回调函数
                defaults.error( xhr );
            }
        }
    }
}