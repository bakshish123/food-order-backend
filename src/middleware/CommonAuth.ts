import { Request, NextFunction, Response } from 'express'
import {AuthPayload } from '../dto'
import { ValidateSignature } from '../utility';
import mongoose from 'mongoose';

declare global {
    namespace Express{
        interface Request{
            user?: AuthPayload
        }
    }
}

export const Authenticate = async (req: Request, res: Response, next: NextFunction) => {

    const signature = await ValidateSignature(req);
if (signature && req.user && mongoose.isValidObjectId(req.user._id)) {
    return next();
}
return res.json({ message: "User Not authorised" });

}