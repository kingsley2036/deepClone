const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);

const assert = chai.assert;
const DeepCloner = require("../src/index");
describe('deepClone',()=>{
  it('它是一个函数',()=>{
    assert.isFunction(DeepCloner)
  })
  it('他可以复制基本类型',()=>{
    const str='xxx'
    const str2=DeepCloner(str)
    assert(str===str2)
    const num=123
    const num2=DeepCloner(num)
    assert(num===num2)
    const bool=false
    const bool2=DeepCloner(bool)
    assert(bool===bool2)
  })
  describe('对象',()=>{
    it("能够复制普通对象", () => {
      const a = { name: "方方", child: { name: "小方方" } };
      const a2 =  DeepCloner(a);
      assert(a!==a2);
      assert(a.name === a2.name);
      assert(a.child !== a2.child);
      assert(a.child.name === a2.child.name);
    });
  })
})
