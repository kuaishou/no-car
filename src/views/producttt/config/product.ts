/**
 * @param productCode   产品代码
 * @param productName   产品名称
 * @param productDesc   产品描述
 * @param productImg    产品图片
 * @param productUrl    产品地址
 * @param component     产品模板
 * 
 */
const productList = [{
    // 百万医疗3.0
    productCode: 'P125001',
    productName: '【重磅产品】顺意e生百万医疗险3.0',
    productDesc: '3元/月起，最高700万医疗保障',
    productImg: window.location.protocol + require('../images/million_share.png'),
    productUrl: window.location.href,
    component: require('views/details/pages/million/index.vue')
},{
    // 护家保
    productCode: 'P133101',
    productName: '护家保-家庭人身与财产保障保险',                         
    productDesc: '一张保单，保两家三代，高达8人的人身与财产保障，解决家庭成员的各种风险意外。每天低至1元，保全面。',                          
    productImg: window.location.protocol + require('../images/hjb_share.png'),                         
    productUrl: window.location.href,         
    component: require('views/details/pages/family/index.vue')
},{
    // 四川护家保
    productCode: 'P133103',
    productName: '护家保-家庭人身与财产保障保险',                         
    productDesc: '一张保单，保两家三代，高达8人的人身与财产保障，解决家庭成员的各种风险意外。每天低至1元，保全面。',                          
    productImg: window.location.protocol + require('../images/hjb_share.png'),                         
    productUrl: window.location.href,         
    component: require('views/details/pages/family/index.vue')
},{
    // 超能保
    productCode: 'P060448',
    productName: '【华安保险】华安“超能保”人身综合保障',                         
    productDesc: '最高500万综合意外+重疾保障，10项保障为您贴身守护',                          
    productImg: window.location.protocol + require('../images/super_share.png'),                 
    productUrl: window.location.href,         
    component: require('views/details/pages/super/index.vue')  
},{
    // 全家意外险
    productCode: 'P060503',
    productName: '【华安保险】家庭成员意外伤害保险',                         
    productDesc: '家庭保障必备，一张保单保全家',                          
    productImg: window.location.protocol + require('../images/accident_share.png'),                 
    productUrl: window.location.href,  
    component: require('views/details/pages/accident/index.vue') 
}]


const queryProduct = (productCode:any) => {
    return productList.filter(item => item.productCode === productCode)[0]
}
export default queryProduct
