export function stringMask(value, satrt, end, char) {
    console.log('掩码')
    satrt = satrt || 0;
    end = end || value.length;
    let len = end - satrt;
    char = char || '*';

    let str = '';
    for (let i = 0; i < satrt; i++) {
        str += value.charAt(i);
    }
    for (let i = satrt; i < end; i++) {
        str += char;
    }
    for (let i = end; i < value.length; i++) {
        str += value.charAt(i);
    }
    return str;

}

export function certificates(code){
    const config = {
        "01": "身份证",
        "02": "护照",
        "03": "军人证",
        "04": "学生证",
        "05": "台胞证",
        "06": "港澳返乡证",
        "07": "出生证",
        "08": "出生日期（未成年人使用）",
        "09": "统一社会信用代码",
        "13": "纳税人识别号",
        "14": "外国人永久居留身份证",
        "99": "其他"
    }
   
    if(code){
        return config[code];
    }
}