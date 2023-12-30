import Router from 'express';
import {
	createUserEnergy,
	deleteUserEnergy,
	deleteUserEnergyByUserId,
	getAllUserEnergy,
	getByEnergyID,
	getByUserID,
} from '../controllers/user_energy.controller.js';

const userEnergyRoutes = Router();

// http://localhost:4242/api/user_energy/create
userEnergyRoutes.post('/create/:userID/:energyID', createUserEnergy);
userEnergyRoutes.delete('/delete/:userID/:energyID', deleteUserEnergy);
userEnergyRoutes.delete('/deleteByUserId/:userID', deleteUserEnergyByUserId);
userEnergyRoutes.get('/getAll', getAllUserEnergy);
userEnergyRoutes.get('/getByUserId/:userID', getByUserID);
userEnergyRoutes.get('/getByEnergyId/:energyID', getByEnergyID);

export { userEnergyRoutes };
