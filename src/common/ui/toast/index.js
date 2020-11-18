// const tpl = 
import './index.css'
import mergeOptions from '../../utils/mergeOptions'

function Toast() {

}
let toast = new Toast,
    className = 'ui-toast-wrap';

function getSingleToastDom() {
    let toastWrap = document.getElementById('ui-toast-wrap')
    // if (document.getElementById('ui-toast-wrap'))
    if (!toastWrap) {

        toastWrap = document.createElement('div');
        toastWrap.id = 'ui-toast-wrap'
        toastWrap.style.display = 'none';
        // toastWrap.className = ''
        toastWrap.innerHTML = `
        <div class="ui-toast-body">
        <div class="ui-toast-text opacity9"></div>
        </div>
        `;
        document.body.appendChild(toastWrap);
        toastWrap.addEventListener('click', function () {
            toast.hide();
        })
    }
    // console.log('**', toastWrap)
    return toastWrap;
}
Toast.prototype.show = function (opt) {
 
    if (typeof opt == 'string') {
        opt = {
            text: opt
        }
    }
    opt = mergeOptions({
        classPrefix: '',
        time: 3000,
    }, opt);

    let toastWrap = getSingleToastDom();
    let centerContent = toastWrap.getElementsByClassName('ui-toast-text')[0];

    centerContent.innerHTML = opt.text;
    toastWrap.className = `${className} ${opt.classPrefix}`
    toastWrap.style.display = 'block';
  
    if(opt.time!==-1){
        setTimeout(() => {
            this.hide();
            // this.remove();
        }, opt.time||3000);
    }
}
Toast.prototype.hide = function () {
    let toastWrap = getSingleToastDom();
    toastWrap.style.display = 'none';
}
Toast.prototype.remove = function () {
    let toastWrap = getSingleToastDom();
    document.body.removeChild(toastWrap);
}

export default toast