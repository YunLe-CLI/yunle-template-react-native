// import rules from './ruleList';

// export interface RULE_TYPE {
// 	"bookSourceGroup":  string; // 书源分组
// 	"bookSourceName": string // 书源的名称
// 	"bookSourceUrl": string; // 书源网址
// 	"enable": boolean; 
// 	"ruleBookContent": string; // 章节内容
// 	"ruleBookLastChapter": string; // 书籍页面里的最新章节
// 	"ruleChapterList": string; // 目录页面的目录列表
// 	"ruleChapterName": string // 目录列表的章节名称
// 	"ruleChapterUrl": string; // 书籍页面里的目录地址
// 	"ruleContentUrl": string; // 目录列表的章节链接
// 	"ruleContentUrlNext": string, // 下一页
// 	"ruleSearchAuthor": string; // 搜索里的作者
// 	"ruleSearchCoverUrl": string; // 搜索里的书封面
// 	"ruleSearchIntroduce": string; // 搜索里的书简介
// 	"ruleSearchList": string; // 搜索列表
// 	"ruleSearchName": string; // 获取搜索里的书名
// 	"ruleSearchNoteUrl": string; // 搜索里的书链接
// 	"ruleSearchUrl": string; // 搜索网址
// 	"serialNumber": number,
// 	"weight": number,
// };

export interface RULE_TYPE {
	"bookSourceGroup"?:  string; // 书源分组
	"bookSourceName"?: string; //书源的名称
	"bookSourceUrl"?: string; //书源的原网站地址
	"ruleSearchUrl"?: string; //书源的搜索地址
	"httpUserAgent"?: string; //浏览器标识，一般用不到
	"loginUrl"?: string; 
	"ruleBookAuthor"?: string; //书籍介绍页的作者
	"ruleBookContent"?: string; //单章节阅读界面的文本获取
	"ruleBookKind"?: string; //书籍种类
	"ruleBookLastChapter"?: string; //书籍最后一章
	"ruleBookName"?: string; //书籍介绍页的书名
	"ruleBookUrlPattern"?: string; // 
	"ruleChapterList"?: string; //总章节列表
	"ruleChapterName"?: string; //单章节名称
	"ruleChapterUrl"?: string; //章节页跳转地址
	"ruleChapterUrlNext"?: string; //章节页跳转地址
	"ruleContentUrl"?: string; //单章节链接地址
	"ruleContentUrlNext"?: string; //单章下一页
	"ruleCoverUrl"?: string; //书籍页封面
	"ruleFindUrl"?: string; //发现功能
	"ruleIntroduce"?: string; //书籍页书籍介绍
	"ruleSearchAuthor"?: string; //搜索结果页的作者
	"ruleSearchCoverUrl"?: string; //搜索结果页的书封面
	"ruleSearchIntroduce"?: string; //搜索结果页的书简介
	"ruleSearchKind"?: string; //搜索结果页的书籍分类
	"ruleSearchLastChapter"?: string; //搜索结果页的最新章节
	"ruleSearchList"?: string; //搜索结果页的书籍显示样式
	"ruleSearchName"?: string; //搜索结果页的书名
	"ruleSearchNoteUrl"?: string; //书籍页跳转链接
	"enable"?: boolean; //是否启用书源
	"serialNumber"?: number; //书源排序
	"weight"?: number; //权重
}

const list:Array<RULE_TYPE> = [
	{
		"bookSourceGroup": "\u79fb\u52a8",
		"bookSourceName": "\u7b14\u8da3\u9601\u79fb\u52a8\u7248",
		"bookSourceUrl": "https://m.biqugetv.com",
		"enable": true,
		"ruleBookContent": "id.chaptercontent@textNodes",
		"ruleBookLastChapter": "class.directoryArea@tag.p.0@tag.a@textNodes",
		"ruleChapterList": "id.chapterlist@tag.p!0",
		"ruleChapterName": "tag.a@textNodes",
		"ruleChapterUrl": "class.recommend1@tag.h2.1@tag.a@href",
		"ruleContentUrl": "tag.a@href",
		"ruleContentUrlNext": "id.pt_next@href",
		"ruleSearchAuthor": "class.author@textNodes",
		"ruleSearchCoverUrl": "class.lazy@data-original",
		"ruleSearchIntroduce": "class.review@textNodes",
		"ruleSearchList": "class.slide-item index_hot1@class.hot_sale1",
		"ruleSearchName": "class.title@textNodes",
		"ruleSearchNoteUrl": "tag.a@href",
		"ruleSearchUrl": "https://m.biqugetv.com/search.php?keyword=searchKey&t=searchPage",
		"serialNumber": 0,
		"weight": 0
	},
	{
		"bookSourceGroup":"A级",
		"bookSourceName":"58小说网",
		"bookSourceUrl":"http://www.58xs.tw",
		"enable":true,
		"httpUserAgent":"",
		"loginUrl":"",
		"ruleBookAuthor":"",
		"ruleBookContent":"id.content@textNodes",
		"ruleBookKind":"",
		"ruleBookLastChapter":"",
		"ruleBookName":"",
		"ruleBookUrlPattern":"",
		"ruleChapterList":"id.list@tag.dd",
		"ruleChapterName":"tag.a@text",
		"ruleChapterUrl":"",
		"ruleChapterUrlNext":"",
		"ruleContentUrl":"tag.a@href",
		"ruleContentUrlNext":"",
		"ruleCoverUrl":"",
		"ruleFindUrl":"",
		"ruleIntroduce":"id.intro@tag.p.0@textNodes",
		"ruleSearchAuthor":"class.result-game-item-info.0@tag.p.0@tag.span.1@text",
		"ruleSearchCoverUrl":"class.result-game-item-pic.0@tag.img.0@src",
		"ruleSearchKind":"class.result-game-item-info.0@tag.p.1@tag.span.1@text",
		"ruleSearchLastChapter":"class.result-game-item-info.0@tag.p.3@tag.a.0@text",
		"ruleSearchList":"class.result-item",
		"ruleSearchName":"class.result-item-title result-game-item-title.0@tag.a.0@text",
		"ruleSearchNoteUrl":"class.result-item-title result-game-item-title.0@tag.a.0@href",
		"ruleSearchUrl":"http://www.58xs.tw/search.php?keyword=searchKey&page=searchPage",
		"serialNumber":0,
		"weight":0
	},
]

const currentRule:RULE_TYPE  = list[0]

export default currentRule;
