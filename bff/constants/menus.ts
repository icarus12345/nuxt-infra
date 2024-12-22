import { ChevronRight, Settings, Users, Home, Newspaper, Tags, } from 'lucide-vue-next'

export const navMenu = [
  {
    title: 'Content Owner',
    url: '/content-owner',
    icon: Home,
    children: [
      {
        title: 'History',
        url: '#',
      },
      {
        title: 'Starred',
        url: '#',
      },
      {
        title: 'Settings',
        url: '#',
      },
    ],
  },
  {
    title: 'Content Provider',
    url: '/content-provider',
    icon: Newspaper,
    children: [
      {
        title: 'Posts',
        url: '/content-provider/posts',
      },
      {
        title: 'Tags',
        url: '/content-provider/tags',
      },
    ],
  },
  {
    title: 'Service Operator',
    url: '/service-operator',
    icon: Tags,
    children: [
      {
        title: 'Introduction',
        url: '#',
      },
      {
        title: 'Get Started',
        url: '#',
      },
      {
        title: 'Tutorials',
        url: '#',
      },
      {
        title: 'Changelog',
        url: '#',
      },
    ],
  },
  {
    title: 'System Settings',
    url: '/system-setting',
    icon: Settings,
    children: [
      {
        title: 'General',
        url: '#',
      },
      {
        title: 'Team',
        url: '#',
      },
      {
        title: 'Billing',
        url: '#',
      },
      {
        title: 'Limits',
        url: '#',
      },
    ],
  },
  {
    title: 'Users/Permission',
    url: '/user-management',
    icon: Users,
    children: [
      {
        title: 'Users',
        url: '/user-management/users',
      },
      {
        title: 'Team',
        url: '#',
      },
      {
        title: 'Billing',
        url: '#',
      },
      {
        title: 'Limits',
        url: '#',
      },
    ],
  },
]
