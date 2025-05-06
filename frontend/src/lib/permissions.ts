// Role-based permissions configuration
export const rolePermissions = {
  "roles": [
    {
      "name": "anonymous",
      "permissions": [
        "check_auth_status",
        "login",
        "logout",
        "reset_password",
        "register"
      ]
    },
    {
      "name": "admin",
      "permissions": [
        "create_record",
        "read_record",
        "update_record",
        "delete_record",
        "check_auth_status",
        "register",
        "login",
        "logout",
        "reset_password",
        "fetch_users",
        "update_auth",
        "delete_auth",
        "read_log",
        "create_log",
        "update_log",
        "delete_log",
        "read_leave",
        "create_leave",
        "update_leave",
        "handle_leave",
        "delete_leave",
        "read_task",
        "create_task",
        "update_task",
        "complete_task",
        "delete_task"
      ]
    },
    {
      "name": "rh",
      "permissions": [
        "create_record",
        "read_record",
        "update_record",
        "check_auth_status",
        "login",
        "logout",
        "fetch_users",
        "read_log",
        "read_leave",
        "create_leave",
        "update_leave",
        "handle_leave",
        "delete_leave",
        "reset_password",
        "read_task",
        "create_task",
        "update_task",
        "complete_task",
        "delete_task"
      ]
    },
    {
      "name": "agent",
      "permissions": [
        "create_record",
        "read_record",
        "check_auth_status",
        "login",
        "logout",
        "reset_password",
        "read_task",
        "complete_task"
      ]
    },
    {
      "name": "professor",
      "permissions": [
        "create_record",
        "read_record",
        "check_auth_status",
        "login",
        "logout",
        "reset_password"
      ]
    }
  ]
};

// Helper function to check if a user with a specific role has a permission
export function hasPermission(role: string, permission: string): boolean {
  const roleData = rolePermissions.roles.find(r => r.name === role);
  if (!roleData) return false;
  
  return roleData.permissions.includes(permission);
}

// Get all permissions for a role
export function getPermissionsForRole(role: string): string[] {
  const roleData = rolePermissions.roles.find(r => r.name === role);
  return roleData?.permissions || [];
}
