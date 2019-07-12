declare module zx {
    var apk: IZXAndroid;
    var native: INative;
    var ad: IAD;
    var plat: IPlat;
    var gameId: number;
    var platId: number;
    var SetInfo: iSetting;
    var chat: IChat;
    /**进入带的参数 */
    var query: any;

    var window: any;
    /**
     * 初始化平台
     * @param plat 平台id，微信2101，厘米秀3108，厘米秀测试3107，测试1100，头条4010
     * @param gameId 游戏id
     * @param version 游戏版本号
     * @param success 初始化成功
     * @param fail 初始化失败
     */
    function init(plat: number, gameId: number, version?: string, success?: Function, fail?: Function);
    
    /**
     * 写入odps埋点
     * @param type 埋点类型
     * @param content 埋点类型对应扩展信息
     */
    function writeOdps(type: string, content: any);

    /**
     * 开启调试信息输出
     * @param bol 
     */
    function setDebug(bol: boolean);
    
    /*** mode 0正式，1开发，2本地 */
    function setPlatMode(mode: number)
    
    /**获取当前游戏的环境，和上面的平台不是一个值,0正式，1测试，2开发*/
    function getMode(): number;
    
    /**版本是否需要更新 */
    function needUpdate(): boolean;
    /**
     * 获取公告列表
     * @param callBack (noticeList:INotice[])=>{}
     */
    function getNotice(callBack: Function);

    /**设置推广按钮默认位置 */
    function setMeueDefaut(x: number, y: number, skin?: string);

    // 是否显示推广按钮
    function setMenuBtn(show:boolean):void;

    /**
     * 获取 设备和apk 相关的信息
     * @param callBack 
     */
    function apkGetSystemInfo(callBack: (info: IApkInfo) => void): void;
}

interface INative {
    //顶部刘海距离
    topY: number;
    gotoUrl?(url: string);
    /**跳转小游戏或小程序 */
    gotoOtherGame?(param: { appId: string, path?: string, gameId?: number, url?: string, success?: Function, fail?: Function });
    /**分享 */
    share?(context: IShareContext, succeed?: Function, fail?: Function, ...args);
    /**设置剪贴板 */
    setClipBord?(msg: string, success?: Function, fail?: Function);
    onShow?(callback: Function);
    offShow?(callback?: Function);
    onHide?(callback: Function);
    offHide?(callback?: Function);
    /**网络请求 */
    httpRequst(any: IRequestOptions);
    timeOnce(delay: number, caller: any, method: Function, ...args);
    clearTimeOnce(timer: any);
    requireJs?(url: string, callBack: Function);
    commitRank?(context: IRankCommitContext, succeed?: Function, fail?: Function, ...args);
    pullRank?(context: IRankPullContext, succeed?: Function, fail?: Function, ...args);
    /**只有facebook有这个 */
    setLoadingProgress?(progress: number);
    /**开始视频录制 */
    recorderStart(opts: IRecorderOpts);
    /**停止视频录制 */
    recorderStop();

    //=========================================apk=============================
    exit?(): void            //apk 退出
    runtimeStart?(): void;
    upgradePack?(version: string, url: string): void;
    clearFileCache?(): void;

    onUpgradeProgress?(callBack: OnUpgradeProgressCallBack): void;
    offUpgradeProgress?();

    onUpgradeComplete?(callBack: () => void): void
    offUpgradeComplete?(): void

    onUpgradeError?(callback: onUpgradeErrorCallBack): void;
    offUpgradeError?(): void

    onExit?(callBack: OnExitCallBack): void;
    offExit?(): void;

    onLoginCancel?(callBack: OnLoginCancelCallBack): void;
    offLoginCancel?(): void

    onLoginOut?(callBack: OnLoginOutCallback): void;
    offLoginOut?(): void;

    onError?(callBack: OnErrorCallback): void;
    offError?(): void

    hideFirstLoading?(): void;
}

interface IPlat {

    init(success?: Function, fail?: Function);  //初始化         
    
