import { expect } from 'chai'
var Validate = require('./../dist/Validate.js')



describe('验证规则', function () {

    it('必填 require', function () {

        var validate = new Validate({
            'name|名字': 'require',
        });
        expect(validate.check({
            name: '罗戚洪'
        }, true)).to.be.true
    })

    it('必填 未填写 require', function () {
        
        var validate = new Validate({
            'name|名字': 'require',
        });
        
        expect(validate.check({
            name: ''
        }, true)).to.be.false

    })

    it('错误消息 validate.getError', function () {
        var validate = new Validate({
            'age|年龄': 'require',
        });
        validate.check({
            'age':''
        });
        expect( validate.getError() ).to.be.string
    })

});

