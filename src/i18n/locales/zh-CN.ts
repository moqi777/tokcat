import type { DictionaryShape } from './en'
import { en } from './en'

export const zhCN: DictionaryShape<typeof en> = {
  common: {
    close: '关闭',
    loading: '加载中…',
    errorPrefix: '错误：{{error}}',
  },
  settings: {
    title: '设置',
    language: {
      title: '语言',
      followSystem: '跟随系统',
    },
    menubarTitle: '菜单栏标题',
    trayMode: {
      today_tokens: '今日 Token（{{example}}）',
      today_cost: '今日费用（{{example}}）',
      total_tokens: 'Token 总量（{{example}}）',
      total_cost: '总费用（{{example}}）',
      tokens_per_min: '每分钟 Token（{{example}}）',
      hidden: '仅显示图标',
    },
    startup: '启动',
    launchAtLogin: '登录时启动',
    menubarIcon: '菜单栏图标',
    animateTray: '根据 Token 用量显示动画',
    animationStyle: {
      cat: '旋转猫咪',
      parrot: '派对鹦鹉',
    },
    liveTrace: '实时追踪',
    splitByAgentModel: '按 Agent / 模型拆分',
    cursorUsage: 'Cursor 用量',
    fetchCursor: '从 cursor.com 获取',
    about: '关于',
    version: '版本',
    checkForUpdates: '检查更新',
    checking: '正在检查…',
    checkNow: '立即检查',
    quit: '退出 Tokcat',
  },
}
