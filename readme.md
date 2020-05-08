## zoo-common validate独立包

## 安装

```
npm i mulo-validate --save

```

## 使用

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


## 规则

