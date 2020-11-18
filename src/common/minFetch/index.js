import mergeOptions from '../utils/mergeOptions'
//@ts-check
 const minFetch = (config) => {
    config = mergeOptions({
        method: 'get',
        success: function () { },
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        error: function () { }
    }, config);
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        var status = xhr.status;
        if (xhr.readyState == 4) {
            if (status >= 200&&status<300) {
                let text = xhr.response;
                try {
                    text = JSON.parse(text)
                } catch (error) {
       
                }
                config.success(text);
            }else{
                config.error('error');
            }
        }
    }
    
    if (config.params) {
        if (config.url.indexOf('?') > -1) {
            config.url = `${config.url}&${serialize(config.params)}`
        } else {
            config.url = `${config.url}?${serialize(config.params)}`
        }

    }

    xhr.open(config.method, config.url);
    for(var v in config.headers){
        xhr.setRequestHeader(v,config.headers[v]);
        if(v.toLocaleLowerCase()=='content-type'){
            if((config.headers[v]||'').indexOf( "application/json")>- 0){
                config.data = JSON.stringify(config.data);
            }else {
                config.data = serialize(config.data);
            }
        
        }
    }
    
  
    xhr.send(config.data);
    
}
function serialize(data) {
    var arr = [];
    for (var name in data) {
        if(data[name]!==null&&data[name]!==undefined){
            arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
        }
       
    }
    return arr.join("&");
}
export default minFetch