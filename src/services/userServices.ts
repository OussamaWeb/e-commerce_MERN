import { userModel } from "../models/userModel"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

interface RegisterParams {
    firstName: string
    lastName: string
    email: string
    pass: string
}

export const register = async ({ firstName, lastName, email, pass }: RegisterParams) => {
    const findUser = await userModel.findOne({ email })
    if (findUser) {
        return { message: "User Already exists!", statusCode: 400 }
    }
    const hashPassword = await bcrypt.hash(pass, 10)
    const newUser = new userModel({ firstName, lastName, email, pass: hashPassword })
    await newUser.save()
    return { data: generateKay({ firstName, lastName, email }), statusCode: 200 };
}

interface LoginParams {
    email: string
    pass: string
}

export const logIn = async ({ email, pass }: LoginParams) => {
    const findUser = await userModel.findOne({ email })
    if (!findUser) {
        return { data: "Your password or email is not correct", statusCode: 200 };
    }
    const passMatch = await bcrypt.compare(pass, findUser.pass);
    if (passMatch) {
        return { data: generateKay({ firstName: findUser.firstName, lastName: findUser.lastName, email }), statusCode: 200 };
    }
    return { data: "Your password or email is not correct", statusCode: 200 };
}

const generateKay = (data: any) => {
    return jwt.sign(data, process.env.JWT_SECRET || '')
}