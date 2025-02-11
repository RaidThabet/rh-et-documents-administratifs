const Role = require('../database/models/role');
const User = require('../database/models/user');
const Permissions = require('../database/models/permissions');
const { verifySecretToken } = require("../tokenGeneration/generateToken");

// Check if the user has the required permission for a route
exports.checkPermission = (permission) => {
  return async (req, res, next) => {
    const token = req.cookies.token;  
    var userRole = 'anonymous';
    if (token) {
      const verified = verifySecretToken(token);

      const user = await User.findById(verified.id)
      
      if (!user) {
        return res.status(403).json({ error: 'Access denied 2' });
      }

      userRole = user.role;
    }

    console.log("----");
    console.log(permission);
    console.log(userRole);
    console.log("----");
    

    const userPermissions = new Permissions().getPermissionsByRoleName(userRole);
    if (userPermissions.includes(permission)) {
      return next();
    } else {
      return res.status(403).json({ error: 'Access denied' });
    }
  };
};