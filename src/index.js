class Validate {

    constructor(rule, msg) {
        this.rule = rule;
        this.messageRuleSetting = msg || {};
        this.errorMsg = 'error';
        this.errorMsgs = [];
        this.debug = false;

        //内置验证规则
        this.validateRules = {
            email: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
            number: /^-?\d*\.?\d+$/,
            chinese: /^[\u4e00-\u9fa5]+$/,
            idcard: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
            mobile: /^[1][3-9][0-9]{9}$/,
            //必选
            require(val) {
                return !(val === null || val === undefined || val === '');
            },
            max(v, pmax) {
                return !(('' + v).length > parseInt(pmax));
            },
            min(v, vmin) {
                return !(('' + v).length < parseInt(vmin));
            },

            //大于
            '<': function () {
                return this.validateRules.lt(...arguments);
            },
            '>': function () {

                return this.validateRules.gt(...arguments);
            },
            '<=': function () {
                return this.validateRules.elt(...arguments);
            },
            '>=': function () {
                return this.validateRules.egt(...arguments);
            },
            lt(v, p) {
                return parseFloat(v) < parseFloat(p);
            },
            gt(v, p) {

                return parseFloat(v) > parseFloat(p);
            },
            elt(v, p) {
                return parseFloat(v) <= parseFloat(p);
            },
            egt(v, p) {
                return parseFloat(v) >= parseFloat(p);
            },
            //整数
            integer(v) {
                return (!isNaN(v)) && (parseInt(v) == parseFloat(v));
            },
            'in': function () {
                for (let i = 1, len = arguments.length; i < len; i++)
                    if (arguments[0] == arguments[i])
                        return true;
                return false;
            },
            notIn: function () {
                for (let i = 1, len = arguments.length; i < len; i++)
                    if (arguments[0] == arguments[i])
                        return false;
                return true;
            },
            float: function (v) {
                return /^[-+]?[0-9]*\.?[0-9]*$/.test(v);
            },
            bool: function (v) {
                return this.validateRules.boolean(v);
            },
            boolean(v) {
                if (typeof v == 'boolean') {
                    return true;
                }
                if (v == 'true' || v == 'false') {
                    return true;
                }
                return false;
            },
            array(v) {
                return Array.isArray(v);
            },
            accepted(v) {
                return (v == 'yes' || v == 'on' || parseInt(v) == 1);
            },
            length(v, min, max) {
                if (!max) {
                    return (v + '').length == parseInt(min);
                }
                return ((v + '').length >= min && (v + '').length <= max);
            },
        }

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
    rule() {

    }

    /**
     * 验证参数
     * @param {} rule 
     */
    parse(rule) {
        let rules = rule.split('|')
        //读取规则配置
        let rulesConfig = {};
        for (var x in rules) {
            let xrule = rules[x];
            //
            let ruleParam = xrule.split(':');
            let paramName = ruleParam[0];
            //调用函数的参数
            let paramArgs = ruleParam[1] ? ruleParam[1].split(',') : [];

            rulesConfig[paramName] = {
                name: paramName,
                args: paramArgs
            };
        }
        return rulesConfig
    }

    /** 验证
     * 
     * @param {*} data 
     * @param {Bool} allField 是否验证 所有字段?
     * @param {Bool} allField 是否验证 字段里的 所有规则?
     */
    check(data, allField, allRule) {
        //验证错误列表
        let errors = [];
        this.errorMsgs = [];
        this.errorMsg = '';
        allField = allField || false;
        allRule = allRule || false;

        this.data = data;

        for (var x in this.rule) {
            let pName = x, pNameShow = pName;
            let rule = this.rule[x];

            //参数中文名
            let pNameParse = pName.split('|');
            if (pNameParse.length > 1) {
                pName = pNameParse[0]
                pNameShow = pNameParse[1]
            }

            //解析规则
            var rules = this.parse(rule);
            if (this.debug) {
                console.log('解析规则', rules)
            }
            //验证规则
            let rulesMatchLog = [];
            for (var vName in rules) {
                rulesMatchLog.push('开始验证' + vName);
                let vArgs = rules[vName].args; //用于验证判断的参数

                if (!this.validateRules.require(data[pName]) && !rules['require']) {
                    rulesMatchLog.push('没有填写可以不验证的');
                    continue;
                }
                // console.log(vName,pName,data[pName]);
                // console.log(this.validateRules[vName],typeof this.validateRules[vName]);
                if (!this.validateRules[vName]) {
                    console.log(`未定义验证规则${vName}`);
                    rulesMatchLog.push(`未定义验证规则${vName}`);
                    continue;
                }
                let ret = (typeof this.validateRules[vName] == "function") ?
                    this.validateRules[vName].apply(this, [data[pName], ...vArgs]) :
                    this.validateRules[vName].test(data[pName]);

                rulesMatchLog.push({
                    vArgs: vArgs,
                    data: data[pName],
                    validate: vName,
                    status: ret ? '成功' : '失败'
                });
                //验证失败读取错误消息
                if (!ret) {

                    let msg = `${pNameShow}参数错误`
                    //配置的消息
                    if (this.messageRuleSetting[`${pName}.${vName}`]) {
                        msg = this.messageRuleSetting[`${pName}.${vName}`];
                    }
                    //通过名称配置的消息
                    else if (this.messageRuleSetting[pName]) {
                        msg = this.messageRuleSetting[pName];
                    }
                    //默认配置消息
                    else {
                        if (this.message[vName]) {
                            let vArgsLength = vArgs.length;
                            msg = (this.message[vName + ":" + vArgsLength] || this.message[vName]).replace(/\$([\din])+/g, (s, r) => {
                                if (s == '$0')
                                    return pNameShow;
                                //in判断消息
                                if (s == '$n')
                                    return vArgs.join(',');
                                //按序列的消息
                                let matchs = s.match(/\$([\dn]+)/);
                                let index = parseInt(matchs[1]);

                                return vArgs[index - 1];
                            })
                        }
                    }
                    // 错误消息记录
                    // let msg = this.message[vName] ? this.message[vName] : `${vName}参数错误`;
                    this.errorMsgs.push(
                        {
                            field: pName,
                            name: pNameShow,
                            rule: vName,
                            msg: msg,
                            args: vArgs,
                        }
                    )

                    if (!allRule)
                        break;
                }
            }
            if (this.debug) {
                console.log(rulesMatchLog);
            }
            if (this.errorMsgs.length) {
                this.errorMsg = this.errorMsgs[0].msg;
                if (!allField) {
                    break;
                }
            }
        }

        if (this.errorMsgs.length) {
            return false;
        }

        return true;
    }

    //错误消息
    getError() {
        return this.errorMsg;
    }
    getErrorInfo() {
        return this.errorMsgs[0];
    }

    //所有错误消息 当check(data,true)时才会验证所有的
    getErrors() {
        return this.errorMsgs;
    }
    //错误的字段
    getErrorField() {
        if (!this.errorMsgs.length) return false;
        return this.errorMsgs[0].field;
    }

    /**
     * 解析规则配置, 生成一个规则配置
     */
    getRules(str) {

    }

}

module.exports = Validate