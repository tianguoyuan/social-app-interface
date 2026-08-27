interface DefaultPage {
  pageNum: number
  pageSize: number
}

declare namespace API {
  /** App-应用首次全屏介绍 */
  interface IAppIntroduceBannerRes {
    /** 是否开启 */
    switch: 'Y' | 'N'
    list: {
      id: string
      name: string
      img: string
      desc: string
    }[]
  }

  /** 通用列表 */
  interface CommonList extends DefaultPage {
    order?: 'asc' | 'desc'
  }

  /** 注册 */
  interface IRegister {
    /** 账号 */
    username: string
    /** 密码 */
    password: string
  }

  /** 登录 */
  interface ILogin {
    /** 账号 */
    username: string
    /** 密码 */
    password: string
  }
  interface ILoginRes {
    /** token */
    token: string
  }

  /** 获取用户信息 */
  interface IUserInfo {
    /** token */
    token: string
  }
  interface IUserInfoRes {

  }

  interface RecommendedTagsFind {

  }
  interface RecommendedTagsFindRes {
    tagList: {
      id: string
      title: string
    }[]
    orderList: {
      id: string
      title: string
    }[]
    kindList: {
      id: string
      title: string
    }[]
  }

  /** 首页-推荐-banner */
  interface RecommendedBannerListRes {
    list: { id: string, img: string }[]
  }

  interface RecommendedListFind extends DefaultPage {
    /** 标签 */
    tagId?: string
    /** 排序 */
    orderId?: string
    /** 分类 */
    kindId?: string
  }
  interface RecommendedListFindRes {
    pageNum: number
    total: number
    list: {
      id: string
      cover: string
      title: string
      likeNum: number
      isLike: boolean
      images: string[] | []
    }[]
  }

  /** 关注-推荐用户 */
  interface FollowUserLike extends DefaultPage {

  }
  interface FollowUserLikeRes {
    total: number
    list: {
      id: string
      name: string
      desc: string
      img: string
    }[]
  }

  /** 搜索-热门-标签 */
  interface SearchHotTagFindRes {
    total: number
    list: {
      id: string
      name: string
    }[]
  }

  /** 搜索-热门 */
  interface SearchHotFind extends CommonList {
    hotTagId: string
  }
  interface SearchHotFindRes {
    total: number
    list: {
      id: string
      name: string
    }[]
  }

  /** 搜索-默认关键词 */
  interface SearchDefaultMsgFindRes {
    searchDefault: string
  }

  /** 消息-列表 */
  interface MessageFindRes {
    total: number
    list: {
      id: string
      name: string
      desc: string
      img: string
      lastTime: string
      unReadNum: number
    }[]
  }

  /** 用户-获取验证码 */
  interface UserGetPhoneCode {
    phone: string
  }
  interface UserGetPhoneCodeRes {
    code: string
  }

  /** 用户-登录 */
  interface UserLogin {
    phone: string
    code: string
  }
  interface UserLoginRes {
    token: string
  }

  /** 用户-获取信息 */
  interface UserInfoRes {
    id: string
    name: string
    phone: string
    img: string
  }
}