    /**
     * @param money 消费的钻石
     * @param success 成功回调
     * @param fail 失败回调
     * @param behavior 消费的标记信息
     **/
    pay(money: number, success?: Function, fail?: Function, behavior?: string);   //消耗钻石

    /**
     * 给玩家赠送钻石，赠送每日有额度，需要找平台管理员设置，最大9999
     * @param money 赠送的钻石
     * @param success 成功回调
     * @param fail 失败回调
     * @param behavior 消费的标记信息
     **/
    present(money: number, success?: Function, fail?: Function, behavior?: string); //赠送砖石
    
    /**
     * @param rmb 充值人民币金额
     * @param success 成功回调(res:{money:number},orderId:string)=>{}
     * @param fail 失败回调(orderId:string)=>{}
     * @param isSandbox 是否沙箱充值，默认false
     * @param note 充值扩展信息，用于校验订单
     */
    recharge(rmb: number, success?: Function, fail?: Function, isSandbox?: boolean, note?: any, shopInfo?: IShopInfo);  //充值

    /**
     * @param success 订单补发
     * @param fail 
     */
    onRecharge?(success?: Function, fail?: Function, complete?: Function);  //充值

    /**登录 */
    login(d: iLoginResponse);       //登录
    /**获取用户信息授权 */
    getUser?(d: iLoginResponse);    //用户登录
    hideUserBtn?();                 //隐藏用户登陆按钮
    /**分享，此分享接入了平台后台的分享信息配置，会自动带上账号信息。游戏开发请使用这个分享接口 */
    share(context: IShareContext, succeed?: Function, fail?: Function, ...args): void;  //分享

    platConfig: any;                                        //配置
    user: iZXUser;                                          //平台用户
    platUser: iPlatUser;                                    //第三方用户

    // ● -2：实名认证失败
    // ● -1：未实名认证 
    // ● 0：已实名未成年
    // ● 1：已实名已成年(如当前渠道不存在实名认证接口，将默认返回1)
    realName?(callBack: (res: { code: number }) => void): void

}

interface IAD {
    createBanner(op: IAdBannerOptions): IADBanner;
    createVedio(op: IAdVedioOptions): IADVedio;
    loadVedio(op: IAdVedioOptions, success?: Function, fail?: Function, ...args);
    playVedio(op: IAdVedioOptions, success: (isEnd: boolean) => void, fail?: Function, ...args);
}

type DataResponseCallback = (res: DataResponse) => void;
type ResponseCallback = (res: any) => void;
interface DataResponse {
    success: boolean,
    data: any;
    code?: number;
}

interface IRequestOptions {
    /** 开发者服务器接口地址 */
    url: string;
    /** 请求的参数 */
    data?: string | any;
    /** 设置请求的 header , header 中不能设置 Referer */
    header?: string[];
    /** 默认为 GET，有效值：OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT */
    method?: string;
    /** 收到开发者服务成功返回的回调函数，res = {data: '开发者服务器返回的内容'} */
    success?: DataResponseCallback;
    /** 接口调用失败的回调函数 */
    fail?: ResponseCallback;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: ResponseCallback;
}

interface iLoginResponse {
    success?: Function,
    fail?: Function,
    arg?: Array<any> | any,
    getUser?: boolean,                    //获取用户名和头像授权
    /**登录按钮，不传的话就用默认的。。。。。目前是微信小游戏需要 */
    btnStyle?: { skin?: string, x?: number, y?: number, width?: number, height?: number },
}

interface iZXUser {
    zxId: string,                       //用户id
    name: string,                       //昵称
    avatar: string,                     //头像
    loginToken: string,                 //平台登录验证
    money: number,                      //平台钱
    channels: Array<string>             //账号创建的渠道
    fromUser: string                    //分裂用户的来源id
}

interface iSetting {
    iBanner: boolean,                    //是否有banner 
    iRewardVedio: boolean,               //是否有激励广告
    iShare: boolean,                     //是否可以分享
    iShareGroup: boolean,                
    iRecharge: boolean,
    iShareNotCallBack: boolean,          ////分享不需要回调则为true。
    iCanCommitRank: boolean              //是否可以发送排行，   true,可以，false 不可以
    Mode: number,                        //游戏状态
    isIos: boolean,                      
}


