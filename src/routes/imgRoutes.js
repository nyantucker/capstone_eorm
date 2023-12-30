import express from 'express';
import { commentImg, getCmtImg, getImg, getImgById, saveImg, searchImg } from '../controller/imgController.js';

const imgRoute = express.Router();

// API lấy danh sách hình ảnh
imgRoute.get("/get-img", getImg)

// API tìm danh sách hình ảnh theo tên
imgRoute.get("/get-img-by-name/:name", searchImg)

// API lấy thông tin ảnh bằng id ảnh
imgRoute.get("/get-img-by-id/:img_id", getImgById)

// API lấy thông tin bình luận ảnh bằng id ảnh
imgRoute.get("/get-cmt-img/:img_id", getCmtImg)

// API lấy thông tin lưu ảnh
imgRoute.get("/get-save-info/:img_id", saveImg)

// API thêm bình luận
imgRoute.post("/comment-img/:img_id", commentImg)

export default imgRoute