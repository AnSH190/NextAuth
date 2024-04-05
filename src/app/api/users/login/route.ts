import { connect } from "@/Database/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json()
        const {email , password} = reqBody

        const user = await User.findOne({email})

        if (!user) {
            return NextResponse.json({
                error: "User does not exists in database", 
            },{
                status: 400
            })
        }

        console.log(user);
        
        const validPassword = await bcryptjs.compare(password, user.password)
        
        if(!validPassword) {
            return NextResponse.json({
                error: "Invalid password", 
            },{
                status: 400
            })
        }

    const tokenData = {
        id: user._id,
        username: user.username
    }

    const token = await jwt.sign(tokenData, process.env.TOKEN! , {expiresIn: "1h"})

    const response = NextResponse.json({
        message: "User logged in successfully",
        success: true
    })

    response.cookies.set("token" , token , {
        httpOnly: true,
    
    })


    return response
    } catch (error:any) {
        return NextResponse.json({
            error: error.message, 
        },{
            status: 500
        })
    }
}