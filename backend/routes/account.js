const express = require('express')
const authMiddleware = require('../middleware')
const {Accounts} = require('../db')


const router = express.Router();

router.get('/balance', authMiddleware, async(req, res) =>{
   const account = await Accounts.findOne({
    userId : req.userId
   });

   res.json({
    balance : account.balance,
   })
})

router.post('/transfer', authMiddleware, async(req, res) =>{
    const session = await Accounts.startSession();
    session.startTransaction();
    const {to, amount} = req.body;
    
    //fetch the accounts in the transaction 
    const account = await Accounts.findOne({
        userId : req.userId,
    }).session(session);

    if(!account || account.balance < amount){
        return res.status(411).json({
            message : "Insufficient balance"
        });
    }

    const toAccount = await Accounts.findOne({
        userId : to
    }).session(session);
    if(!toAccount){
        await session.abortTransaction();
        return res.status(411).json({
            message : "Invalid account"
        })
    }

    await Accounts.updateOne({userId : req.userId}, {$inc:{balance: -amount}}).session(session);
    await Accounts.updateOne({userId : to}, {$inc:{balance: amount}}).session(session);

    await session.commitTransaction();
    res.json({
        message : `${amount} transfered`
    })
})

module.exports = router 