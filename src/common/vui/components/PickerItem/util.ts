// import objectAssign from 'object-assign'

const mergeOptions = function ($vm:any, options:any) {
  const defaults:{[key:string]:any} = {}
  for (let i in $vm.$options.props) {
    if (i !== 'value') {
      defaults[i] = $vm.$options.props[i].default
    }
  }
  const _options = Object.assign({}, defaults, options)
  for (let i in _options) {
    $vm[i] = _options[i]
  }
}

function add(a:any, b:any) {
  var c, d, e;
  try {
      c = a.toString().split(".")[1].length;
  } catch (f) {
      c = 0;
  }
  try {
      d = b.toString().split(".")[1].length;
  } catch (f) {
      d = 0;
  }
  return e = Math.pow(10, Math.max(c, d)), (mul(a, e) + mul(b, e)) / e;
}
function sub(a:any, b:any) {
  var c, d, e;
  try {
      c = a.toString().split(".")[1].length;
  } catch (f) {
      c = 0;
  }
  try {
      d = b.toString().split(".")[1].length;
  } catch (f) {
      d = 0;
  }
  return e = Math.pow(10, Math.max(c, d)), (mul(a, e) - mul(b, e)) / e;
}
function mul(a:any, b:any) {
  var c = 0,
      d = a.toString(),
      e = b.toString();
  try {
      c += d.split(".")[1].length;
  } catch (f) {}
  try {
      c += e.split(".")[1].length;
  } catch (f) {}
  return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
}
function div(a:any, b:any):any {
  var c, d, e = 0,
      f = 0;
  try {
      e = a.toString().split(".")[1].length;
  } catch (g) {}
  try {
      f = b.toString().split(".")[1].length;
  } catch (g) {}
  return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), mul(c / d, Math.pow(10, f - e));
}
// 取余
function rem(a:any, b:any) {
  return sub(a , mul( parseInt(div(a,b)),b))
}

function getDate(date:any){
   const arr = date.toString().split('-');
   arr[1] = arr[1].length ===1 && arr[1] < 10 ? '0'+arr[1]:arr[1];
   arr[2] = arr[2].length ===1 && arr[2] < 10 ? '0'+arr[2]:arr[2];
   return `${arr[0]}-${arr[1]}-${arr[2]}`
}

export {
  mergeOptions,
  add,
  sub,
  mul,
  div,
  rem,
  getDate
}