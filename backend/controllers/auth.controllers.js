import User from "../models/user.model.js";
import bcrypt from "bcryptjs"


export const signup = async (req, res) => {
    try {
        const {fullName, username, email, password} = req.body;
        const emailRegex= /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if(!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format"})
        }
        const existingUser = await User.finOne({ username})
        if(existingUser) {
            return res.status(400).json({ error: "Username is already taken"})
        }
        const existingEmail = await User.finOne({ emmail})
        if(existingEmail) {
            return res.status(400).json({ error: "Email is already taken"})
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            fullname,
            username,
            email,
            password:hashedPassword
        })

        if (newUser){
            generateTokenAndSetCookie(newUser._id,res)
            await newUser.save()

            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                username: newUser.usarname,
                email: newUser.email,
                followers: newUser.followers,
                following: newUserfollowing,
                profileImg: newUser.profileImg,
                coverImg: newUser.coverImg,
            })
        }else{
                res.status(400).json({ error: "invalid user data"})
            }
        }

     catch (error) {
        console.log("Error in signup controller", error.message)
        res.status(500).json({ error: "Internal Server Error"})
    }
}

export const login = async (req, res) => {
    res.json({
        data: "You hit the login endpoint"
    });
};

export const logout = async (req, res) => {
    res.json({
        data: "You hit the logout endpoint"
    });
};
