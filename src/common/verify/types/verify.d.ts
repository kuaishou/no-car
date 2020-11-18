import './extend'
export interface Verify {
  /**
   * 
   * @param flag 前面那条规则是否校验
   */
  check(flag?:boolean): Verify;
  /**
   * 
   * @param a 暂留空
   */
  error(a:any): Verify;
  /**
   * 
   * @param value 要校验的值
   */
  test(value:any): Verify;
  /**
   * 多个条件校验 如：new Verify().test('a').equals('1').or.equals('2')
   * 就是等于1或等于2
   */
  or(): Verify;
  /**
   * 
   * @param fun 规则写完，最后校验，错误信息回调到fun参数为数组
   */
  end(fun?:Function): Verify;
  
}

export interface VerifyConstructor<V extends Verify = Verify> {
  new(options?: any): Verify;
  /**
   * 扩展校验方法
   * @param name 方法名
   * @param method 
   */
  install(name: string, method: Function): VerifyConstructor
  /**
   * 扩展
   * @param parms 所有验证通过后执行
   */
  all(...parms: any[]): VerifyConstructor
  /**
   * 验证钩子
   * @param name 钩子名称
   * @param method 钩子实现
   */
  hook(name: string, method: Function): VerifyConstructor
}

export const Verify: VerifyConstructor;
