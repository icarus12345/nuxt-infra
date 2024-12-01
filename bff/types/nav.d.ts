export interface NavLink {
  title: string
  link: string
  icon?: string
  children?: NavLink[]
}

export interface NavSectionTitle {
  heading: string
}

export interface NavGroup {
  title: string
  icon?: string
  link?: string
  children?: NavLink[]
}

export declare type NavMenuItems = (NavLink | NavGroup | NavSectionTitle)[]
