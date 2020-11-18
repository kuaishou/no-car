export function imagesCompress(file, config = {}) {
    return new Promise((resolve) => {


        var ready = new FileReader();
        /*开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,readyState属性的值会成为DONE,如果设置了onloadend事件处理程序,则调用之.同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容.*/
        ready.readAsDataURL(file);
        // let _this = this;
        ready.onload = function () {
            // console.log(ready.result.length)
            var img = new Image();
            img.src = ready.result;
            img.onload = function () {
                var that = this;
                // 默认按比例压缩
                var w = that.width,
                    h = that.height,
                    scale = w / h;
                w = config.width || w;
                h = config.height || (w / scale);
                var quality = 0.7; // 默认图片质量为0.7
                //生成canvas
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                // 创建属性节点
                var anw = document.createAttribute("width");
                anw.nodeValue = w;
                var anh = document.createAttribute("height");
                anh.nodeValue = h;
                canvas.setAttributeNode(anw);
                canvas.setAttributeNode(anh);
                ctx.drawImage(that, 0, 0, w, h);
                // 图像质量
                if (config.quality && config.quality <= 1 && config.quality > 0) {
                    quality = config.quality;
                }
                // quality值越小，所绘制出的图像越模糊
                var base64 = canvas.toDataURL(config.type || 'image/jpeg', quality);
                resolve(base64);
                // // 回调函数返回base64的值
                // // callback(base64);
                // var bl = _this.convertBase64UrlToBlob(base64);
                // console.log(bl)
                // var form = new FormData();
                // form.append('bizNo', '35b2abc9190f1191fbfed718440531cb')
                // form.append("file", bl, "file_" + +(new Date()) + ".jpg"); // 文件对象
                // let res = verifyFaceByImg(form).then(r => {
                //     console.log('成功')
                // });
            }
        }
    })
}
export function preload(url,callback){
    let img =  new Image();
    img.onload = callback
    img.src=url;
 
}