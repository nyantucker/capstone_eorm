import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import bcrypt from 'bcrypt';
import { responseData } from "../config/response.js";
import { createRefToken, createToken } from "../config/jwt.js";

let model = initModels(sequelize)

export const signUp = async (req, res) => {
    try {
        let { email, mat_khau, ho_ten, tuoi } = req.body
        let checkNguoiDung = await model.nguoi_dung.findOne({
            where: {
                email
            }
        })
        if (checkNguoiDung) {
            responseData(res,"Email đã sử dụng","",400)
            return;
        }
        let newData = {
            email, 
            mat_khau: bcrypt.hashSync(mat_khau, 10),
            ho_ten, 
            tuoi,
            anh_dai_dien: "",
            refresh_token: "",
        }
        await model.nguoi_dung.create(newData)
        responseData(res,"Đăng ký thành công","",200)
    }
    catch {
        responseData(res,"Đăng ký thất bại","",500)
    }
}

export const login = async (req, res) => {
    try {
        let { email, mat_khau } = req.body;
        let checkNguoiDung = await model.nguoi_dung.findOne({
            where: {
                email
            }
        })
        if (checkNguoiDung) {
            if (bcrypt.compareSync(mat_khau, checkNguoiDung.mat_khau)) {
                let key = new Date().getTime();
                let token = createToken({
                    nguoi_dung_id: checkNguoiDung.nguoi_dung_id,
                    key
                })
                let refToken = createRefToken({
                    nguoi_dung_id: checkNguoiDung.nguoi_dung_id,
                    key
                })
                await model.nguoi_dung.update(
                    {...checkNguoiDung.dataValues, refresh_token: refToken},
                    {
                        where: {
                            nguoi_dung_id: checkNguoiDung.nguoi_dung_id
                        }
                    }
                )
                responseData(res, "Đăng nhập thành công", token, 200);
            } else {
                responseData(res, "Mật khẩu không đúng", "", 400);
            }
        } else {
            responseData(res, "Email chưa đăng ký", "", 400);
        }
    }
    catch {
        responseData(res, "Đã có lỗi xảy ra", "", 500);
    }
}