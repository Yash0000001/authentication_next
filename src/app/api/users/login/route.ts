import {connect} from "@/dbconfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
connect()

export async function POST(request: NextRequest){
    try{
        const reqBody = await request.json()
        const {email,password} = reqBody;
        console.log(reqBody);
        const user = await User.findOne({email});

        if(!user){
            return NextResponse.json({error: "user does not exists"}, {status: 400})
        }
        console.log("user exists");
        const validPassword = await bcryptjs.compare(password,user.password)
        if(!validPassword){
            return NextResponse.json({error: "Invalid password"}, {status: 400})
        }
        console.log(user);

        const tokenPayload ={
            id:user._id,
            email:user.email,
            username:user.username,
        }

        const token = jwt.sign(tokenPayload,process.env.TOKEN_SECRET!,{expiresIn:"1d"});
        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })
        response.cookies.set("token", token, {
            httpOnly: true, 
            
        })
        return response;
        

    } catch(error:any){
        return NextResponse.json({error: error.message}, {status: 500})
    }
}