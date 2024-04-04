import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { getDataFromToken } from "@/helpers/GetTokenData";

connect();

export async function POST(request:NextRequest) {
    try {
        const userId = await getDataFromToken(request)
        const user = await User.findOne({_id: userId}).select("-password")

        if(!user) {
            return NextResponse.json({
                message: "User Not Found by the given ID",
            }, {
                status: 404
            })
        }

        return NextResponse.json({
            message: "User Found Hurrraayyyyy!!!",
            data: user
        })

    } catch (error:any) {
        return NextResponse.json({
            error: error.message,
        }, {
            status: 500
        })
    }
}