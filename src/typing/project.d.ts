export interface Project {
  id: string
  name: string // 项目名称
  template: string // 使用模板
  technologyType: string // react/。。
  saveWayType: number // 0-本地文件夹储存 1-git地址储存
  localDisk: string // 本地磁盘位置
}
