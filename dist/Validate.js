(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Validate = factory());
}(this, (function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var Validate = /*#__PURE__*/function () {
    function Validate(rule, msg) {
      _classCallCheck(this, Validate);

      this.rule = rule;
      this.messageRuleSetting = msg || {};
      this.errorMsg = 'error';
      this.errorMsgs = [];
      this.debug = false;
      this.validateDatas = false; //内置验证规则

      this.validateRules = {
        email: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
        number: /^-?\d*\.?\d+$/,
        chinese: /^[\u4e00-\u9fa5]+$/,
        idcard: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
        mobile: /^[1][3-9][0-9]{9}$/,
        //必选
        require: function require(val) {
          return !(val === null || val === undefined || val === '');
        },
        max: function max(v, pmax) {
          return !(('' + v).length > parseInt(pmax));
        },
        min: function min(v, vmin) {
          return !(('' + v).length < parseInt(vmin));
        },
        //大于
        '<': function _() {
          var _this$validateRules;

          return (_this$validateRules = this.validateRules).lt.apply(_this$validateRules, arguments);
        },
        '>': function _() {
          var _this$validateRules2;

          return (_this$validateRules2 = this.validateRules).gt.apply(_this$validateRules2, arguments);
        },
        '<=': function _() {
          var _this$validateRules3;

          return (_this$validateRules3 = this.validateRules).elt.apply(_this$validateRules3, arguments);
        },
        '>=': function _() {
          var _this$validateRules4;

          return (_this$validateRules4 = this.validateRules).egt.apply(_this$validateRules4, arguments);
        },
        lt: function lt(v, p) {
          return parseFloat(v) < parseFloat(p);
        },
        gt: function gt(v, p) {
          return parseFloat(v) > parseFloat(p);
        },
        elt: function elt(v, p) {
          return parseFloat(v) <= parseFloat(p);
        },
        egt: function egt(v, p) {
          return parseFloat(v) >= parseFloat(p);
        },
        //整数
        integer: function integer(v) {
          return !isNaN(v) && parseInt(v) == parseFloat(v);
        },
        'in': function _in() {
          for (var i = 1, len = arguments.length; i < len; i++) {
            if (arguments[0] == arguments[i]) return true;
          }

          return false;
        },
        notIn: function notIn() {
          for (var i = 1, len = arguments.length; i < len; i++) {
            if (arguments[0] == arguments[i]) return false;
          }

          return true;
        },
        "float": function float(v) {
          return /^[-+]?[0-9]*\.?[0-9]*$/.test(v);
        },
        bool: function bool(v) {
          return this.validateRules["boolean"](v);
        },
        "boolean": function boolean(v) {
          if (typeof v == 'boolean') {
            return true;
          }

          if (v == 'true' || v == 'false') {
            return true;
          }

          return false;
        },
        array: function array(v) {
          return Array.isArray(v);
        },
        accepted: function accepted(v) {
          return v == 'yes' || v == 'on' || parseInt(v) == 1;
        },
        length: function length(v, min, max) {
          if (!max) {
            return (v + '').length == parseInt(min);
          }

          return (v + '').length >= min && (v + '').length <= max;
        }
      };
      this.message = {
        'number': '$0只能是数字',
        'integer': '$0只能填整数',
        'float': '$0只能浮点数',
        'boolean': '$0只能填布尔值',
        'bool': '$0只能填布尔值',
        'email': '$0格式不正确',
        'array': '$0数据类型不正确',
        'accepted': '$0必须同意',
        'chinese': '$0只能是中文',
        'idcard': '$0格式不正确',
        'mobile': '$0格式不正确',
        'require': '$0不能为空',
        'length': '$0长度只能是$1到$2个字符',
        'length:1': '$0长度只能是$1',
        'min': '$0的长度至少$1个',
        'max': '$0的长度不能超过$1个',
        'eq': '$0只能是$1',
        'neq': '$0不能为$1',
        'gt': '$0需要大于$1',
        '>': '$0需要大于$1',
        'lt': '$0需要小于$1',
        '<': '$0需要小于$1',
        'egt': '$0需要大于等于$1',
        '>=': '$0需要大于等于$1',
        'elt': '$0需要小于等于$1',
        '<=': '$0需要小于等于$1',
        'between': '$0值只能在$1到$2之间',
        'in': '$0只能取$n',
        'notIn': '$0不能在$n之间',
        'confirm': '$0与:1不一致'
      };
      this.data = {};
    }
    /**
     * 扩展规则
     * 
     */


    _createClass(Validate, [{
      key: "rule",
      value: function rule() {}
      /**
       * 验证参数
       * @param {} rule
       * 
       * 
       */

    }, {
      key: "parse",
      value: function parse(rule) {
        var rules = rule.split('|'); //读取规则配置

        var rulesConfig = {};

        for (var x in rules) {
          var xrule = rules[x]; //

          var ruleParam = xrule.split(':');
          var paramName = ruleParam[0]; //调用函数的参数

          var paramArgs = ruleParam[1] ? ruleParam[1].split(',') : [];
          rulesConfig[paramName] = {
            name: paramName,
            args: paramArgs
          };
        }

        return rulesConfig;
      }
      /** 验证
       * 
       * @param {*} data 
       * @param {Bool} allField 是否验证 所有字段? default false
       * @param {Bool} allField 是否验证 字段里的 所有规则? default false
       * @return {Bool} 是否验证通过
       */

    }, {
      key: "check",
      value: function check(data, allField, allRule) {
        var _this = this;

        this.validateDatas = data; //验证错误列表
        this.errorMsgs = [];
        this.errorMsg = '';
        allField = allField || false;
        allRule = allRule || false;
        this.data = data;

        var _loop = function _loop() {
          var pName = x,
              pNameShow = pName;
          var rule = _this.rule[x]; //参数中文名

          var pNameParse = pName.split('|');

          if (pNameParse.length > 1) {
            pName = pNameParse[0];
            pNameShow = pNameParse[1];
          } //解析规则


          rules = _this.parse(rule);

          if (_this.debug) ; //验证规则


          var rulesMatchLog = [];

          var _loop3 = function _loop3() {
            rulesMatchLog.push('开始验证' + vName);
            var vArgs = rules[vName].args; //用于验证判断的参数

            if (!_this.validateRules.require(data[pName]) && !rules['require']) {
              rulesMatchLog.push('没有填写可以不验证的');
              return "continue";
            } // console.log(vName,pName,data[pName]);
            // console.log(this.validateRules[vName],typeof this.validateRules[vName]);


            if (!_this.validateRules[vName]) {
              rulesMatchLog.push("\u672A\u5B9A\u4E49\u9A8C\u8BC1\u89C4\u5219".concat(vName));
              return "continue";
            }

            var ret = typeof _this.validateRules[vName] == "function" ? _this.validateRules[vName].apply(_this, [data[pName]].concat(_toConsumableArray(vArgs))) : _this.validateRules[vName].test(data[pName]);
            rulesMatchLog.push({
              vArgs: vArgs,
              data: data[pName],
              validate: vName,
              status: ret ? '成功' : '失败'
            }); //验证失败读取错误消息

            if (!ret) {
              var msg = "".concat(pNameShow, "\u53C2\u6570\u9519\u8BEF"); //配置的消息

              if (_this.messageRuleSetting["".concat(pName, ".").concat(vName)]) {
                msg = _this.messageRuleSetting["".concat(pName, ".").concat(vName)];
              } //通过名称配置的消息
              else if (_this.messageRuleSetting[pName]) {
                  msg = _this.messageRuleSetting[pName];
                } //默认配置消息
                else {
                    if (_this.message[vName]) {
                      var vArgsLength = vArgs.length;
                      msg = (_this.message[vName + ":" + vArgsLength] || _this.message[vName]).replace(/\$([\din])+/g, function (s, r) {
                        if (s == '$0') return pNameShow; //in判断消息

                        if (s == '$n') return vArgs.join(','); //按序列的消息

                        var matchs = s.match(/\$([\dn]+)/);
                        var index = parseInt(matchs[1]);
                        return vArgs[index - 1];
                      });
                    }
                  } // 错误消息记录
              // let msg = this.message[vName] ? this.message[vName] : `${vName}参数错误`;


              _this.errorMsgs.push({
                field: pName,
                name: pNameShow,
                rule: vName,
                msg: msg,
                args: vArgs
              });

              if (!allRule) return "break";
            }
          };

          _loop2: for (vName in rules) {
            var _ret2 = _loop3();

            switch (_ret2) {
              case "continue":
                continue;

              case "break":
                break _loop2;
            }
          }

          if (_this.debug) {
            console.log(rulesMatchLog);
          }

          if (_this.errorMsgs.length) {
            _this.errorMsg = _this.errorMsgs[0].msg;

            if (!allField) {
              return "break";
            }
          }
        };

        for (var x in this.rule) {
          var rules;
          var vName;

          var _ret = _loop();

          if (_ret === "break") break;
        }

        if (this.errorMsgs.length) {
          return false;
        }

        return true;
      }
      /**
       * 获取本次执行验证时的数据
       * 
       */

    }, {
      key: "getValidateData",
      value: function getValidateData() {
        return this.validateDatas;
      } //错误消息

    }, {
      key: "getError",
      value: function getError() {
        return this.errorMsg;
      }
    }, {
      key: "getErrorInfo",
      value: function getErrorInfo() {
        return this.errorMsgs[0];
      } //所有错误消息 当check(data,true)时才会验证所有的

    }, {
      key: "getErrors",
      value: function getErrors() {
        return this.errorMsgs;
      } //错误的字段

    }, {
      key: "getErrorField",
      value: function getErrorField() {
        if (!this.errorMsgs.length) return false;
        return this.errorMsgs[0].field;
      }
      /**
       * 解析规则配置, 生成一个规则配置
       */

    }, {
      key: "getRules",
      value: function getRules(str) {}
    }]);

    return Validate;
  }();

  return Validate;

})));
