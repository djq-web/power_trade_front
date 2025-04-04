export interface IUser {
  /** 用户 ID */
  id: number | string;
  /** 用户名 */
  username: string;
  /** 角色 */
  role: string;
  /** 创建时间 */
  createdAt: string;
  /** 操作 */
  operate?: string;
}