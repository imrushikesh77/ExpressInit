import User from "../models/user.model.js";

export const updateUsers = async(req, res) => {
    try {
        // Read the current user count
        const usersData = await User.findOne();
        // Increment the user count
        usersData.totalUsers++;
        // Save the updated user count
        await usersData.save();
        // Send the updated user count in the response
        res.status(200).json({ users: usersData.totalUsers });
    } catch (error) {
        console.error('Error updating user count:', error);
        res.status(500).json({ error: 'Could not update user count' });
    }
}
export const getUsers = async(req, res) => {
    try {
        // Read the current user count
        const usersData = await User.findOne();
        
        res.status(200).json({ users: usersData.totalUsers });
    } catch (error) {
        console.error('Error retriving user count:', error);
        res.status(500).json({ error: 'Could not get user count' });
    }
}


