import User from '../../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

const secretKey = process.env.SECRET_KEY;

// Generate JWT
const generateJWT = async (id) => {

    return jwt.sign(
        { id },
        secretKey,
        { expiresIn: '24h' }
    );

};


// LOGIN USER CONTROLLER

export const loginUser = async (req, res) => {

    const { email, password } = req.body;

    try {

        // Find user
        const user = await User.findOne({ email });

        if (!user) {

            return res.status(200).json({
                ok: false,
                msg: 'Email not found'
            });

        }

        // Check password
        const validPassword = bcrypt.compareSync(
            password,
            user.password
        );

        if (!validPassword) {

            return res.status(200).json({
                ok: false,
                msg: 'Incorrect Password'
            });

        }

        // Generate token
        const token = await generateJWT(user._id);


        // Send clean user object (IMPORTANT FIX)

        return res.status(200).json({

            ok: true,

            token: token,

            user: {

                _id: user._id,

                nickname: user.nickname,

                email: user.email,

                role: user.role   // VERY IMPORTANT FOR ADMIN REDIRECT

            },

            msg: 'User Logged'

        });

    }

    catch (error) {

        console.log(error);

        return res.status(500).json({

            ok: false,
            msg: 'Server error'

        });

    }

};
