const userModel = require('../Model/UserModel')

exports.createUser = async(req,res)=>{
    const data = req.body
    console.log("dattttttttttttaaaaaaaaaaaaaaaaaaaa",data)
    const user = new userModel(data)
    await user.save()
    res.status(200).json(user);
}

exports.getAllUser = async(req,res)=>{
    const user = await userModel.find()
    res.status(200).json(user);
}