interface iPlatUser {
    userId: string,
    sKey: string,
}

/**
 * 分享接口的内容
 */
interface IShareContext {
    /**
     * 分享的标题 
     */
    title?: string;
    /**
     * 分享的文本显示
     */
    text?: string;
    /**
     * 有效平台:facebook 
     * facebook平台: 图片base64编码
     * 玩一玩平台:url 地址
     */
    image?: string;

    /**
     * 有效平台:facebook,sina
     * 表示共享的目标
     * Indicates the intent of the share.
     * "INVITE" | "REQUEST" | "CHALLENGE" | "SHARE"
     * 邀请，请求，挑战，分享
     */
    ShareType?: string;
    
    /**
     * 有效平台:facebook,玩一玩
     * 分享启动的附加数据，facebook 比如跳转游戏时启动的数据
     */
    data?: any;

    /**
     * 有效平台:sina
     * 邀请识别码,这里要将ShareType设置为INVITE
     */
    cpext?: string;

    /**用于统计分享的点击的key */
    shareId?: string;
    
    /**使用平台配置分享时需要传入的参数 */
    kId?: string;
    
    /**视频的路径 */
    videoPath?: string;
    fbChooseData?: any;

}

interface IProductListContext {
    type?: number,                            //
    pageSize?: number,                          //
    pageIndex?: number,                         //
}

interface IProductInfo {
    productID: string,
    developerPayload?: string,                   //facebook 支付时候附带的开发者参数
    purchaseToken?: string,                      //facebook 消耗一个道具订单时的token
    num?: number                                 //数量
}

/**
 * 排行榜提交
 */
interface IRankCommitContext {
    className?: string;                             //排行名称
    userValue?: number;                             //用户数据
    handQ?: IQQRankData;                            //QQ平台排行榜提交数据
    fb?: IFBInstantRankData;                        //FBinstant排行提交的数据
}

interface IFBInstantRankData {
    board: string,                                  //排行名称
    score: number,                                  //积分
    extendParam?: string,                           //扩展参数
}

/*** 排行榜拉取 */
interface IRankPullContext {
    handQ?: IQQRankPullContext;                     //QQ平台拉取排行数据
    fb?: IFBRankPullContext;                        //FBinstant 平台拉取排行数据
}

interface IFBRankPullContext {
    board: string;                                  //Facebook 的排行榜名字
    count: number,                                  //取多少条
    offset: number,                                 //从那位子开始取，比如从10条开始出
}

interface IQQRankPullContext {
    attr: string;                                    //使用哪一种上报数据做排行，可传入score，a1，a2等
    order: number;                                   //排序的方法：[ 1: 从大到小(单局)，2: 从小到大(单局)，3: 由大到小(累积)]
    rankType: number;                                //要查询的排行榜类型，0: 好友排行榜，1: 群排行榜，2: 讨论组排行榜，3: C2C二人转 (手Q 7.6.0以上支持)
}

interface IQQRankData {
    gameMode: number;                                // 游戏模式，如果没有模式区分，直接填 1
    userData: IQQRankUserData[];                     // 成绩信息
    attr: { [key: string]: IQQRankAttrData };        // 成绩排序信息
}

interface IQQRankUserData {
    openId: string;
    startMs: string;                              //必填。 游戏开始时间。单位为毫秒，<font color=#ff0000>类型必须是字符串</font>
    endMs: string;                                //必填。 游戏结束时间。单位为毫秒，<font color=#ff0000>类型必须是字符串</font>
    scoreInfo: { [key: string]: number };         //scoreInfo中score字段为默认榜单，a1,a2,aN等字段为开发者可自定义榜单
}

interface IQQRankAttrData {
    type: string;                                //描述附加属性的用途
    order: number;                               //排序的方式  
    // 1: 从大到小，即每次上报的分数都会与本周期的最高得分比较，如果大于最高得分则覆盖，否则忽略
    // 2: 从小到大，即每次上报的分数都会与本周期的最低得分比较，如果低于最低得分则覆盖，否则忽略（比如酷跑类游戏的耗时，时间越短越好）
    // 3: 累积，即每次上报的积分都会累积到本周期已上报过的积分上
    // 4: 直接覆盖，每次上报的积分都会将本周期的得分覆盖，不管大小
}




