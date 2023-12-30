import express from 'express';
import { deleteImg, editInfo, getCreatedImg, getSavedImg, getUser, saveImgUser, updateAvatar, uploadImg } from '../controller/userController.js';
import { upload } from '../config/upload.js';

const userRoute = express.Router();

// API lấy thông tin người dùng
userRoute.get("/get-user", getUser)

// API lưu ảnh
userRoute.post("/save-img/:img_id", saveImgUser)

// API lấy danh sách ảnh đã lưu theo user id
userRoute.get("/get-saved-img", getSavedImg)

// API lấy danh sách ảnh đã tạo theo user id
userRoute.get("/get-created-img", getCreatedImg)

// API thêm ảnh
userRoute.post("/upload-img", upload.single("hinhAnh"), uploadImg)

// API sửa thông tin user
userRoute.put("/edit-info", editInfo)
userRoute.post("/update-avatar", upload.single("avatar"), updateAvatar) 

// API xóa ảnh
userRoute.delete("/delete-img/:img_id", deleteImg)


export default userRoute