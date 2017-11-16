//  常用微信协议
window.wxTools = {
//  微信授权
    getUserInfo: function(callback) {
        var code = wxTools.getQuery('code');
        $.ajax({
            url: Config.weixinUrl + '/WXOAuth/GetUserInfo',
            type: 'get',
            data: {
                code: code || ''
            },
            dataType: 'json',
            success: function(res) {
                if (res.Success && res.Data) {
                    console.info(res);
                    localStorage.userImg = res.Data.HeadImgUrl;
                    localStorage.userName = res.Data.NickName;
                    callback && typeof(callback) == 'function' && callback(res.Data);
                }
                if (res.ErrorCode == '10001') {
                    var redirect_uri = window.location.href;
                    window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + Config.appId + "&redirect_uri=" + redirect_uri + "&response_type=code&scope=snsapi_userinfo&state=#wechat_redirect";
                }
            }
        })
    },
//  获取url中的参数值
    getQuery: function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return r[2];
        return null;
    },
//  初始化分享shareFn,微信转发
    shareSeting: function(defaults) {
//      默认分享内容
        defaults = {
            link: window.location.origin + '/weixin/activity/2017/model/register.html?activityId='+activityId+"&teamId="+teamId,
            title: "我在头等舱，已经领取5000元，你不来嘛？",
            desc: '没时间犹豫了，快上车～赚钱去！',
            imgUrl: window.location.origin + '/weixin/activity/2017/model/img/WXShare.png'
        };
        if (typeof defaults == 'undefined') {
            throw "Share Setting is Null";
            return;
        }
        var Noncestr = getRndStr();
        var str = '';
        var time = new Date().getTime();
        var shareConfig = $.extend({}, defaults);
        $.ajax({
            url: Config.weixinUrl + '/WXJS/GenSignature?hgh=' + Math.floor(Math.random() * 1000),
            dataType: 'json',
            type: 'post',
            async: false,
            data: {
                Noncestr: Noncestr,
                Timestamp: time,
                Url: location.href
            },
            success: function(data2) {
                if (data2.Success && data2.Data) {
                    str = data2.Data;
                }
            }
        });
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: Config.appId, // 必填，公众号的唯一标识
            timestamp: time, // 必填，生成签名的时间戳
            nonceStr: Noncestr, // 必填，生成签名的随机串
            signature: str, // 必填，签名，见附录1
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
        wx.error(function(res) {
            console.log('weixin is error');
        });

        function getRndStr(len) { //生成随机字符串
            len = len || 32;
            var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
            var maxPos = $chars.length;
            var pwd = '';
            for (i = 0; i < len; i++) {
                pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
            }
            return pwd;
        };

        function init() {
            //分享给微信好友
            wx.onMenuShareAppMessage(shareConfig);
            //分享到朋友圈
            wx.onMenuShareTimeline(shareConfig);
            //分享给qq好友
            wx.onMenuShareQQ(shareConfig);
            //分享给qq空间
            wx.onMenuShareQZone(shareConfig);
        }
        wx.ready(init);
    }
};

//  荷包协议等常用工具
window.hbTools = {

//  错误码弹窗
    tipsError: function (res) {
        var Message;
        if(res.ErrorMessage) {
            alert(res.ErrorMessage);
            return;
        }
        switch(res.ErrorCode) {
            case '100001':
                Message = '该用户已参加过活动'
                break;
            case '100002':
                Message = '该手机号已参加过活动'
                break;
            case '100003':
                Message = '手机号未注册'
                break;
            case '100004':
                Message = '部分用户发送体验金失败'
                break;
            case '100005':
                Message = '数据异常'
                break;
            case '100006':
                Message = '活动等级配置错误'
                break;
            case '100007':
                Message = '未参加活动不能得奖'
                break;
            case '100008':
                Message = '活动未开始'
                break;
            case '100009':
                Message = '活动已结束'
                break;
            case '100010':
                Message = '活动领奖时间到期'
                break;
            case '100011':
                Message = '活动已下线'
                break;
            case '100012':
                Message = '奖品不足'
                break;
            case '100013':
                Message = '获取用户数据异常'
                break;
            case '100014':
                Message = '不可重复领奖'
                break;
            case '100015':
                Message = '名称已存在'
                break;
            case '100016':
                Message = '没有资格参加活动'
                break;
            case '100017':
                Message = '用户没有获得到奖励'
                break;
            case '100018':
                Message = '名称非法'
                break;
            case '100019':
                Message = '活动没到领奖时间'
                break;
            case '100020':
                Message = '密码不符合规范'
                break;
            case '100021':
                Message = '手机号码格式不正确'
                break;
            case '100022':
                Message = '验证码不正确'
                break;
            case '100101':
                Message = '用户已经存在团队'
                break;
            case '100102':
                Message = '团队ID不能为空'
                break;
            case '100103':
                Message = '团队找不到'
                break;
            case '100104':
                Message = '团队人数已满'
                break;
            case '100105':
                Message = '成员找不到'
                break;
            default:
                Message = 'error';
                break;
        }
        alert(Message)
    },

//  领取奖励或查看奖励链接
    goPrize: function() {
        window.location.href = "hebao://com.hebao.app/myPrize";
    },

//  充值链接
    goRecharge: function() {
        window.location.href = "hebao://com.hebao.app/recharge";
    },

    canShare: function() {
        window.location.href = "hebao://com.hebao.app/canShare"
    },

//  微信端跳转APP下载页面
    goLoadApp: function() {
        window.location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.hebao.app&ckey=CK1320751940251";// 跳转到App下载页面；
    },

//  活动结束或下线，跳转共用注册页面
    goPublicRegister: function () {
        window.location.href = "http://www.hebaodai.com/channel/newRegister/tid.html";
    },

//  APP分享朋友圈或好友
    shareFriend: function(data, callback) {

        //if (data == '' || data.length < 4) {
        //    throw "Share Setting is Error !";
        //    return;
        //}
        //var title = encodeURIComponent(data);
        var urlWeiXin =
//                    "http://wxhuodong.hebaofinance.com/weixin/activity/2017/twoYears/index_weChat.html?teamId="+teamId+"&activityId="+activityId;//正式环境
                    "http://120.24.230.92/weixin/activity/2017/model/register.html?activityId="+activityId+"&teamId="+teamId; //测试环境
        var title = encodeURIComponent('{"title":"我在头等舱，已经领取5000元，你不来嘛？","content":"没时间犹豫了，快上车～赚钱去！","thumb":"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","url":"' + urlWeiXin + '"}');
        window.location.href = "hebao://com.hebao.app/share?content=" +title+"&activityType=54&type=12";
        callback && callback();
    }
};