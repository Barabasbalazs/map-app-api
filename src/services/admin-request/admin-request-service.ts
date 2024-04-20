import adminRequestModel from "../../models/admin-request-model.js";

const adminRequestService = {
  createAdminRequest: async function (id: string) {
    return await adminRequestModel.create({ user: id });
  },
  getAdminRequests: async function () {
    return await adminRequestModel.find().populate("user");
  },
  getAdminRequestById: async function (id: string) {
    return await adminRequestModel.findById(id).populate("user");
  },
  deleteAdminRequest: async function (id: string) {
    return await adminRequestModel.findByIdAndDelete(id);
  },
};

export default adminRequestService;
