import { Request, Response } from 'express';
import { UserModel } from '../models';
import bcrypt from 'bcrypt';

class UserController {
    
    public create = async (req: Request, res: Response): Promise<void> => {
        try {
            const { userData } = req.body;

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
            userData.password = hashedPassword;

            const createUser = await UserModel.create(userData);

            if (createUser) {
                res.status(200).json({ success: true, msg: 'Cadastro realizado' });
            }
        } catch (error) {
            res.status(500).json({ success: false, msg: 'Erro' });
        }
    }

    public doLogin = async (req: Request, res: Response): Promise<void> => {
        try {
            const { userData } = req.body;
            const user = await UserModel.readByEmail(userData.email);
            
            if (user) {
                const userPassword = user[0].password;
                const passwordMatch = await bcrypt.compare(userData.password, userPassword);

                if (passwordMatch) {
                    res.status(200).json({ success: true, msg: 'Usuário autenticado', user: user });
                } else {
                    res.status(401).json({ success: false, msg: 'Usuário não autenticado' });
                }
            } else {
                res.status(404).json({ success: false, msg: 'Usuário não encontrado' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, msg: 'Erro no servidor' });
        }
    }
}

export default new UserController();