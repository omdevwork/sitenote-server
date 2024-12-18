const Roles = require("../constants/user_roles");

const isAdmin = async function (req, res, next) {
  let role = req.body.role;
  if (!role === Roles.ADMIN) {
    res.status(400).json({
      error:
        "Sorry you don't have the required permissions to perform this action",
    });
  }
  next();
};

const isOfficeEmployee = async function (req, res, next) {
  let role = req.body.role;
  if (role === Roles.OFFICE) {
    return true;
  }
  return false;
};

const isSiteManager = async function (req, res, next) {
  let role = req.body.role;
  if (role === Roles.SITE_MANAGER) {
    return true;
  }
  return false;
};

const viewMaterial = async function (req, res, next) {
  let role = req.body.role;
  const approvedUsers = [Roles.ADMIN, Roles.OFFICE, Roles.SITE_MANAGER];
  if (!approvedUsers.includes(role)) {
    res.status(400).json({
      error:
        "Sorry you don't have the required permissions to perform this action",
    });
  }

  next();
};

const createMaterial = async function (req, res, next) {
  let role = req.body.role;
  const approvedUsers = [Roles.ADMIN, Roles.OFFICE, Roles.SITE_MANAGER];
  if (!approvedUsers.includes(role)) {
    res.status(400).json({
      error:
        "Sorry you don't have the required permissions to perform this action",
    });
  }

  next();
};

const editMaterial = async function (req, res, next) {
  let role = req.body.role;
  const approvedUsers = [Roles.ADMIN, Roles.OFFICE];
  if (!approvedUsers.includes(role)) {
    res.status(400).json({
      error:
        "Sorry you don't have the required permissions to perform this action",
    });
  }

  next();
};

const deleteMaterial = async function (req, res, next) {
  let role = req.body.role;
  const approvedUsers = [Roles.ADMIN, Roles.OFFICE];
  if (!approvedUsers.includes(role)) {
    res.status(400).json({
      error:
        "Sorry you don't have the required permissions to perform this action",
    });
  }

  next();
};

const viewBooking = async function (req, res, next) {
  let role = req.body.role;
  const approvedUsers = [Roles.ADMIN, Roles.OFFICE, Roles.SITE_MANAGER];
  if (!approvedUsers.includes(role)) {
    res.status(400).json({
      error:
        "Sorry you don't have the required permissions to perform this action",
    });
  }

  next();
};

const createBooking = async function (req, res, next) {
  let role = req.body.role;
  const approvedUsers = [Roles.ADMIN, Roles.OFFICE];
  if (!approvedUsers.includes(role)) {
    res.status(400).json({
      error:
        "Sorry you don't have the required permissions to perform this action",
    });
  }

  next();
};

const editBooking = async function (req, res, next) {
  let role = req.body.role;
  const approvedUsers = [Roles.ADMIN, Roles.OFFICE];
  if (!approvedUsers.includes(role)) {
    res.status(400).json({
      error:
        "Sorry you don't have the required permissions to perform this action",
    });
  }

  next();
};

const deleteBooking = async function (req, res, next) {
  let role = req.body.role;
  const approvedUsers = [Roles.ADMIN, Roles.OFFICE];
  if (!approvedUsers.includes(role)) {
    res.status(400).json({
      error:
        "Sorry you don't have the required permissions to perform this action",
    });
  }

  next();
};

const viewTask = async function (req, res, next) {
  let role = req.body.role;
  const approvedUsers = [Roles.ADMIN, Roles.OFFICE, Roles.SITE_MANAGER];
  if (!approvedUsers.includes(role)) {
    res.status(400).json({
      error:
        "Sorry you don't have the required permissions to perform this action",
    });
  }
  next();
};

const editTask = async function (req, res, next) {
  let role = req.body.role;
  const approvedUsers = [Roles.ADMIN, Roles.OFFICE, Roles.SITE_MANAGER];
  if (!approvedUsers.includes(role)) {
    res.status(400).json({
      error:
        "Sorry you don't have the required permissions to perform this action",
    });
  }
  next();
};
module.exports = {
  // isAdmin,
  // isOfficeEmployee,
  // isSiteManager,
  // viewMaterial,
  // createMaterial,
  // editMaterial,
  // deleteMaterial,
  // viewBooking,
  // createBooking,
  // editBooking,
  // deleteBooking,
  // viewTask,
  // editTask,
};
