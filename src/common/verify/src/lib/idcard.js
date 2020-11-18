
export const identityValid = function(code,msg){
	var city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 " };
	var tip = "";
	var pass = true;

	if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
		tip = "身份证号格式错误";
		pass = false;
	}

	else if (!city[code.substr(0, 2)]) {
		tip = "地址编码错误";
		pass = false;
	}
	else {
		//18位身份证需要验证最后一位校验位
		if (code.length == 18) {
			let _code = code.split('');
			//∑(ai×Wi)(mod 11)
			//加权因子
			var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
			//校验位
			var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
			var sum = 0;
			var ai = 0;
			var wi = 0;
			for (var i = 0; i < 17; i++) {
				ai = _code[i];
				wi = factor[i];
				sum += ai * wi;
			}
			var last = parity[sum % 11];
			if (last != _code[17]) {
				tip = "校验位错误";
				pass = false;
			}
		}
	}

	return pass;
}
export const getIDCard = (no) => {
	let idCardInfo = {};
	idCardInfo.no = no;
	let y = '0', m = '0', d = '0', sex = '';
	if (no.length == 15) {
		y = no.substring(6, 8);
		m = no.substring(8, 10);
		d = no.substring(10, 12);
		sex = no.substring(14, 15);
		sex = Number(sex) % 2 == 1 ? 'M' : 'F';
		if (Number(y) > 10) y = '19' + y;
		else y = '20' + y;
	} else if (no.length == 18) {
		y = no.substring(6, 10);
		m = no.substring(10, 12);
		d = no.substring(12, 14);
		sex = no.substring(16, 17);
		sex = Number(sex) % 2 == 1 ? 'M' : 'F';
	} else {
		idCardInfo.error = true;
	}
	idCardInfo.year = y;
	idCardInfo.month = m;
	idCardInfo.day = d;
	idCardInfo.sex = sex;
	idCardInfo.date = y + '-' + m + '-' + d;
	return idCardInfo;
}
export default {
	identityValid,
	getIDCard
}