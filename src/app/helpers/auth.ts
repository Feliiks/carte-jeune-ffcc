import jwt from "jsonwebtoken"

export const getUserSession = async (sessionToken: any) => {
  let check = await jwt.verify(sessionToken, process.env.TOKEN_KEY!)
  console.log(check)
}
