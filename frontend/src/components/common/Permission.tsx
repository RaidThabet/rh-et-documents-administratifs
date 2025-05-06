import { ReactNode } from "react";
import { useAuth } from "../../context/AuthContext";

interface PermissionProps {
  permission: string;
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Component to conditionally render content based on user permissions
 * @param permission - The permission required to view the content
 * @param children - Content to show if user has permission
 * @param fallback - Optional content to show if user doesn't have permission
 */
const Permission = ({ permission, children, fallback = null }: PermissionProps) => {
  const { checkPermission } = useAuth();
  
  return checkPermission(permission) ? <>{children}</> : <>{fallback}</>;
};

export default Permission;
