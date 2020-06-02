/*

 @name    : 锅巴汉化 - Web汉化插件
 @author  : 麦子、JAR、小蓝、好阳光的小锅巴
 @version : V0.6.1 - 2019-07-09
 @website : http://www.g8hh.com

*/

//1.汉化杂项
var cnItems = {
    _OTHER_: [],

    //未分类：
    'Oil': '石油',
    'Plasma': '等离子体',
    'Metal': '金属',
    'Space': '太空',
    'Titanium': '钛',
    'Company': '公司',
    'Convert': '转换',
    'Costs': '花费',
    'Charcoal': '木炭',
    'Big Bertha': '贝尔莎大炮',
    '/Sec': '/秒',
    'Research': '研究',
    'Resources': '资源',
    'Silicon': '硅',
    'Silver': '银',
    'Sol Center': '索尔中心',
    'Solar Panels': '太阳能板',
    'Solar System': '太阳系',
    'Ice': '冰',
    'Ice Drill': '冰钻',
    'Igneous Extruder': '火成岩挤出机',
    'Lava': '岩浆',
    'Lava Extractor': '熔岩提取器',
    'Machines': '机器',
    'Magmatic Dynamo': '岩浆发电机',
    'Each engine produces': '每台发动机生产',
    'Earth Resources': '地球资源',
    'Electron Bath': '电子浴',
    'Empowered Blowtorch': '增压喷灯',
    'Energy': '能源',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',

    //原样
    '': '',
    '': '',

}


//需处理的前缀
var cnPrefix = {
    "(-": "(-",
    "(+": "(+",
    "(": "(",
    "-": "-",
    "+": "+",
    " ": "",
    ": ": "： ",
    "\n										": "",
    "\n								": "",
    "\n						": "",
    "\n		": "",
}

//需处理的后缀
var cnPostfix = {
    ":": "：",
    "：": "：",
    ": ": "： ",
    "： ": "： ",
    " ": "",
    "/s)": "/s)",
    "/s": "/s",
    ")": ")",
    "%": "%",
    "\n": "",
    "\n	": "",
    "\n				": "",
    "\n					": "",
    "\n							": "",
    "\n								": "",
    "\n									": "",
    "\n										": "",
    ",": "",
    ".": "",
}

//需排除的，正则匹配
var cnExcludeWhole = [
    /^x?\d+(\.\d+)?[A-Za-z%]{0,2}(\s.C)?\s*$/, //12.34K,23.4 °C
    /^x?\d+(\.\d+)?(e[+\-]?\d+)?\s*$/, //12.34e+4
    /^\s*$/, //纯空格
    /^\d+(\.\d+)?[A-Za-z]{0,2}.?\(?([+\-]?(\d+(\.\d+)?[A-Za-z]{0,2})?)?$/, //12.34M (+34.34K
    /^(\d+(\.\d+)?[A-Za-z]{0,2}\/s)?.?\(?([+\-]?\d+(\.\d+)?[A-Za-z]{0,2})?\/s\stot$/, //2.74M/s (112.4K/s tot
    /^\d+(\.\d+)?(e[+\-]?\d+)?.?\(?([+\-]?(\d+(\.\d+)?(e[+\-]?\d+)?)?)?$/, //2.177e+6 (+4.01+4
    /^(\d+(\.\d+)?(e[+\-]?\d+)?\/s)?.?\(?([+\-]?(\d+(\.\d+)?(e[+\-]?\d+)?)?)?\/s\stot$/, //2.177e+6/s (+4.01+4/s tot
];
var cnExcludePostfix = [
    /:?\s*x?\d+(\.\d+)?(e[+\-]?\d+)?\s*$/, //12.34e+4
    /:?\s*x?\d+(\.\d+)?[A-Za-z]{0,2}$/, //: 12.34K, x1.5
]

//正则替换，带数字的固定格式句子
//纯数字：(\d+)
//逗号：([\d\.,]+)
//小数点：([\d\.]+)
//原样输出的字段：(.+)
var cnRegReplace = new Map([
    [/^Uses (.+) Energy per second$/, '每秒消耗 $1 能量'],
    [/^Produces (.+) Charcoal per second$/, '每秒生产 $1 木炭'],
    [/^Produces (.+) gem per second$/, '每秒生产 $1 宝石'],
    [/^Produces (.+) Gold per second$/, '每秒生产 $1 黄金'],
    [/^Produces (.+) Lunarite per second$/, '每秒生产 $1 月岩。'],
    [/^Produces (.+) Metal per second$/, '每秒生产 $1 金属'],
    [/^Produces (.+) methane per second$/, '每秒生产 $1 甲烷'],
    [/^Produces (.+) Oil per second$/, '每秒生产 $1 石油'],
    [/^Produces (.+) Plasma per second$/, '每秒生产 $1 等离子体'],
    [/^Produces (.+) silicon per second$/, '每秒生产 $1 硅'],
    [/^Produces (.+) Titanium per second$/, '每秒生产 $1 钛'],
    [/^Produces (.+) Uranium per second$/, '每秒生产 $1 铀'],
    [/^Produces (.+) wood per second$/, '每秒生产 $1 木头'],
    [/^Produces (.+) Helium per second$/, '每秒生产 $1 氦气'],
    [/^Produces (.+) Hydrogen per second$/, '每秒生产 $1 氢气'],
    [/^Produces (.+) Ice per second$/, '每秒生产 $1 冰'],
    [/^Produces (.+) silver per second$/, '每秒生产 $1 银'],
    [/^Produces (.+) Lava per second$/, '每秒生产 $1 岩浆'],
    [/^Produces (.+) Charcoal per second$/, '每秒生产 $1 木炭'],
    [/^Produces (.+) Charcoal per second$/, '每秒生产 $1 木炭'],
    [/^Produces (.+) Charcoal per second$/, '每秒生产 $1 木炭'],
    [/^They produce (.+) Metal per second$/, '他们每秒生产 $1 金属。'],
    [/^They use (.+) Energy per second$/, '他们每秒消耗 $1 能源。'],
    [/^T(.+) Batteries$/, 'T$1 电池'],

]);