/**
 * 排行榜数据结构
 */
interface IRankDataItem {
    url: string;                 // 头像的 url
    nick: string;                // 昵称
    score: number;               // 分数
    selfFlag?: boolean;          // 是否是自己
    isVip?: boolean;             // vip 用户
    rankNum?: number;            // 排名
}

interface IPostion {
    left?: number,
    right?: number,
    top?: number,
    buttom?: number,
}

interface ISize {
    width?: number,
    height?: number
}

interface IEventDispatcher {
    hasListener(type): boolean;
    event(type: string, data?: any);
    on(type: string, caller: any, listener: Function, args?: Array<any>);
    once(type: string, caller: any, listener: Function, args?: Array<any>);
    off(type: string, caller: any, listener: Function, onceOnly?: boolean);
    offAll(type: string);
}

interface IADBanner extends IEventDispatcher {
    show(pos: IPostion, size?: ISize);
    hide(destory?: boolean);
    width: number;
    height: number;
}

interface IAdBannerOptions {
    adId?: string;            //广告位id
    /**广告位id序号，预留后期广告托管业务*/
    pos?: number;
}

interface IADVedio extends IEventDispatcher {
    show();
    load();
    autoLoad: boolean;
    count: number;
}

interface IAdVedioOptions {
    adId?: string;            //广告位id            pos和adId必须要有一个存在
    /**广告位id序号，预留后期广告托管业务*/
    pos?: number;
    autoLoad?: boolean
}

/**录制屏幕 */
interface IRecorderOpts {
    duration: number,                   //时长
    recorderSucceed?: (res) => void,    //录屏成功
    recorderFail?: (err) => void        //录屏失败
}

interface IChat {
    /**
     * @param auth          // 授权码 -- 暂时没用
     * @param connect       // 链接成功后回调
     * @param receiver      // 收到消息回调
     * @param error          // 链接异常回调
     */
    initChat(auth: string, connect?: (cli) => void, receiver?: (data) => void, error?: (err) => void);
    forceClose(): void;                             //强制关闭聊天
    message(): IChatMessage;
    joinChannel(channelName: string);
    levelChannel(channelName: string);

    onConnect: (client) => void;                       //连接成功
    onError: (error) => void;                          //连接失败，异常
    onReceiver: (data) => void;                        //收到数据          
    onJoinChannel: (data) => void;                     //加入频道成功 joinChannel 之后回调
    onLeaveChannel: (data) => void;                    //离开频道成功 levelChannel 之后回调
}

interface IChatMessage {
    toId(uid: string): IChatMessage;
    send(): void;
}

declare enum EnumShareType {
    INVITE = "INVITE",
    REQUEST = "REQUEST",
    CHALLENGE = "CHALLENGE",
    SHARE = "SHARE",
}


//=============================================zxAndroid=======================================

/** * Android 调用 Js 的回调函数 */

//显示时处理
type OnShowCallBack = () => void;
type OnHideCallBack = () => void;
type OnErrorCallback = (error: { sourceId: number, message: string, lineNumber: number }) => void;
type OnExitCallBack = () => void;
type OnLoginSuccessCallBack = (user: IApkUser) => void;
type OnLoginFailCallBack = () => void;
type OnLoginCancelCallBack = () => void;
type OnLoginOutCallback = () => void;

//-2：实名认证失败 -1：未实名认证  0：已实名未成年 1：已实名已成年(如当前渠道不存在实名认证接口，将默认返回1)
type OnRealNameCallBack = (d: { code: number }) => void;
type OnPayCallBack = (payInfo: IApkPayInfo) => void;
//下载更新回调
type OnUpgradeProgressCallBack = (d: { rate: number }) => void
type onUpgradeErrorCallBack = (err: string) => void;

interface IZXAndroid {

    //Android call Js
    onShow(callBack: OnShowCallBack): void;
    offShow(): void;

