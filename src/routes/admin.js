import { Router } from 'express';
import { requireEmployee, requireOwner } from '../middleware/auth.js';
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
  buildCategoryDashboard,
  buildAddCategory,
  addCategory,
  buildEditCategory,
  editCategory,
  removeCategory,
  buildVehicleDashboard,
  buildAddVehicle,
  addVehicle,
  buildEditVehicle,
  editVehicle,
  removeVehicle,
  buildOwnerDashboard,
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
router.get('/owner', requireOwner, buildOwnerDashboard);
router.get('/owner/categories', requireOwner, buildCategoryDashboard);
router.get('/owner/categories/add', requireOwner, buildAddCategory);
router.post('/owner/categories/add', requireOwner, addCategory);
router.get('/owner/categories/:categoryId/edit', requireOwner, buildEditCategory);
router.post('/owner/categories/:categoryId/edit', requireOwner, editCategory);
router.post('/owner/categories/:categoryId/delete', requireOwner, removeCategory);
router.get('/owner/vehicles', requireOwner, buildVehicleDashboard);
router.get('/owner/vehicles/add', requireOwner, buildAddVehicle);
router.post('/owner/vehicles/add', requireOwner, addVehicle);
router.get('/owner/vehicles/:vehicleId/edit', requireOwner, buildEditVehicle);
router.post('/owner/vehicles/:vehicleId/edit', requireOwner, editVehicle);
router.post('/owner/vehicles/:vehicleId/delete', requireOwner, removeVehicle);

export default router;