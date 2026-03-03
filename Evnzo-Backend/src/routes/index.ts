import { Router } from 'express';
import { END_POINTS } from '@constant';
import { healthRouter } from '@routes/health/health.routes';
import { userRouter } from '@modules/user/user.routes';
import { authRouter } from '@modules/auth/auth.routes';
import { eventFormRouter } from '@modules/event-form/event-form.routes';
import { formFieldRouter } from '@modules/form-field/form-field.routes';
import { formSubmissionRouter } from '@modules/form-submission/form-submission.routes';

export const router = Router();

router.use(`${END_POINTS.V1}${END_POINTS.HEALTH}`, healthRouter);
router.use(`${END_POINTS.V1}${END_POINTS.USER}`, userRouter);
router.use(`${END_POINTS.V1}${END_POINTS.AUTH}`, authRouter);
router.use(`${END_POINTS.V1}${END_POINTS.EVENT_FORM}`, eventFormRouter);
router.use(`${END_POINTS.V1}${END_POINTS.FORM_FIELD}`, formFieldRouter);
router.use(`${END_POINTS.V1}${END_POINTS.FORM_SUBMISSION}`, formSubmissionRouter);

export default router;

