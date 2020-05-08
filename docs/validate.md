## 安装
```bash
npm i mulo-validate -S
```
## demo

```javascript
var Validate = require('mulo-validate')
var data = { name: '1', age: 13 }
var validate = new Validate({
    'name|名字': 'require|min:2|max:4',
    'age|年龄': 'require|>=:10|<=:100',
});
if (!validate.check(data, true)) {
    //一条错误消息
    var errorMsg = validate.getError();
    console.log(errorMsg);
    //所有错误
    var errors = validate.getErrors();
    return;
}
```

## 示例
- 完全按照thinkphp-validate的使用方式开发,同时内置验证规则也将完全遵循
- 已实现的验证方式参照`内置规则`

```html
<form id="demo1" action="">
    用户名:<input type="text" name="username">
    年龄:<input type="text" name="age">
    密码:<input type="text" name="password">
    长度:<input type="text" name="lang">
    身高:<input type="text" name="shengao">
    <button type="button" class="btn" id="submit">提交</button>
</form>
<script src=""></script>
<script src="https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js"></script>
<script src="//unpkg.com/zoo-common/dist/js/Validate.js"></script>
<script>
    $('#submit').click(function (e) {
        //读取数据
        var data = {};
        $('#demo1').find('input').each(function (index, el) {
            data[$(el).attr('name')] = $(el).val();
        })
        //验证数据
        var validate = new Validate({
            'lang|长度': 'in:13,14,15,16,17,18|require',
            'username|用户名': 'require|max:5',
            'age|年龄': 'require|integer',
            'password|密码': 'require|>:1',
            'shengao|身高': 'integer'
        }, {
            'username.require': '用户名不能为空',
            'age.require': '年龄必须填写',
            'password.>': '密码必须大于1'
        });
        //验证消息  check(数据,bool:是否验证所有字段,bool:验证所有规则)
        if (!validate.check(data, true)) {
            alert(validate.getError());
            console.log(validate.getErrors());
        }
        e.preventDefault();
    });
</script>

```

<form id="demo1" action="">
    用户名:<input type="text" name="username">
    年龄:<input type="text" name="age">
    密码:<input type="text" name="password">
    长度:<input type="text" name="lang">
    身高:<input type="text" name="shengao">
    <button class="btn" id="submit">提交</button>
</form>

<script>
    require(['//unpkg.com/zoo-common/dist/js/Validate.js'], function (Validate) {
        $('#submit').click(function (e) {
            var data = {};
            $('#demo1').find('input').each(function (index, el) {
                data[$(el).attr('name')] = $(el).val();
            })
            var validate = new Validate({
                'username|用户名': 'require|max:6',
                'age|年龄': 'require|integer',
                'password|密码': 'require|>:1',
                'lang|长度': 'in:13,14,15,16,17,18|require',
                'shengao|身高': ''
            }, {
                'username.require': '用户名不能为空',
                'age.require': '年龄必须填写',
                'password.>': '密码必须大于1'
            });

            if (!validate.check(data, true)) {
                alert(validate.getError());
                console.log(validate.getErrors());
            }
            e.preventDefault();
        });
    })
</script>




## 函数说明

- 创建验证对象

```
var validate = new Validate({
    'lang|长度': 'in:13,14,15,16,17,18|require',
    'username|用户名': 'require|max:5',
    'age|年龄': 'require|integer',
    'password|密码': 'require|>:1',
    'shengao|身高': 'integer'
}, {
    'username.require': '用户名不能为空',
    'age.require': '年龄必须填写',
    'password.>': '密码必须大于1'
});

```

- `check`(数据,bool:是否验证所有字段,bool:验证所有规则)

- `getError():String` 获得一条错误消息

- `getErrors():Array` 获得所有错误消息

```
  // 返回数据格式 
  [
    {
        
        field: '验证字段名',
        name: '字段显示名',
        rule: '验证规则',
        msg: '错误消息',
        args: '验证参数',
    }
    ...
  ]

```

## 自定义规则

* 如 用户名/邮箱/手机号

```

```