    onHide(callBack: OnHideCallBack): void;
    offHide(): void;

    onError(callBack: OnErrorCallback): void;
    offError(): void

    onExit(callBack: OnExitCallBack): void;
    offExit(): void;

    onLoginCancel(callBack: OnLoginCancelCallBack): void;
    offLoginCancel(): void

    onLoginOut(callBack: OnLoginOutCallback): void;
    offLoginOut(): void;

    onUpgradeProgress(callBack: OnUpgradeProgressCallBack): void;
    onUpgradeError(callback: onUpgradeErrorCallBack): void;
    offUpgradeProgress(): void;

    onUpgradeComplete(callBack: () => void): void
    offUpgradeComplete(): void;

    ////Js call Android
    login(d: { success: OnLoginSuccessCallBack, fail: OnLoginFailCallBack }): void;
    reportData(reportData: IApkReportData): void;
    realName(callBack: OnRealNameCallBack): void;
    /**支付购买 */
    recharge(payInfo, success: OnPayCallBack, fail: OnPayCallBack): void
    upgradePack(version: string, url: string): void;
    runtimeStart(): void;
    clearFileCache(): void;
    exit(): void;
    getSystemInfo(callBack: (info: IApkInfo) => void): void
    hideFirstLoading();
}


interface IApkOrderInfo {
    orderId?: string;           // 是 我方定义的orderId 
    productName: string;        // 是 商品名称 
    productDesc?: string;       // 否 商品描述 
    price: string;              // 是 商品价格，单位（分）
    extend: string;             // 是 透传字段 
    message?: string;           // 否 支付失败的原因 
    accessKey?: string;         //vivo支付的accessKey，请求vivo订单接口产生
    channelOrderId?: string;    //渠道的订单号，请求vivo订单接口产生
    sign?: string;              //华为的支付签名
    rmb?: number;
    callbackUrl?: string;

}

interface IApkPayInfo {
    orderId: string;// 是 我方定义的orderId 
    productName: string;// 是 商品名称 
    productDesc?: string;// 否 商品描述 
    price: number; // 是 商品价格，单位（分）
    extend: string;// 是 透传字段 
    message?: string;// 否 支付失败的原因 
}

interface IApkPlatPayInfo {
    orderId: string,
    callbackUrl?: string
    content?: any
}

interface IApkReportData {
    roleName?: string;// all 角色名称 
    roleLevel?: number;// all 角色等级 
    areaName?: string;// String all 游戏区服名称 
    sociaty?: string;// H、O 工会名称 
    roleId?: string;// O、V 角色id 
    areaId?: string;// O、V 游戏区服id 
    chapter?: string;// O 关卡章节 
    combatValue?: string;// O 战力值 
    pointValue?: string;// O 积分 
}

interface IApkInfo {
    gameId: string;// 是 我方定义的应用id
    platId: string;// 是 我方定义的渠道号, 可参考附录中的渠道id
    platform: string;// 是 "ios"是iOS，"android"是Android
    manufacture: string;// 是 手机制造商
    model: string;// 是 手机型号
    imei?: string;// 否 imei（可能因权限问题获取失败）
    androidId: string;// 是 android系统的id
    androidVersionCode: number;// 是 android系统的版本号，比如Android9.0的版本号是28
    androidVersionName: string;// 是 android系统的版本名，将会返回类似"4.4.4"、"8.0.0"
    mac: string;// 是 MAC地址
    screenWidth: number;// 是 屏幕宽度
    screenHeight: number;// 是 屏幕高度
    appName: string;// 是 应用名称
    packageName: string;// 是 应用包名
    sdkVersionName: string;// 是 当前SDK版本号
    uuid: string;// 是 客户端生成的uuid，未重装应用不会重新生成（imei不存在时可作为唯一id使用）
    openTimes: number;// 是 客户端记录的用户打开应用次数，为1时说明该用户是新增用户。 
}

interface IApkUser {
    openId: string;
    token: string;
}

interface IShopInfo {
    productName: string,
    productDesc: string,
    price: number,
    icon?: string
}

//=============================================zxAndroidEnd=======================================