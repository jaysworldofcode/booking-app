import { auth } from "@clerk/nextjs/server"

export function detect_user_not_login(){
    const { userId, redirectToSignIn } = auth()

    if (userId == null) return redirectToSignIn()

    return userId
}