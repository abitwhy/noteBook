function jsonp( options ){
    var script = document.createElement("script");
    var funcname = "myJsonp"+Math.random().toString().replace(".","");
    window[funcname] = options.success;
    var params = "";
    for(var attr in options.data){
        params = params + "&" + attr + "=" + options.data[attr]
    }
    script.src = options.url + "?callback="+funcname + params;
    document.body.appendChild( script );
    script.onload = function(){
        this.remove();
    }
}