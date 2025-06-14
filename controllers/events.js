import User from "../Model/User.js"

const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (await User.findOne({ Name: name })) {
      if (await User.findOne({ Email: email })) {
        res.send({ message: "you are already register please go to log in page" })
      } 
      else {
        res.send({ message: "Aleary a similer usernsme please use another one" })
      }
    }
    else {
      if (await User.findOne({ Email: email })) {
        res.send({ message: "Already existing another user with same email please use another one " })
      }

      else {
        const newUser = await User.create({
          Name: name,
          Email: email
        });
        newUser.save();

      }
    }

    //   console.log("Received POST /api/users", req.body);


  } catch (err) {
    console.error("Error saving user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const checkUser = async (req, res) => {
  try {
    const { name, email } = req.body;

   
    const user = await User.findOne({ Name: name, Email: email });

    if (user) {
      
        const token = await user.generateToken();
        res.cookie("access_token", token, {
          httpOnly: true,
          secure: false,
          sameSite: "Lax",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        res.status(201).json({
          message: "User login successfully",
          user: {
            id: user._id,
            name: user.Name,
            email: user.Email
          },
          token
        });
      
    } else {
      
      const nameExists = await User.findOne({ Name: name });
   
      const emailExists = await User.findOne({ Email: email });

      if (nameExists && !emailExists) {
        res.send({ message: "Incorrect email" });
      } else if (!nameExists && emailExists) {
        res.send({ message: "Incorrect username" });
      } else {
        res.send({ message: "You are not registered. Please register first." });
      }
    }

  } catch (err) {
    console.error("Error checking user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};








export const showuser = async (req, res) => {
  try {
    const users = await User.find({});
    res.json({ message: users });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};
export default createUser;


