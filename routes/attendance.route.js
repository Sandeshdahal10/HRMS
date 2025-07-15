import express from 'express'

import {getAllAttendance,getAttendanceById,checkInAttendance,checkOutAttendance } from '../controller/attendance.controller.js';
import { verifyToken, authorizationRoles } from '../middleware/verifytoken.js';

const router = express.Router();


router.get('/', verifyToken, authorizationRoles('Admin','Manager'), getAllAttendance);
router.get('/:id', verifyToken, authorizationRoles('Employee'), getAttendanceById);
router.post('/checkin', verifyToken, authorizationRoles('Employee'), checkInAttendance);
router.post('/checkout', verifyToken, authorizationRoles('Employee'), checkOutAttendance);

export default router;
