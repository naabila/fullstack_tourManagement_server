import passport from "passport";
import { envVars } from "./env";
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from "passport-google-oauth20";
import { Strategy as LocalStrategy } from "passport-local";
import { VerifyFunction } from "passport-local";
import { User } from "../modules/user/user.model";
import { Role } from "../modules/user/user.interface";
import bcryptjs from "bcryptjs"


//credential login
//custom login =================
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    (async (email: string, password: string, done) => {
      try {
        const isUserExist = await User.findOne({ email });

        if (!isUserExist) {
          return done(null, false, { message: "User does not exist" });
        }

        // check google auth
        const isGoogleAuthenticated = isUserExist.auths.some(
          (providerObjects) => providerObjects.provider === "google"
        );

        if (isGoogleAuthenticated && !isUserExist.password) {
          return done(null, false, {
            message:
              "You signed up with Google. Please set a password first.",
          });
        }

        const isPasswordMatched = await bcryptjs.compare(
          password,
          isUserExist.password as string
        );

        if (!isPasswordMatched) {
          return done(null, false, {
            message: "Password did not match",
          });
        }

        return done(null, isUserExist);
      } catch (error) {
        return done(error);
      }
    }) as VerifyFunction
  )
);


//google configuration
passport.use(
    new GoogleStrategy(
        {
            clientID:envVars.GOOGLE_CLIENT_ID,
            clientSecret:envVars.GOOGLE_CLIENT_SECRET,
            callbackURL:envVars.GOOGLE_CALLBACK_URL
        },async(
            accessToken:string,refreshToken:string,
            profile:Profile,
            done:VerifyCallback
        )=>{
            try{
                const email=profile.emails?.[0].value;
                if(!email){
                    return done(null,
                        false,
                        {message:"No email found"}
                    )
                }
                let user=await User.findOne({email})
                if(!user){
                    user=await User.create({
                        email,
                        name:profile.displayName,
                        picture:profile.photos?.[0].value,
                        role:Role.USER,
                        isVerified:true,
                        auths:[
                            {
                                provider:"google",
                                providerId:profile.id
                            }
                        ]
                    })
                }
                return done(null,user)
            }catch(error){
                console.log("Google stratigy error",error);
                return error;
            }
        }
    )
)

//serialize user
passport.serializeUser((user: any, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    console.error("Deserialization error:", error);
    done(error);
  }
});
