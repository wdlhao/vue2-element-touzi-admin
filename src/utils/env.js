const github = 'https://github.com/wdlhao/vue2-element-touzi-admin';
const appUrl = process.env.VUE_APP_URL  // development和production环境是不同的
const shareUrl = 'https://juejin.im/post/5d0b4d28f265da1baf7cf293'
const shareTitle = '用Vue-cli3+element+mockjs 实现后台管理权限系统及顶栏三级菜单显示';
const weibo = {
    'weiboUrl': 'http://service.weibo.com/share/share.php',
    'weiboAppkey' : '2003962826',
    'pic':'https://user-gold-cdn.xitu.io/2019/6/20/16b7425dfa01dbf3?imageView2/1/w/1304/h/734/q/85/format/webp/interlace/1'
}
const qq = {
    'baseUrl':'http://connect.qq.com/widget/shareqq/index.html',
    'pic':'https://user-gold-cdn.xitu.io/2019/6/20/16b7425dfa01dbf3?imageView2/1/w/1304/h/734/q/85/format/webp/interlace/1',
    'desc':'最近完成了我的后台管理系统权限功能的实现，同时觉得后台系统所有的菜单都左置，会限制菜单的扩展，因此我改进了三级菜单的显示。',
    'summary':'文章梗概',
    'source':'qzone'
}
const qqZone = {
    'baseUrl':'https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey',
    'pic':'https://user-gold-cdn.xitu.io/2019/6/20/16b7425dfa01dbf3?imageView2/1/w/1304/h/734/q/85/format/webp/interlace/1',
    'desc':'最近完成了我的后台管理系统权限功能的实现，同时觉得后台系统所有的菜单都左置，会限制菜单的扩展，因此我改进了三级菜单的显示。',
    'summary':'文章梗概',
    'site':'qzone'
}
const douban = {
    'baseUrl':'https://www.douban.com/share/service',
    'pic':'https://user-gold-cdn.xitu.io/2019/6/20/16b7425dfa01dbf3?imageView2/1/w/1304/h/734/q/85/format/webp/interlace/1',
}
export {
    appUrl,
    shareUrl,
    shareTitle,
    weibo,
    qq,
    qqZone,
    douban,
    github
}