import mysql, { Connection, RowDataPacket } from 'mysql2/promise';

class Database {
    private async connect(): Promise<Connection> {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: ''
        });

        return connection;
    }

    public async execute(query: string, values: any[]): Promise<RowDataPacket[]> {
        const connection = await this.connect();
        const [results] = await connection.execute(query, values);
        connection.end();
        return results as RowDataPacket[];
    }
}

export default new Database();