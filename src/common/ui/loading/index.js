import './index.css'
function Loading() { }
let text = '正在加载中',
    showTime = 0,
    tid = -1,
    delayed = 400;
function getSingleLoadingDom() {
    let LoadingWrap = document.getElementById('ui-loading-wrap')
    if (!LoadingWrap) {
        let img = require('./loading-change.gif');
        LoadingWrap = document.createElement('div');
        LoadingWrap.id = 'ui-loading-wrap'
        LoadingWrap.style.display = 'none';
        LoadingWrap.className = 'loading-wrap '
        LoadingWrap.innerHTML = `
        <div class="loading-mask opacity_4"></div>
        <div class="loading-box">
            <img class="loading-img" src="${img}"/>  
            <p class="loading-content"></p>
        </div>
        `;
        document.body.appendChild(LoadingWrap);
    }
    return LoadingWrap;
}
Loading.prototype.show = function (opt) {
    clearTimeout(tid);
    showTime = +new Date();
    if (typeof opt == 'string' || typeof opt === 'undefined') {
        opt = {
            text: opt
        }
    }

    let LoadingWrap = getSingleLoadingDom();
    let centerContent = LoadingWrap.getElementsByClassName('loading-content')[0];
    centerContent.innerHTML = opt.text || text;
    LoadingWrap.style.display = 'block';
}
Loading.prototype.hide = function (opt) {

    let time = +new Date() - showTime;
    // console.log(time)
    if(opt&&opt.noDelay||!(time < delayed)){
        hide();
    }else {
        tid = setTimeout(() => {
            hide();
        }, delayed - time)
    } 
    
    function hide() {
        let LoadingWrap = getSingleLoadingDom();
        let centerContent = LoadingWrap.getElementsByClassName('loading-content')[0];
        centerContent.innerHTML = text;
        LoadingWrap.style.display = 'none';
    }
}
export default new Loading