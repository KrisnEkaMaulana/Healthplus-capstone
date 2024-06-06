const UsersModel = require('../models/users');
const getAllUsers = async (req,res) => {
    try{
        const [data]= await UsersModel.getAllUsers();
        res.json({
            message: 'GET all users success',
            data: data
        })
    } catch (error){
        res.status(500).json({
            message: 'Server error',
            serverMessage: error,
        })
    }
}

const createNewUser = async (req,res) => {
    const {body} = req;

    if(!body.email || !body.name || !body.address){
        return res.status(400).json({
            message: 'Anda mengirimkan data yang salah',
            data: null,
        })
    }
    try {
        await UsersModel.createNewUSer(body);
            res.status(201).json({
                message: 'CREATE new user success',
                data: body
            })
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            serverMessage: error,
        })
    }
}


const updateUser = async (req, res) => {
    const {idUSer} = req.params;
    const {body} = req;
    try {
        await UsersModel.updateUSer(body, idUSer);
            res.json({
                message: 'CREATE new user success',
                data: {
                    id: idUser,
                    ...body
                }
            })
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            serverMessage: error,
        })
    }
}

const deleteUser = async (req, res) => {
    const{idUser} = req.params;
    try {
        await UsersModel.deleteUser(idUser); 
        res.json({
            message: 'delete user success',
            data: null
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            serverMessage: error,
        })
    }
}
module.exports ={
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
}