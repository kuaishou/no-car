//获取身份证包含信息
export function getCardInfo(cardNo, dateStr) {
    let resultMap = {};
    let year = '1900';
    let month = '01';
    let day = '01';
    if (cardNo.length == 15) {
        let re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
        let arr_data = cardNo.match(re_fifteen);
        year = '19' + arr_data[2];
        month = arr_data[3];
        day = arr_data[4];
        resultMap.birthDay = year + "-" + month + "-" + day;
        //获取性别
        if (parseInt(cardNo.substr(14, 1)) % 2 == 1) {
            //男
            resultMap.sex = "01";
        } else {
            //女
            resultMap.sex = "02";
        }
    } else if (cardNo.length == 18) {
      //获取出生日期
        year = cardNo.substring(6, 10);
        month = cardNo.substring(10, 12);
        day = cardNo.substring(12, 14);
        resultMap.birthDay = year + "-" + month + "-" + day;
        if (parseInt(cardNo.substr(16, 1)) % 2 == 1) {
            //男
            resultMap.sex = "01";
        } else {
            //女
            resultMap.sex = "02";
        }
    } else {
        resultMap.birthDay = '1900-01-01';
        resultMap.sex = '01';
    }
  
    let myDate;
    if(dateStr){
        myDate = new Date((dateStr + ' ' + '00:00:00').replace(/-/g, '/'));
    }else{
        myDate = new Date();
    }
    let myMonth = myDate.getMonth() + 1;
    let myDay = myDate.getDate();
    let age = myDate.getFullYear() - year - 1;
    if (month < myMonth || month == myMonth && day <= myDay) {
        age++;
    }
    resultMap.age = age;
    return resultMap;
}

/**
 * 格式化银行卡4位以空格分割：6226 7401 2507
 * @param card 银行卡号
 * @param separator 分隔符 默认为空格
 */
export const formatYhCard = (card, separator = ' ') => {
    card = card + ''
    let len = card.length
    let s = ''
    if (len > 4) {
      let i = 0
      let sl = 0
      while (sl < len) {
        s = s + card.substr(sl, 4) + (sl + 4 < len ? ' ' : '')
        i++
        sl = i * 4
      }
    } else {
      s = card
    }
    return s
  }