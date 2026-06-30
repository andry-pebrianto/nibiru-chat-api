const { failed } = require("../utils/createResponse");
const deleteFile = require("../utils/deleteFile");

module.exports = (req, res, next) => {
  try {
    if (req.files) {
      if (req.files.photo) {
        if (req.files.photo[0].size > 2000000) {
          deleteFile(req.files.photo[0].path);
          failed(res, {
            code: 400,
            payload: "File photo too large, max 2mb",
            message: "Upload File Error",
          });
          return;
        }
      }

      if (req.files.video) {
        if (req.files.video[0].size > 5000000) {
          deleteFile(req.files.video[0].path);
          failed(res, {
            code: 400,
            payload: "File video too large, max 5mb",
            message: "Upload File Error",
          });
          return;
        }
      }
    }

    next();
  } catch (error) {
    failed(res, {
      code: 500,
      payload: error.message,
      message: "Internal Server Error",
    });
  }
};
