import dbConnect from "@/lib/db";
import User from "@/models/user.model";
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";




const handler = NextAuth({
  // Configure one or more authentication providers
  providers: [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }    
  })
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ account, profile }: any) {
      console.log(profile)
      try {
        await dbConnect()
        const userExists = await User.findOne({ email: profile.email })

            if (!userExists) {
                const user = await User.create({ 
                    email: profile.email,
                    username: profile.name.replace(" ", "").toLowerCase(),
                    profileImg: profile.picture
            })
        }

        return true;
        
      } catch (error) {
        console.log(error);
        return false
      }
    },
    async session({ session, token, user }: any) {
      // Send properties to the client, like an access_token from a provider.
      const sessionUser = await User.findOne({ email: session.user.email})

      session.user.id = sessionUser._id.toString()

      return session
    }    
  }  
})

export { handler as GET, handler as POST }