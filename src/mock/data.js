export const base = [
  {title: "主题", value: "column"}, 
  {title: "篇名", value: "title"},
  {title: "全文", value: "directory"}, 
  {title: "作者", value: "author"}, 
  {title: "出版社", value: "press"}, 
  {title: "摘要", value: "abstract"}, 
  {title: "来源", value: "tags"},
  {title: "关键词", value: "keywords"}
]

export const relevance = [
  {title: "相关度", value: "relevance"},
  {title: "下载频次", value: "views"}, 
  {title: "被引频次", value: "views"},
  {title: "最近发表", value: "date"}, 
  {title: "历史发表", value: "date", order: "asc"}
]

export const documentType = [
  {title: "全部", value: "all"},
  {title: "全部期刊", value: "theme", subList: [
    {title: "核心期刊", value: "title"},
    {title: "SCI(科学引文索引)", value: "fullText"}, 
    {title: "EI(工程索引)", value: "author"},
    {title: "CSSC(中文社会科学索引)", value: "author"}
  ]}, 
  {title: "学位论文", value: "title", subList: [
    {title: "博士论文", value: "title"},
    {title: "硕士论文", value: "fullText"}
  ]},
  {title: "会议论文", value: "fullText"}, 
  {title: "重要报纸", value: "author"}
]

export const allDocuments = [
  {title: "全部文献", value: "all"}, 
  {title: "全部期刊", value: "title"},
  {title: "博士论文", value: "fullText"}, 
  {title: "硕士论文", value: "author"}, 
  {title: "会议论文", value: "unit"}, 
  {title: "报纸文献", value: "abstract"}
]

export const ageLimit = [
  {title: "全部", value: "all"}, 
  {title: "近三年", value: "three"},
  {title: "近五年", value: "five"}, 
  {title: "近十年", value: "ten"}, 
  {title: "自定义", value: "diy"}
]

export const api = require("@/mock/api")

export const sideList = [
  {title: "信息", list: ["无线电电子学","电信技术","计算机硬件技术"]}, 
  {title: "医药", list: ["中医学","中药学","中西医结合"]},
  {title: "经济", list: ["经济统计","农艺经济","工业经济"]}, 
  {title: "农业", list: ["园艺","林业","农艺学"]}, 
  {title: "工程I", list: ["化学","无机化工","有机化工"]}, 
  {title: "工程II", list: ["机械工业","铁路运输","汽车工业"]}, 
  {title: "理工", list: ["数学","力学","物理学"]}, 
  {title: "人文", list: ["中国文学","地理","文化"]},
  {title: "社科I", list: ["马克思主义","中国共产党","政治学"]},
  {title: "社科II", list: ["名族学","学前教育","初等教育"]}
]

export const searchs = ["web前端开发","web of science","websocket 教程","websocket测试工具",
"webpack","web微信","webstorm","web wechat","websocket","webservice"]

export const degree = [
  {title: "导师", value: "mentor"}, 
  {title: "目录", value: "directory"},
  {title: "授予单位", value: "grantingUnits "}, 
  {title: "参考文献", value: "reference"}
]

export const infos = [
  {title: "非线性科学与系统科学", nums: "4", authors: "3"}, 
  {title: "物理学", nums: "3", authors: "3"},
  {title: "地质学", nums: "4", authors: "4"}, 
  {title: "生物学", nums: "1", authors: "1"}
]

export const meeting = [
  {title: "会议名称", value: "name"}, 
  {title: "论文集", value: "memoir"}
]

export const filtrateCon = [
  {title: "学科", parms: "subject", list: [
    {title: "计算机软件及计算机应用", num: "3272"},
    {title: "互联网技术", num: "1383"},
    {title: "自动化技术", num: "159"}
  ]}, 
  {title: "研究层次", parms: "level", list: [
    {title: "工程技术(自科)", num: "3858"},
    {title: "基础与应用基础研究(自科)", num: "836"},
    {title: "基础研究(社科)", num: "251"}
  ]},
  {title: "机构", parms: "organization", list: [
    {title: "电子科技大学", num: "362"},
    {title: "吉林大学", num: "231"},
    {title: "北京邮电大学", num: "115"}
  ]}, 
  {title: "作者", parms: "author", list: [
    {title: "杨生举", num: "8"},
    {title: "徐辉", num: "7"},
    {title: "颜桂定", num: "7"}
  ]}
]

export default {
  base,
  relevance,
  documentType,
  degree,
  meeting,
  api
}