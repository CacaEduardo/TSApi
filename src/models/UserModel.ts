import db from '../services/db';

interface UserData {
    email: string;
    password: string;
    name: string;
}

class UserModel {
    public create = async (userData: UserData): Promise<any> => {
        const { email, password, name } = userData;
        const query = 'INSERT INTO checkar.tb_user (email, password, name) VALUES (?, ?, ?)';
        return await db.execute(query, [email, password, name]);
    }

    public readByEmail = async (email: string): Promise<any> => {
        const query = 'SELECT * FROM deliveryeats.tb_user WHERE email = ? ';
        const user = await db.execute(query, [email]);
        return user;
    }
}

export default new UserModel();