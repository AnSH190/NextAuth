import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
    try {
        const gotCokkie = request.cookies.get("token")?.value || "";
        const decodedToken:any = jwt.verify(gotCokkie, process.env.TOKEN!)
        return decodedToken.id

    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        })
    }
}