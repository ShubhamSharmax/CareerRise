import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { applyJob, getApplications, getCandidateApplications, updateApplicationStatus } from '../controllers/application.controller.js';

const router = express.Router();

router.route("/apply/:id").get(isAuthenticated,applyJob);
router.route("/get").get(isAuthenticated, getApplications);
router.route("/:id/candidates").get( isAuthenticated, getCandidateApplications);
router.route("/status/:id/update").post( isAuthenticated, updateApplicationStatus);

export default router;