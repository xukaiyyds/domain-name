let nian;
let yue;
let tian;
let xiaoshi;
let fenzhong;
let miao

if (Boolean(localStorage.translations)) {
    English();
} else {
    Chinese();
};

/* 自行修改以下信息 */
function Chinese() {
    document.title = "顶级国际域名证书"; // 网站标题
    document.querySelector('.title').textContent = "中国国家顶级域名注册证书"; // 证书名称
    /* 证书描述 */
    document.querySelector('.describe-one').textContent = "域名";
    document.querySelector('.describe-two').textContent = "已由";
    document.querySelector('.describe-three').textContent = "完成注册，并已在国际顶级域名数据库中记录。";
    /* 表格信息 */
    document.querySelector('.domain-name').textContent = "域名";
    document.querySelector('.registrant').textContent = "域名所有者";
    name[0].textContent = "徐凯"; // 域名所有者姓名
    name[1].textContent = name[0].textContent;
    document.querySelector('.registrar').textContent = "域名所属注册机构";
    document.querySelector('.company').textContent = "广州云讯信息科技有限公司";
    document.querySelector('.registration-date').textContent = "域名注册时间";
    document.querySelector('.expiration-date').textContent = "域名到期时间";
    document.querySelector('.usage-duration').textContent = "域名使用时长";
    document.querySelector('.remaining-duration').textContent = "域名剩余时长";
    nian = "年";
    yue = "月";
    tian = "天";
    xiaoshi = "小时";
    fenzhong = "分钟";
    miao = "秒";
}

/* Modify the following information by yourself */
function English() {
    document.title = "Top-level international domain name certificate"; // Website Title
    document.querySelector('.title').textContent = "Certification of Chinese Top Level Domain Name"; // Certificate Name
    /* Certificate Description */
    document.querySelector('.describe-one').textContent = "This is to certify that the domain";
    document.querySelector('.describe-two').textContent = "has been registered by";
    document.querySelector('.describe-three').textContent = ". And the registration havs taken effect since it was put onv records in the database of gTLD (Generic Top Level Domain) and ccTLD (globalTop Level Domain) .";
    /* Table Information */
    document.querySelector('.domain-name').textContent = "Domain Name";
    document.querySelector('.registrant').textContent = "Registrant";
    name[0].textContent = "Xu Kai"; // Registrant Name
    name[1].textContent = name[0].textContent;
    document.querySelector('.registrar').textContent = "Registrar";
    document.querySelector('.company').textContent = "Guangzhou Yunxun Information Technology Co., Ltd";
    document.querySelector('.registration-date').textContent = "Registration Date";
    document.querySelector('.expiration-date').textContent = "Expiration Date";
    document.querySelector('.usage-duration').textContent = "Usage Duration";
    document.querySelector('.remaining-duration').textContent = "Remaining Duration";
    nian = "year";
    yue = "month"
    tian = "day"
    xiaoshi = "hour";
    fenzhong = "minute";
    miao = "second";
}
