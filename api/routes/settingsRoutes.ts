import express from 'express';
import { newSettings } from '../controllers/Settings/newSettings.controller';
import { getSettingsByLicense } from '../controllers/Settings/getSettingsByLicense.cotroller';
import { updateSettings } from '../controllers/Settings/updateSettings';
const CheckAuth = require('../middlewares/client/check-auth');

const router = express.Router();

router.post('/', CheckAuth, newSettings);
router.get('/', CheckAuth, getSettingsByLicense);
router.put('/:settingsID', CheckAuth, updateSettings);

module.exports = router;