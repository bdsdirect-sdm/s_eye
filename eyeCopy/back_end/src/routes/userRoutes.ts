// routes/userRoutes.ts
import { Router } from 'express';
import { getUsers, addUser, loginUser, check, userDetails, addOrUpdateUserAddress, getUserById, updateUser, deleteUserAddress, updatePassword } from '../controller/userController';
import {validateUser} from '../middleware/validateUser'
import { upload } from '../middleware/upload';
import { authorizeUser } from '../middleware/authorizeUser';
// import { getMessages, sendMessage } from '../controller/chatController';

const router = Router();

router.get('/', check);
router.post('/auth/signup', addUser);
router.get('/users', getUsers);
router.get('/getUserById/:userId', getUserById);
router.put('/updateUser/:userId', updateUser);
router.put('/updatePassword/:userId', updatePassword);
router.post('/addOrUpdateUserAddress/:userId/:addressId?', addOrUpdateUserAddress);
router.delete('/deleteUserAddress/:userId/:addressId', deleteUserAddress);
// router.post('/signup', upload.fields([{name:"profileImg"},{name:"resume"}]), validateUser,addUser);
router.get('/userDetails/:userId',authorizeUser, userDetails)
router.post('/auth/login',loginUser)

// router.post('/chat/send', sendMessage);
// router.get('/chat/:userId/:agencyId', getMessages);


export default router;
