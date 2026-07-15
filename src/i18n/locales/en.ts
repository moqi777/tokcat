export interface MessageTree {
  [key: string]: string | MessageTree
}

export type DictionaryShape<T> = {
  [K in keyof T]: T[K] extends string ? string : DictionaryShape<T[K]>
}

export const en = {
  common: {
    close: 'Close',
    loading: 'Loading…',
    errorPrefix: 'Error: {{error}}',
  },
  settings: {
    title: 'Settings',
    language: {
      title: 'Language',
      followSystem: 'Follow System',
    },
    menubarTitle: 'Menubar title',
    trayMode: {
      today_tokens: "Today's tokens ({{example}})",
      today_cost: "Today's cost ({{example}})",
      total_tokens: 'Total tokens ({{example}})',
      total_cost: 'Total cost ({{example}})',
      tokens_per_min: 'Tokens / min ({{example}})',
      hidden: 'Icon only',
    },
    startup: 'Startup',
    launchAtLogin: 'Launch at login',
    menubarIcon: 'Menubar icon',
    animateTray: 'Animate based on token usage',
    animationStyle: {
      cat: 'Spinning cat',
      parrot: 'Party parrot',
    },
    liveTrace: 'Live trace',
    splitByAgentModel: 'Split by agent / model',
    cursorUsage: 'Cursor usage',
    fetchCursor: 'Fetch from cursor.com',
    about: 'About',
    version: 'Version',
    checkForUpdates: 'Check for updates',
    checking: 'Checking…',
    checkNow: 'Check Now',
    quit: 'Quit Tokcat',
  },
} satisfies MessageTree
