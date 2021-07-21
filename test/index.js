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
    it("能够复制普通数组", () => {
      const a = [[1,1],[2,2],[3,3]]
      const a2 =  DeepCloner(a);
      assert(a!==a2);
      assert(a[0]!==a2[0]);
      assert(a[1]!==a2[1]);
      assert(a[2]!==a2[2]);
      assert.deepEqual(a,a2)
    });
    it("能够复制函数", () => {
      const a = function (x,y){
          return x+y
      }
      a.b={yyy:{zzz:1}}
      const a2 = DeepCloner(a);
      assert(a!==a2);
      assert(a.b!==a2.b)
      assert(a.b.yyy.zzz===a2.b.yyy.zzz)
      assert(a(1,2)=== a2(1,2))
     
    });
    it("环也能复制", () => {
      const a = { name: "方方" };
      a.self = a;
      const a2 =  DeepCloner(a);
      assert(a !== a2);
      assert(a.name === a2.name);
      assert(a.self !== a2.self);
    });
  })
})
