import initModels from '../models/init-models.js';
import sequelize from '../models/connect.js';
import {responseData} from '../config/response.js';
import { decodeToken } from '../config/jwt.js';
import bcrypt from 'bcrypt';

let model = initModels(sequelize)

export const getUser = async (req, res) => {
    try {
        let { token } = req.headers;
        let accessToken = decodeToken(token);
        let getUser = await model.nguoi_dung.findOne({
            where: {
                nguoi_dung_id: accessToken.data.nguoi_dung_id
            }
        })
        responseData(res, "Thành công", getUser, 200);
    }
    catch {
        responseData(res, "Đã có lỗi xảy ra", "", 500);
    }
}

export const saveImgUser = async (req, res) => {
    try {
        let { img_id } = req.params
        let { token } = req.headers;
        let accessToken = decodeToken(token);
        let checkSaved = await model.luu_anh.findOne({
            where: {
                nguoi_dung_id: accessToken.data.nguoi_dung_id,
                hinh_id: img_id
            }
        })
        if (checkSaved) {
            responseData(res, "Lỗi đã tồn tại ảnh lưu","", 400);
            return
        }
        let newData = {
            nguoi_dung_id: accessToken.data.nguoi_dung_id,
            hinh_id: img_id,
            ngay_luu: new Date()
        }
        await model.luu_anh.create(newData)
        responseData(res, "Lưu thành công", "", 200);
    }
    catch {
        responseData(res, "Đã có lỗi xảy ra", "", 500);
    }
}


export const getSavedImg = async (req, res) => {
    try {
        let { token } = req.headers;
        let accessToken = decodeToken(token);
        let savedImg = await model.luu_anh.findAll({
            where: {
                nguoi_dung_id: accessToken.data.nguoi_dung_id
            },
            include: ['hinh']
        })

        responseData(res, "Thành công", savedImg, 200);
    }
    catch {
        responseData(res, "Đã có lỗi xảy ra", "", 500);
    }
}

export const getCreatedImg = async (req, res) => {
    try {
        let { token } = req.headers;
        let accessToken = decodeToken(token);
        let savedImg = await model.hinh_anh.findAll({
            where: {
                nguoi_dung_id: accessToken.data.nguoi_dung_id
            },
        })

        responseData(res, "Thành công", savedImg, 200);
    }
    catch {
        responseData(res, "Đã có lỗi xảy ra", "", 500);
    }
}

export const uploadImg = async (req, res) => {
    try {
        let { token } = req.headers;
        let { file } = req;
        let { ten_hinh, mo_ta } = req.body;
        let accessToken = decodeToken(token);
        let { nguoi_dung_id } = accessToken.data;
        let newImg = {
            ten_hinh,
            duong_dan: file.filename,
            mo_ta,
            nguoi_dung_id,
        }
        await model.hinh_anh.create(newImg)
        responseData(res, "Thêm ảnh thành công", "", 200);
    }
    catch {
        responseData(res, "Đã có lỗi xảy ra", "", 500);
    }
}

export const editInfo = async (req, res) => {
    // try {
        let { ho_ten, tuoi, mat_khau } = req.body;
        let { token } = req.headers;
        let accessToken = decodeToken(token);
        let getUser = await model.nguoi_dung.findOne({
            where: {
                nguoi_dung_id: accessToken.data.nguoi_dung_id
            }
        })
        getUser.ho_ten = ho_ten
        getUser.tuoi = tuoi
        getUser.mat_khau = bcrypt.hashSync(mat_khau, 10);
        await model.nguoi_dung.update(getUser.dataValues, {
            where: {
                nguoi_dung_id: accessToken.data.nguoi_dung_id
            }
        })
        responseData(res, "Sửa thông tin thành công", "", 200);
    // }
    // catch {
    //     responseData(res, "Đã có lỗi xảy ra", "", 500);
    // }
}

export const updateAvatar = async (req, res) => {
    try {
        let { file } = req;
        let { token } = req.headers;
        let accessToken = decodeToken(token);
        let getUser = await model.nguoi_dung.findOne({
            where: {
                nguoi_dung_id: accessToken.data.nguoi_dung_id
            }
        })
        getUser.anh_dai_dien = file.filename;
        await model.nguoi_dung.update(
            getUser.dataValues,
            {
                where: {
                    nguoi_dung_id: accessToken.data.nguoi_dung_id
                }
            })
        responseData(res, "Cập nhật ảnh đại diện thành công",getUser, 200);
    }
    catch {
        responseData(res, "Đã có lỗi xảy ra", "", 500);
    }
}

export const deleteImg = async (req, res) => {
    try {
        let { img_id } = req.params
        let { token } = req.headers;
        let accessToken = decodeToken(token);
        let checkOwner = await model.hinh_anh.findOne({
            where: {
                hinh_id: img_id,
                nguoi_dung_id: accessToken.data.nguoi_dung_id
            }
        })
        if (checkOwner == null ) {
            responseData(res, "Không có quyền xóa" ,"",400);
        } else {
            await model.binh_luan.destroy({
                where: {
                    hinh_id: img_id,
                }
            })
            await model.luu_anh.destroy({
                where: {
                    hinh_id: img_id,
                }
            })
            await model.hinh_anh.destroy({
                where: {
                    nguoi_dung_id: accessToken.data.nguoi_dung_id,
                    hinh_id: img_id,
                }
            })
            responseData(res, "Xóa ảnh thành công", checkOwner, 200);
        }
    }
    catch {
        responseData(res, "Đã có lỗi xảy ra", "", 500);
    }
}
