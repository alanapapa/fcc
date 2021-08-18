const express = require('express')
const {getAllUsers, getUserLogs, createUser, addExercises, getExercises} = require('../controllers/userController')

const router = express.Router();

router.route('/:_id/logs').get(getUserLogs);
router.route('/:userId/exercises').post(addExercises);
router.route('/:userId/exercises').get(getExercises);
router.route('/').get(getAllUsers);
router.route('/').post(createUser);


module.exports = router;