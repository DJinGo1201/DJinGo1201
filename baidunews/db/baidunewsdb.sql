-- phpMyAdmin SQL Dump
-- version 4.0.4.1
-- http://www.phpmyadmin.net
--
-- 主机: 127.0.0.1
-- 生成日期: 2016 �?01 �?13 �?07:53
-- 服务器版本: 5.6.11
-- PHP 版本: 5.5.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `baidunewsdb`
--
CREATE DATABASE IF NOT EXISTS `baidunewsdb` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `baidunewsdb`;

-- --------------------------------------------------------

--
-- 表的结构 `category`
--

CREATE TABLE IF NOT EXISTS `category` (
  `categoryId` int(11) NOT NULL AUTO_INCREMENT,
  `categoryName` text NOT NULL,
  `describe` text NOT NULL,
  `date` text NOT NULL,
  PRIMARY KEY (`categoryId`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=12 ;

--
-- 转存表中的数据 `category`
--

INSERT INTO `category` (`categoryId`, `categoryName`, `describe`, `date`) VALUES
(1, '推荐', '推荐', '2016-01-10 12:16:24'),
(2, '百家', '百家', '2016-01-08 23:52:05'),
(4, '国际', '国际', '2016-01-10 12:13:02'),
(5, '国内', '国内', '2016-01-10 14:06:41'),
(6, '科技', '科技', '2016-01-10 16:42:55'),
(7, '互联网', '互联网', '2016-01-10 16:43:33'),
(8, '体育', '体育', '2016-01-10 16:43:53'),
(9, '游戏', '游戏', '2016-01-10 16:44:11'),
(10, '娱乐', '娱乐', '2016-01-10 16:44:30'),
(11, '社会', '社会', '2016-01-10 16:45:16');

-- --------------------------------------------------------

--
-- 表的结构 `news`
--

CREATE TABLE IF NOT EXISTS `news` (
  `newsId` int(11) NOT NULL AUTO_INCREMENT,
  `newsTitle` text NOT NULL,
  `newsImages` text NOT NULL,
  `newsContent` text NOT NULL,
  `newsSource` text NOT NULL,
  `date` text NOT NULL,
  `categoryId` int(11) NOT NULL,
  `categoryName` text NOT NULL,
  PRIMARY KEY (`newsId`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=29 ;

--
-- 转存表中的数据 `news`
--

INSERT INTO `news` (`newsId`, `newsTitle`, `newsImages`, `newsContent`, `newsSource`, `date`, `categoryId`, `categoryName`) VALUES
(17, '国家网信办谈快播案：所有网站都应对传播内容承担法律责任', 'http://g.hiphotos.baidu.com/news/q%3D100/sign=34a7743b0e24ab18e616e53705fbe69a/dbb44aed2e738bd4d5dd232ca68b87d6277ff92b.jpg', '国家网信办谈快播案：所有网站都应对传播内容承担法律责任', '搜狐新闻', '2016-01-11 18:26:59', 1, '推荐'),
(18, '华尔街日报谈小米：核心技术不足，需证明自身价值', 'http://t10.baidu.com/it/u=http://img.ithome.com/newsuploadfiles/2016/1/20160111_112750_300.jpg&fm=36', '《华尔街日报》网络版发表文章称，去年初，小米还是全球估值最高的科技创业公司，占据中国智能机市场的头把交椅。经过一年的发展后，小米的智能机年销量未达预期，460亿美元高估值受到了投资者的质疑，中国第一大智能机制造商的地位被华为夺走。文章指出，小米目前的不利局面，一方面是受到宏观因素的影响，中国经济增长放缓，股市动荡；另一方面，小米自身还有很多不足，例如粉丝群单一，芯片技术缺失，专利组合薄弱阻碍海外市场扩张等。', 'IT之家', '2016-01-11 18:28:48', 1, '推荐'),
(19, '李嘉诚为什么说“2016年生意难做”', 'http://c.hiphotos.baidu.com/news/crop%3D0%2C9%2C386%2C232%3Bw%3D638/sign=cc0278e17bd98d10629b56711c0f9437/9e3df8dcd100baa12fcea9a64010b912c9fc2ec9.jpg', '2015福布斯香港富豪榜近日新鲜出炉，榜首仍是坐拥313亿美元身家的李嘉诚，他已连续17年成为香港首富。不过，最近有报道称这位知名首富在与员工的聚餐时，称2016年生意非常难做。他说：“今年生意好多方面大家都要努力点儿，如果不这样，会非常难做。（香港）旅游业下跌，出入口也跌，酒店收入减少，好多方面都要大家努力点儿。”', '百家原创', '2016-01-11 18:31:10', 1, '推荐'),
(20, '吴敬琏:2015政策刺激完全没用', 'http://t10.baidu.com/it/u=http://k.sinaimg.cn/n/finance/20160110/UhLp-fxnkkuy7838868.jpg/w164h118l50t111b.jpg&fm=36', '新浪财经讯 1月10日消息，今日在第七届中国经济前瞻论坛上，国务院发展研究中心研究员、著名经济学家吴敬琏表示，经济面临严峻挑战，政府主要的办法是加强刺激，而加强刺激造成的结果就是国家资产负债率过高，杠杆率越来越高，若不消化，风险积累就会越来越大，发生系统性风险的概率就会越高。同时，其表示，刺激政策其实效果递减，到2015年已完全没用', '新浪财经', '2016-01-11 18:33:12', 1, '推荐'),
(21, '“北京人外地人对骂”视频当事人系演员', 'http://c.hiphotos.baidu.com/news/q%3D100/sign=dcb9d657ddb44aed5f4ebae4831d876a/9922720e0cf3d7ca216aea6bf51fbe096b63a90b.jpg', '1月9日，一段两名男子在北京地铁6号线上对骂的视频在网上热传。在这个名为“北京男子地铁与人对骂：是不是卖早点的？别来北京！”的视频中，分别作为“北京人”和“外地人”的两名男子互相谩骂引发众多网友热议，同时也有细心网友发现这个视频疑点颇多、疑似摆拍。（《北京青年报》1月10日报道）', '北京青年网', '2016-01-11 18:38:19', 1, '推荐'),
(22, '工商银行究竟是不是腾讯背后的大哥？', 'http://t10.baidu.com/it/u=http://f.hiphotos.baidu.com/news/w%3D638/sign=96b2cb52cd8065387beaa710afdca115/9a504fc2d5628535e07c9c3d97ef76c6a7ef6309.jpg&fm=37', '有一个流传甚广的美丽传说：“工商银行拥有20％南非标准银行股份，而南非标准银行控股南非报业（Naspers）。”然后呢？南非报业拥有34%的腾讯股份，无限遐想。这是一个似是而非的说法，事实与误会交织。如果传说到此为止，也没有什么了不起，但硬是有人创造性地基于这种说法，在工商银行、南非标准银行、南非报业、腾讯之间，建立起了莫须有的联结，从而将工商银行大跨度地想象为腾讯背后的大哥，腾讯的“隐形实际控制人”，并将腾讯说成是某种形式的国有企业。工商银行莫名其妙地躺枪了，其荒唐是显而易见的，同样显而易见的是，这种说法，已经广为传播，并登堂入室被广为接受。杰罗姆的长篇述评《拥有腾讯的南非报业，苦苦寻找下一个腾讯》后面的评论中，充斥着这个传说。读完本文，你对于这个传说，一定可以有自己的立场。呵呵，其实，不看，也可以有立场。', '为你优选', '2016-01-11 18:41:37', 1, '推荐'),
(23, '滴滴2015成绩单：年订单14.3亿 ', 'http://f.hiphotos.baidu.com/news/crop%3D0%2C14%2C600%2C360%3Bw%3D638/sign=990fdbc0f71f3a294e878f8ea4159000/64380cd7912397ddb41fe21a5e82b2b7d0a2874d.jpg', '1月11日消息，滴滴出行首次对外公布了2015年全年订单数。在过去一年里，滴滴出行全平台（出租车、专车、快车、顺风车、代驾、巴士、试驾、企业版）订单总量达到14.3亿，这一数字相当于美国2015年所有出租车订单量（约8亿，数据来源：IBISWorld及Statistic Brain）的近两倍，更是超越了已成立6年的Uber刚刚在去年圣诞节实现的累计10亿订单数。', '滴滴出行', '2016-01-11 18:43:27', 2, '百家'),
(24, '在线匿名之父意欲终结“加密战争”', 'http://e.hiphotos.baidu.com/news/w%3D638/sign=1e552cda1cd5ad6eaaf967e9b9cb39a3/4afbfbedab64034fb4bed518a8c379310a551db8.jpg', '自大卫·乔姆为在线匿名性提出奠基性想法以来，引发了持续至今的“加密战争”，也就是今天隐私倡导者和政府之间的冲突和大争论。如今，乔姆带着他十年前发明的在线隐私解决方案归来，他想做的是，终结这场已经持续了30多年的加密战争。', '王小瑞', '2016-01-11 18:44:54', 2, '百家'),
(25, '三年建构了生态：读《微信力量》', 'http://b.hiphotos.baidu.com/news/w%3D638/sign=ff1ce5f8aa6eddc426e7b7f801dab6a2/faedab64034f78f006de51ee7e310a55b2191cd2.jpg', '在中国，桌面互联网折腾了十一年之久，网络人口才算过亿。而移动呢？2015年我们已经拥有7-8亿移动互联网人口。人口红利迅速消失。微博起步于09年，到了11年，微信推出时，移动互联网人口依然在急速攀升。人口红利对一个水平应用的推动力是不可忽视的。12年，微信公众账号开始内测，中国移动人口达到5.7亿。今天，依然有可能会出现某种应用，与微信分庭抗礼。但说要出现微信取代微博成为现象级产品这个更替的可能性已然微乎其微，因为大环境已经不具备这种外在的推动力。除非，我们有了一个新的硬件成为我们的中心。', '魏武挥', '2016-01-11 18:47:48', 2, '百家'),
(26, '大实话：这才是蘑菇街美丽说合并背后的秘密！', 'http://e.hiphotos.baidu.com/news/crop%3D0%2C1%2C346%2C208%3Bw%3D638/sign=72a7e9155443fbf2d163fc638d4ee6b1/a71ea8d3fd1f413423f1c963221f95cad0c85eed.jpg', '话说，一早起来，八姐就看到了蘑菇街和美丽说正式宣布合并的消息。然后，其实我要说的是，爱马，这合并跟八姐我之前的预言爆料也太一样一样的了吧，嘿嘿，请叫我神算子。', '开八', '2016-01-11 18:49:06', 2, '百家'),
(27, 'VR概念被A股热炒 究竟是虚拟还是现实？', 'http://h.hiphotos.baidu.com/news/w%3D638/sign=bdb9a50116dfa9ecfd2e55145ad1f754/bf096b63f6246b6043597569ecf81a4c510fa25c.jpg', '去年年底，VR公司蚁视科技获得A股上市公司高新兴（股票代码300098）3亿元人民币投资。随后，有科技媒体根据高新兴发布的公告，对蚁视此轮融资额提出质疑，引起业内关注。且不去计较个中实情，至少，透过这件事，我们隐约可以看到，VR创业企业和A股上市公司之间颇为微妙的关系', '电科技', '2016-01-11 18:52:17', 2, '百家'),
(28, '蘑菇街美丽说宣布合并，高瓴、腾讯为幕后推手', 'http://d.hiphotos.baidu.com/news/crop%3D0%2C2%2C698%2C419%3Bw%3D638/sign=b777581834fa828bc56cc7a3c02f6d06/aec379310a55b319e08d5e6844a98226cffc17b2.jpg', '蘑菇街和美丽说的合并传闻终于落实了，这也是2016年首个互联网行业的合并事件。1月11日，社会化电商平台蘑菇街宣布正式合并美丽说。在正式宣布合并前，美丽说已经在2014年8月完成了E轮融资，数额不详，估值近10亿美元。蘑菇街也在去年11月完成了2亿美元的D轮融资，估值近20亿美元', '胡联网绉刊', '2016-01-11 18:52:04', 2, '百家');

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `userid` int(11) NOT NULL AUTO_INCREMENT,
  `username` text NOT NULL,
  `password` text NOT NULL,
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=9 ;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`userid`, `username`, `password`) VALUES
(4, 'admin', '123456'),
(5, 'admin2', '123456'),
(7, 'admin3', '123456'),
(8, 'admin4', '123456');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
