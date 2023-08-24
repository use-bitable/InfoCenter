export declare enum Sex {
  male = "male",
  female = "female",
  other = "other",
}

export declare enum Permission {
  admin = 0,
  common = 1,
}

export declare enum Post {
  secretary = "书记",
  secondarySecretary = "副书记",
  publicity = "宣传委员",
  organizer = "组织委员",
  discipliner = "纪检委员",
}

export declare enum Group {
  one = 1,
  two = 2,
  three = 3,
}

export declare enum Role {
  masses = "群众", // 群众
  leagueMember = "共青团员", // 共青团员
  activist = "正式党员", // 入党积极分子
  reservePartyMember = "预备党员", // 预备党员
  fullPartyMember = "正式党员", // 正式党员
}

export declare enum SchoolStatus {
  graduation = 0, // 毕业
  reading = 1, // 在读
  rollOut = 2, // 转出
}

export declare type TimeStamp = number

export declare type Interlocutor = {
  username: string
  name: string
  time: TimeStamp
  record?: string // 谈话记录电子版链接
}

export declare type Cultivator = {
  username: string
  name: string
  start: TimeStamp
  end?: TimeStamp
}

export declare interface UserInfo {
  /**
   * 学号
   *
   * @Origin https://ct8hv7vfy1.feishu.cn/base/AlbRbDCbFawVLCsJaoScsus2nsg?table=tblyKTUwLcbltOYx&view=vewCYKnZ4q
   */
  username: string
  /**
   * 姓名
   *
   * @Origin https://ct8hv7vfy1.feishu.cn/base/AlbRbDCbFawVLCsJaoScsus2nsg?table=tblyKTUwLcbltOYx&view=vewCYKnZ4q
   */
  name?: string
  /**
   * 身份证号
   *
   * @Origin https://ct8hv7vfy1.feishu.cn/base/AlbRbDCbFawVLCsJaoScsus2nsg?table=tblyKTUwLcbltOYx&view=vewCYKnZ4q
   */
  id?: string
  /**
   * 生日
   *
   * @Origin https://ct8hv7vfy1.feishu.cn/base/AlbRbDCbFawVLCsJaoScsus2nsg?table=tblyKTUwLcbltOYx&view=vewCYKnZ4q
   */
  birthday?: TimeStamp
  /**
   * 党小组
   *
   * @Origin https://ct8hv7vfy1.feishu.cn/base/AlbRbDCbFawVLCsJaoScsus2nsg?table=tblyKTUwLcbltOYx&view=vewCYKnZ4q
   */
  group?: Group
  /**
   * 性别
   *
   * @Origin https://ct8hv7vfy1.feishu.cn/base/AlbRbDCbFawVLCsJaoScsus2nsg?table=tblyKTUwLcbltOYx&view=vewCYKnZ4q
   */
  sex?: Sex
  /**
   * 政治面貌
   *
   * @Origin https://ct8hv7vfy1.feishu.cn/base/AlbRbDCbFawVLCsJaoScsus2nsg?table=tblyKTUwLcbltOYx&view=vewCYKnZ4q
   */
  role?: Role
  /**
   * 年级
   *
   * @Origin https://ct8hv7vfy1.feishu.cn/base/AlbRbDCbFawVLCsJaoScsus2nsg?table=tblyKTUwLcbltOYx&view=vewCYKnZ4q
   */
  grade?: string
  /**
   * 民族
   *
   * @Origin https://ct8hv7vfy1.feishu.cn/base/AlbRbDCbFawVLCsJaoScsus2nsg?table=tblyKTUwLcbltOYx&view=vewCYKnZ4q
   */
  ethnic?: string
  /**
   * 申请入党时间
   *
   * @Origin https://ct8hv7vfy1.feishu.cn/base/AlbRbDCbFawVLCsJaoScsus2nsg?table=tblyKTUwLcbltOYx&view=vewCYKnZ4q
   */
  applicationTime?: TimeStamp
  /**
   * “两基”测试成绩
   *
   * @Origin https://ct8hv7vfy1.feishu.cn/base/AlbRbDCbFawVLCsJaoScsus2nsg?table=tblyKTUwLcbltOYx&view=vewCYKnZ4q
   */
  testScore?: number
  /**
   * 联系电话
   *
   * @Origin https://ct8hv7vfy1.feishu.cn/base/AlbRbDCbFawVLCsJaoScsus2nsg?table=tblyKTUwLcbltOYx&view=vewCYKnZ4q
   */
  phone?: string
  /**
   * 在校状态
   *
   * @Origin https://ct8hv7vfy1.feishu.cn/base/AlbRbDCbFawVLCsJaoScsus2nsg?table=tblyKTUwLcbltOYx&view=vewCYKnZ4q
   */
  schoolStatus?: SchoolStatus

  /**
   *谈话人信息
   *
   * @Origin https://ct8hv7vfy1.feishu.cn/base/AlbRbDCbFawVLCsJaoScsus2nsg?table=tblwC0HEwqHDsvTU&view=vewBdn16dk
   */
  interlocutor?: Interlocutor //

  /**
   * 培养联系人信息
   *
   * @Origin https://ct8hv7vfy1.feishu.cn/base/AlbRbDCbFawVLCsJaoScsus2nsg?table=tblcwuWcwkBvcZwT&view=vewBdn16dk
   */
  cultivators?: Cultivator[]

  /**
   * 《党的基本知识》结业证书时间
   *
   * @Origin https://ct8hv7vfy1.feishu.cn/base/AlbRbDCbFawVLCsJaoScsus2nsg?table=tblaRgfIpPUKaUen&view=vewBdn16dk
   */
  basicKnowledgeCertificate?: TimeStamp

  /**
   *《党的建设理论》结业证书时间
   *
   * @Origin https://ct8hv7vfy1.feishu.cn/base/AlbRbDCbFawVLCsJaoScsus2nsg?table=tbl9jf5wfrYTxSaq&view=vewBdn16dk
   */
  theoryOfPartyBuildingCertificate?: TimeStamp

  /**
   * 权限
   */
  permissions?: Permission[]
}

/**
 * 用户鉴权信息
 *
 * @Origin https://ct8hv7vfy1.feishu.cn/base/AlbRbDCbFawVLCsJaoScsus2nsg?table=tblsho0FlOfPn08q&view=vewv5om6Vu
 */
export declare type UserAuth = {
  username: string
  password: string
}

export declare type Token = string

export enum StatusCode {
  success = 0,
  failure = 1,
}

export declare interface Response {
  code: StatusCode
  data: any
  message?: string
}
