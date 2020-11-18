


export const isType = (type)=>{
 return function(n){
   return Object.prototype.toString.call(n)===`[object ${type}]`;
 }
}
export const isObject  = isType('Object');
export const isString  = isType('String');
export const isArray  = isType('Array');
export const isBoolean  = isType('Boolean');
export const isNumber  = isType('Number');