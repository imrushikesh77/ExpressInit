import fs from 'fs/promises';
import path from 'path';

// Define the path to the JSON file inside the "data" folder
const filePath = path.join(process.cwd(), 'data', 'users.json');

export const updateUsers = async(req, res) => {
    try {
        // Read the current user count
        const data = await fs.readFile(filePath, 'utf-8');
        const usersData = JSON.parse(data);
        
        // Increment the count
        usersData.totalUsers += 1;

        // Write the updated count back to the file
        await fs.writeFile(filePath, JSON.stringify(usersData, null, 2));

        // Respond with the updated count
        res.status(200).json({ users: usersData.totalUsers });
    } catch (error) {
        console.error('Error updating user count:', error);
        res.status(500).json({ error: 'Could not update user count' });
    }
}
export const getUsers = async(req, res) => {
    try {
        // Read the current user count
        const data = await fs.readFile(filePath, 'utf-8');
        const usersData = JSON.parse(data);
        res.status(200).json({ users: usersData.totalUsers });
    } catch (error) {
        console.error('Error retriving user count:', error);
        res.status(500).json({ error: 'Could not get user count' });
    }
}


