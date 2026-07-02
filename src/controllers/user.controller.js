const userModel = require('../models/user.model');
const createPagination = require('../utils/createPagination');
const { success, failed } = require('../utils/createResponse');
const deleteFile = require('../utils/deleteFile');
const uploadToRustfs = require('../utils/uploadToRustfs');

module.exports = {
  list: async (req, res) => {
    try {
      const { search, page, limit } = req.query;
      const count = await userModel.countAll();
      const paging = createPagination(count.rows[0].count, page, limit);
      const users = await userModel.selectAll(paging, search);

      success(res, {
        code: 200,
        payload: users.rows,
        message: 'Select List User Success',
        // pagination: paging.response,
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: 'Internal Server Error',
      });
    }
  },
  detail: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await userModel.findBy('id', id);

      // jika user tidak ditemukan
      if (!user.rowCount) {
        failed(res, {
          code: 404,
          payload: `User with Id ${id} not found`,
          message: 'Select Detail User Failed',
        });
        return;
      }

      success(res, {
        code: 200,
        payload: user.rows[0],
        message: 'Select Detail User Success',
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: 'Internal Server Error',
      });
    }
  },
  updateProfile: async (req, res) => {
    try {
      const { id } = req.params;

      const user = await userModel.findBy('id', id);
      // jika user tidak ditemukan
      if (!user.rowCount) {
        failed(res, {
          code: 404,
          payload: `User with Id ${id} not found`,
          message: 'Update User Failed',
        });
        return;
      }

      await userModel.updateById(id, req.body);

      success(res, {
        code: 200,
        payload: null,
        message: 'Update User Success',
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: 'Internal Server Error',
      });
    }
  },
  updatePhoto: async (req, res) => {
    try {
      const { id } = req.params;

      const user = await userModel.findBy('id', id);
      // jika user tidak ditemukan
      if (!user.rowCount) {
        // hapus jika ada upload photo
        if (req.files) {
          if (req.files.photo) {
            deleteFile(req.files.photo[0].path);
          }
        }

        failed(res, {
          code: 404,
          payload: `User with Id ${id} not found`,
          message: 'Update User Photo Failed',
        });
        return;
      }

      let { photo } = user.rows[0];
      // jika ada upload photo
      if (req.files) {
        // upload photo
        if (req.files.photo) {
          photo = await uploadToRustfs(req.files.photo[0]);
          deleteFile(req.files.photo[0].path);
        }
      }

      await userModel.changePhoto(user.rows[0].id, photo);

      success(res, {
        code: 200,
        payload: null,
        message: 'Update User Photo Success',
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: 'Internal Server Error',
      });
    }
  },
};
