/* eslint-disable */
function Verify() {

    //校验id
    this.vid = -1;
    this.$$values = [];
    this.$$error = [];

    return this;
}
Verify.hook = function (name, method) {
    let _prototype = this.prototype[name];
    this.prototype[name] = function () {
        let mId = this.$$values[this.vid].methodId;
        if (!this.$$values[this.vid].methods[mId]) {
            this.$$values[this.vid].methods[mId] = [];
        }
        this.$$values[this.vid].methods[mId].push({
            params: [...arguments].join(','),
            name,
            isRule: false,
            method: method
        })
        return this;

    }

}
Verify.install = function (name, method) {
    this.prototype[name] = function () {

        let mId = this.$$values[this.vid].methodId;
        if (!this.$$values[this.vid].methods[mId]) {
            this.$$values[this.vid].methods[mId] = [];
        }
        
        this.$$values[this.vid].methods[mId].push({
            params: [...arguments],
            name,
            isRule: true,
            method
        })
        return this;

    }
    return this;
}
Verify.all = function (...params) {
    for (let index = 0; index < params.length; index++) {
        const v = params[index];
        if (v == false) {
            return false;
        }
    }
    return true;
}
// Verify.prototype.errMsg = function (msg) {
//     console.log(msg)

//     return this;
// }
Verify.prototype.or = function (a) {
    // this.methodId++;
    this.$$values[this.vid].methodId++
    return this;
}
Verify.prototype.check = function (flag) {
    if (flag === undefined) {
        flag = false;
    }
    let mId = this.$$values[this.vid].methodId;
    this.$$values[this.vid].methods[mId].check = flag;
    // this.$$values[this.vid].methods[mId].checkCount = 0;

    return this;
}
Verify.prototype.test = function (value) {
    this.vid++;
    // this.$$values[this.vid] = [];
    this.$$values.push({
        value,
        methodId: 0,
        methods: []
    })

    return this;
}

Verify.prototype._check = function (opt) {
    let checkCount = 0;
    let value = opt.value
    let methods = opt.methods
    for (let index = 0; index < methods.length; index++) {
        const rules = methods[index];
        // console.log('开始校验规则')

        if (rules.check === false) {
            // console.log('这条校验规则不检验', index);
            checkCount++;
            // console.log(checkCount)
            if (checkCount == methods.length) {
                return true;
            }
            ///  if (index == methods.length - 1 && rules.checkCount != methods.length) {
            //  console.log('*************')
            continue;
        }

        let ruleFlag = true;
        for (let index2 = 0; index2 < rules.length; index2++) {
            const rule = rules[index2];
            // console.log(index2, v)
            if (rule.isRule) {
                
                let flag = rule.method.apply(this, [value, ...rule.params]);
                //  console.log('方法返回-', v.name, flag);
                // console.log(`校验${rule.name}方法校验${value}返回-${flag}`)
                if (!flag) {
                    ruleFlag = false;
                    let errMethod = rules[index2 + 1];
                    if (errMethod && !errMethod.isRule) {

                        this.$$error.push({
                            method: errMethod.method,
                            params:errMethod.params
                        })
                        // hookMethod.method.apply(this, [...hookMethod.params])
                    } else if (this.$$errMsg) {
                        // console.log('rule.method.errMsg')
                       
                        // console.log(this.$$errMsg)
                        
                        this.$$error.push({
                            method: null,
                            params: this.$$errMsg
                        })
                        this.$$errMsg = null;
                        // if(this.errMsg)
                    }
                    // console.log('到这里****')
                    break;
                }
            }
        }

        if (ruleFlag) {
            return true;
        }
    }
    // console.log('到这里')
    return false;
}
Verify.prototype.end = function (callback) {
    let values = this.$$values;

    // console.log(values)
    let rulesFlag = [];
    for (let index = 0; index < values.length; index++) {
        const $$value = values[index];
        //      const value = $$value.value
        // console.log(`第${index + 1}个校验,校验${$$value.value}`)

        if (!this._check($$value)) {
            //console.log('校验失败')
            rulesFlag.push(false);
        } else {
            // console.log('校验成功')
            rulesFlag.push(true);
        }
        //  rulesFlag.push(false);
    }

    let callbackError = [];
    // console.log('校验结束', this.$$error)
    this.$$error.forEach(v => {
        callbackError.push(v.params)
    })
    if (callbackError.length == 0) {
        callbackError = null;
    }
    callback && callback.call(this, callbackError)
    return Verify.all.apply(this, rulesFlag);

}
export default Verify;