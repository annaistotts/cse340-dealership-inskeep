import { Router } from 'express';
import { requireEmployee } from '../middleware/auth.js';
import {
  buildAdminDashboard,
  buildVehicleManagement,
  buildVehicleEdit,
  updateVehicleDetails,
  buildReviewModeration,
  deleteReviewModeration,
  buildServiceDashboard,
  buildServiceDetail,
  updateServiceRequest,
  buildContactDashboard,
} from '../controllers/admin/controller.js';

const router = Router();

router.get('/admin', requireEmployee, (req, res) => {
  res.redirect('/admin/dashboard');
});
router.get('/admin/dashboard', requireEmployee, buildAdminDashboard);
router.get('/admin/vehicles', requireEmployee, buildVehicleManagement);
router.get('/admin/vehicles/:vehicleId/edit', requireEmployee, buildVehicleEdit);
router.post('/admin/vehicles/:vehicleId/edit', requireEmployee, updateVehicleDetails);
router.get('/admin/reviews', requireEmployee, buildReviewModeration);
router.post('/admin/reviews/:reviewId/delete', requireEmployee, deleteReviewModeration);
router.get('/admin/service', requireEmployee, buildServiceDashboard);
router.get('/admin/service/:requestId', requireEmployee, buildServiceDetail);
router.post('/admin/service/:requestId', requireEmployee, updateServiceRequest);
router.get('/admin/contact', requireEmployee, buildContactDashboard);

export default router;