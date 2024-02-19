import { HeaderProps } from '@/components/common/header'

export type PageConfigType = {
  [key: string]: {
    mobile: {
      headerProps: HeaderProps
      showBottomNav?: boolean
      showFooter?: boolean
    }
    desktop: {
      headerProps: HeaderProps
    }
  }
}
const PageConfig: PageConfigType = {
  '/': {
    mobile: {
      headerProps: {
        collapsed: false,
        centerTitle: false,
        actionIconsProps: {
          enableSearch: true,
          enableCart: true,
          enableHamburger: true,
        },
      },
      showBottomNav: true,
      showFooter: true,
    },
    desktop: {
      headerProps: {
        collapsed: false,
        centerTitle: false,
        actionIconsProps: {
          enableSearch: true,
          enableLike: true,
          enableCart: true,
          enableProfile: true,
        },
      },
    },
  },
  '/account/login': {
    mobile: {
      headerProps: {
        collapsed: false,
        title: '로그인',
        centerTitle: true,
        actionIconsProps: {
          enableCart: true,
        },
      },
      showBottomNav: false,
      showFooter: false,
    },
    desktop: {
      headerProps: {
        collapsed: false,
        title: '로그인',
        centerTitle: true,
        actionIconsProps: {
          enableSearch: true,
          enableLike: true,
          enableCart: true,
          enableProfile: true,
        },
      },
    },
  },
  '/account/register': {
    mobile: {
      headerProps: {
        collapsed: false,
        title: '회원가입',
        centerTitle: true,
        actionIconsProps: {},
      },
      showBottomNav: false,
      showFooter: true,
    },
    desktop: {
      headerProps: {
        collapsed: false,
        title: '회원가입',
        centerTitle: true,
        actionIconsProps: {
          enableSearch: true,
          enableLike: true,
          enableCart: true,
          enableProfile: true,
        },
      },
    },
  },
  '/subscription': {
    mobile: {
      headerProps: {
        collapsed: false,
        title: '정기구독',
        centerTitle: false,
        actionIconsProps: {
          enableSearch: true,
          enableCart: true,
          enableHamburger: true,
        },
      },
      showBottomNav: true,
      showFooter: true,
    },
    desktop: {
      headerProps: {
        collapsed: false,
        title: '정기구독',
        centerTitle: false,
        actionIconsProps: {
          enableSearch: true,
          enableCart: true,
          enableHamburger: true,
        },
      },
    },
  },
  '/subscription/*': {
    mobile: {
      headerProps: {
        collapsed: false,
        title: '정기구독',
        centerTitle: false,
        actionIconsProps: {
          enableSearch: true,
          enableCart: true,
          enableHamburger: true,
        },
      },
      showBottomNav: false,
      showFooter: true,
    },
    desktop: {
      headerProps: {
        collapsed: false,
        title: '정기구독',
        centerTitle: false,
        actionIconsProps: {
          enableSearch: true,
          enableCart: true,
          enableHamburger: true,
        },
      },
    },
  },
  '/product': {
    mobile: {
      headerProps: {
        collapsed: false,
        categoryMode: true,
        centerTitle: false,
        actionIconsProps: {
          enableSearch: true,
          enableCart: true,
          enableHamburger: true,
        },
      },
      showBottomNav: true,
      showFooter: true,
    },
    desktop: {
      headerProps: {
        collapsed: false,
        title: '스토어',
        centerTitle: false,
        actionIconsProps: {
          enableSearch: true,
          enableCart: true,
          enableLike: true,
          enableProfile: true,
        },
      },
    },
  },
  '/search': {
    mobile: {
      headerProps: {
        collapsed: false,
        categoryMode: false,
        centerTitle: false,
        searchMode: true,
        actionIconsProps: {},
      },
      showBottomNav: true,
      showFooter: false,
    },
    desktop: {
      headerProps: {
        collapsed: false,
        centerTitle: false,
        actionIconsProps: {
          enableSearch: true,
          enableCart: true,
          enableLike: true,
          enableProfile: true,
        },
      },
    },
  },
  '/cart': {
    mobile: {
      headerProps: {
        collapsed: false,
        categoryMode: false,
        centerTitle: true,
        title: '장바구니',
        actionIconsProps: {},
      },
      showBottomNav: false,
      showFooter: false,
    },
    desktop: {
      headerProps: {
        collapsed: false,
        title: '장바구니',
        centerTitle: false,
        actionIconsProps: {
          enableSearch: true,
          enableCart: true,
          enableLike: true,
          enableProfile: true,
        },
      },
    },
  },
  '/checkout': {
    mobile: {
      headerProps: {
        collapsed: false,
        categoryMode: false,
        centerTitle: true,
        title: '주문서',
        actionIconsProps: {},
      },
      showBottomNav: false,
      showFooter: false,
    },
    desktop: {
      headerProps: {
        collapsed: false,
        title: '주문서',
        centerTitle: false,
        actionIconsProps: {
          enableSearch: true,
          enableCart: true,
          enableLike: true,
          enableProfile: true,
        },
      },
    },
  },
  '/product/*': {
    mobile: {
      headerProps: {
        collapsed: false,
        categoryMode: false,
        centerTitle: false,
        title: '',
        actionIconsProps: {
          enableSearch: true,
          enableCart: true,
          enableHamburger: true,
        },
      },
      showBottomNav: false,
      showFooter: true,
    },
    desktop: {
      headerProps: {
        collapsed: false,
        title: '스토어',
        centerTitle: false,
        actionIconsProps: {
          enableSearch: true,
          enableCart: true,
          enableLike: true,
          enableProfile: true,
        },
      },
    },
  },
  '/consulting': {
    mobile: {
      headerProps: {
        collapsed: false,
        title: '전문가상담',
        centerTitle: false,
        actionIconsProps: {
          enableSearch: true,
          enableCart: true,
          enableHamburger: true,
        },
      },
      showBottomNav: true,
      showFooter: true,
    },
    desktop: {
      headerProps: {
        collapsed: false,
        title: '전문가상담',
        centerTitle: false,
        actionIconsProps: {
          enableSearch: true,
          enableCart: true,
          enableHamburger: true,
        },
      },
    },
  },
  '/meowtimes': {
    mobile: {
      headerProps: {
        collapsed: false,
        title: '미우타임즈',
        centerTitle: false,
        actionIconsProps: {
          enableSearch: true,
          enableCart: true,
          enableHamburger: true,
        },
      },
      showBottomNav: true,
      showFooter: true,
    },
    desktop: {
      headerProps: {
        collapsed: false,
        title: '미우타임즈',
        centerTitle: false,
        actionIconsProps: {
          enableSearch: true,
          enableCart: true,
          enableHamburger: true,
        },
      },
    },
  },
  '/event': {
    mobile: {
      headerProps: {
        collapsed: false,
        title: '이벤트',
        centerTitle: false,
        actionIconsProps: {
          enableSearch: true,
          enableCart: true,
          enableHamburger: true,
        },
      },
      showBottomNav: true,
      showFooter: true,
    },
    desktop: {
      headerProps: {
        collapsed: false,
        title: '이벤트',
        centerTitle: false,
        actionIconsProps: {
          enableSearch: true,
          enableCart: true,
          enableHamburger: true,
        },
      },
    },
  },
  '/community': {
    mobile: {
      headerProps: {
        collapsed: false,
        title: '커뮤니티',
        centerTitle: false,
        actionIconsProps: {
          enableSearch: true,
          enableCart: true,
          enableHamburger: true,
        },
      },
      showBottomNav: true,
      showFooter: true,
    },
    desktop: {
      headerProps: {
        collapsed: false,
        title: '커뮤니티',
        centerTitle: false,
        actionIconsProps: {
          enableSearch: true,
          enableCart: true,
          enableHamburger: true,
        },
      },
    },
  },
  '/cs/*': {
    mobile: {
      headerProps: {
        collapsed: false,
        title: '고객경험센터',
        centerTitle: false,
        actionIconsProps: {
          enableSearch: true,
          enableCart: true,
          enableHamburger: true,
        },
      },
      showBottomNav: true,
      showFooter: true,
    },
    desktop: {
      headerProps: {
        collapsed: false,
        title: '고객센터',
        centerTitle: false,
        actionIconsProps: {
          enableSearch: true,
          enableCart: true,
          enableHamburger: true,
        },
      },
    },
  },
  '/cs/notice/*': {
    mobile: {
      headerProps: {
        collapsed: false,
        title: '고객경험센터',
        centerTitle: false,
        actionIconsProps: {
          enableSearch: true,
          enableCart: true,
          enableHamburger: true,
        },
      },
      showBottomNav: true,
      showFooter: true,
    },
    desktop: {
      headerProps: {
        collapsed: false,
        title: '고객센터',
        centerTitle: false,
        actionIconsProps: {
          enableSearch: true,
          enableCart: true,
          enableHamburger: true,
        },
      },
    },
  },
  '/like': {
    mobile: {
      headerProps: {
        collapsed: false,
        title: '좋아요',
        centerTitle: false,
        actionIconsProps: {
          enableSearch: true,
          enableCart: true,
          enableHamburger: true,
        },
      },
      showBottomNav: true,
      showFooter: true,
    },
    desktop: {
      headerProps: {
        collapsed: false,
        title: '좋아요',
        centerTitle: false,
        actionIconsProps: {
          enableSearch: true,
          enableCart: true,
          enableHamburger: true,
        },
      },
    },
  },
  '/mypage/*': {
    mobile: {
      headerProps: {
        collapsed: false,
        title: '마이페이지',
        centerTitle: true,
        actionIconsProps: {},
      },
      showBottomNav: true,
      showFooter: true,
    },
    desktop: {
      headerProps: {
        collapsed: false,
        title: '마이페이지',
        centerTitle: false,
        actionIconsProps: {
          enableSearch: true,
          enableLike: true,
          enableCart: true,
          enableProfile: true,
        },
      },
    },
  },
}

export default PageConfig
export const getPageConfig = (pathName: string) => {
  const parts = pathName.split('/')
  for (let i = 0; i < Object.keys(PageConfig).length; i++) {
    const configPathName = Object.keys(PageConfig)[i]
    const configParts = configPathName.split('/')

    if (parts.length !== configParts.length) {
      continue
    }
    const match = parts.every((part, index) => part === configParts[index] || configParts[index] === '*')
    if (match) {
      return Object.values(PageConfig)[i]
    }
  }
}
