export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export interface DashboardHeaderProps {
  onMenuClick: () => void;
}
