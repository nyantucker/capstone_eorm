import initModels from '../models/init-models.js';
import sequelize from '../models/connect.js';
import { responseData } from '../config/response.js';
import { Sequelize } from 'sequelize';
import { decodeToken } from '../config/jwt.js';
let model = initModels(sequelize)
let Op = Sequelize.Op

export const getImg = async (req, res) => {
    try {
        let data = await model.hinh_anh.findAll()
        responseData(res, "Thành công", data, 200);
    }
    catch {
        responseData(res, "Đã có lỗi xảy ra", "", 500);
    }
}

export const searchImg = async (req, res) => {
    try {
        let { name } = req.params
        let data = await model.hinh_anh.findAll({
            where: {
                ten_hinh: {
                    [Op.like]: `%${name}%`
                }
            }
        })
        responseData(res, "Thành công", data, 200);
    }
    catch {
        responseData(res, "Đã có lỗi xảy ra", "", 500);
    }
}

export const getImgById = async (req, res) => {
    try {
       let { img_id } = req.params
       let data = await model.hinh_anh.findOne({
            where: {
                hinh_id: img_id
            },
            include: ['nguoidung_id'],
       })
       responseData(res, "Thành công", data, 200);
    }
    catch {
        responseData(res, "Đã có lỗi xảy ra", "", 500);
    }
}

export const getCmtImg = async (req, res) => {
    try {
        let { img_id } = req.params
        let data = await model.binh_luan.findAll({
            where: {
                hinh_id: img_id
            },
            include: ['nguoi_dung']
        })
        responseData(res, "Thành công", data, 200);
    }
    catch {
        responseData(res, "Đã có lỗi xảy ra", "", 500);
    }
}

export const saveImg = async (req, res) => {
    try {
        let { img_id } = req.params
        let { token } = req.headers
        let getNguoiDung = decodeToken(token)
        let { nguoi_dung_id } = getNguoiDung.data

        let data = await model.luu_anh.findOne({
            where: {
                hinh_id: img_id,
                nguoi_dung_id: nguoi_dung_id 
            }
        })
        if (data) {
            responseData(res, "Đã lưu", "da-luu", 200)
        } else {
            responseData(res, "Chưa lưu", "chua-luu", 200)
        }
    }
    catch {
        responseData(res, "Đã có lỗi xảy ra", "", 500);
    }
}

export const commentImg = async (req, res) => {
    try {
        let { img_id } = req.params
        let { token } = req.headers
        let { noi_dung } = req.body
        let getNguoiDung = decodeToken(token)
        let { nguoi_dung_id } = getNguoiDung.data
        let newCmt = {
            nguoi_dung_id,
            hinh_id: img_id,
            ngay_binh_luan: new Date(),
            noi_dung
        }
        await model.binh_luan.create(newCmt)
        responseData(res, "Bình luận thành công", "", 200)
    }
    catch {
        responseData(res, "Đã có lỗi xảy ra", "", 500);
    }
}

