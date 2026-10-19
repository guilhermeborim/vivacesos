import menuData, { MenuItem } from "./LayoutMenuData"

export interface MenuViewer {
  hasPermission: (permission: string) => boolean
  isProfessional: boolean
  role: string | undefined
}

/** Regra única do menu: permissão, perfil de profissional e papéis escondidos; grupo vazio some. */
export function isMenuItemVisible(item: MenuItem, viewer: MenuViewer): boolean {
  return (
    (!item.permission || viewer.hasPermission(item.permission)) &&
    (!item.requiresProfessional || viewer.isProfessional) &&
    !(viewer.role && item.hiddenForRoles?.includes(viewer.role)) &&
    (!item.children || item.children.some((child) => isMenuItemVisible(child, viewer)))
  )
}

export const DASHBOARD_PATH = "/dashboard"

export interface HomeOption {
  value: string
  label: string
  /** Nome do grupo do menu (vazio para o Dashboard). */
  group: string
}

/** Telas que o usuário pode escolher como inicial: Dashboard + folhas visíveis do menu. */
export function homeOptions(viewer: MenuViewer): HomeOption[] {
  const options: HomeOption[] = [{ value: DASHBOARD_PATH, label: "Dashboard", group: "" }]
  for (const group of menuData) {
    if (!group.children || !isMenuItemVisible(group, viewer)) continue
    for (const child of group.children) {
      if (child.link && isMenuItemVisible(child, viewer)) {
        options.push({ value: child.link, label: child.label, group: group.label })
      }
    }
  }
  return options
}

/** Há um item do menu com este id (grupo ou folha) visível para o usuário? */
export function isMenuIdVisible(id: string, viewer: MenuViewer): boolean {
  const find = (items: MenuItem[]): MenuItem | undefined => {
    for (const item of items) {
      if (item.id === id) return item
      const inChild = item.children ? find(item.children) : undefined
      if (inChild) return inChild
    }
    return undefined
  }
  const item = find(menuData)
  return !!item && isMenuItemVisible(item, viewer)
}
