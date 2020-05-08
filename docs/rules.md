

## require 必填

如果验证规则没有添加require就表示没有值并且值为空则不进行其它验证

## number 验证某个字段的值是否为纯数字（采用正则验证，不包含负数和小数点），例如：

```
'num':'number'
```

## max,min 限制长度

## integer 整数

验证某个字段的值是否为整数（采用parseInt对比），例如：

```
'num':'integer'
```

## float
验证某个字段的值是否为浮点数字（采用正则验证），例如：

```
'num':'float'
```

## boolean 或者 bool
验证某个字段的值是否为布尔值（字符串或者bool的true或false），例如：

```
'num':'boolean'
```

## email
验证某个字段的值是否为email地址，例如：

```
'email':'email'
```

## array 
> 验证某个字段的值是否为数组 例如：
```
'info':'array'
```

## accepted 

验证某个字段是否为为 yes, on, 或是 1。这在确认"服务条款"是否同意时很有用，例如
```
'accept':'accepted'
```

## length

验证某个字段的值的长度是否在某个范围，例如：
```
'name':'length:4,25'
```

或者指定长度
```
'name':'length:4'
```