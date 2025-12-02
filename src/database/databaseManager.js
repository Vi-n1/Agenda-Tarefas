import getDatabase from "./Utils/DatabaseInstance"


export default class databaseManager {

    constructor() {
        this.db = getDatabase();
    }

    addClient(client, callback) {
        const query = `
        INSERT INTO clients (name, quantity, description, date)
        VALUES (?, ?, ?, ?)`;

        this.db.transaction((tx) => {
            tx.executeSql(
                query,
                client.toArray(),
                () => {
                    console.log("Client saved successfully");
                    callback(true);
                },
                (error) => {
                    console.log("Error saving Client: ", error)
                    callback(false);
                },
            );
        });
    }

    delClient(client) {
        const query = "DELETE FROM clients WHERE name = ?";

        this.db.transaction((tx) => {
            tx.executeSql(
                query,
                [client.name],
                (tx, results) => {
                    if (results.rowsAffected > 0) {
                        console.log("Record deleted successfully");
                    } else {
                        console.log("No record found with the given name");
                    }
                },
                error => {
                    console.log("Error deleting record: ", error);
                }
            )
        })

    }

    deleteAllRecords = () => {
        this.db.transaction(tx => {
            tx.executeSql(
                'DELETE FROM clients', // Substitua 'orders' pelo nome da sua tabela
                [],
                (tx, results) => {
                    console.log('All records deleted successfully');
                },
                error => {
                    console.log('Error deleting all records: ', error);
                }
            );
        });
    };

    getAll(callback) {
        const query = "SELECT * FROM clients";

        this.db.transaction((tx) => {
            tx.executeSql(
                query,
                [],
                (tx, results) => {
                    const rows = results.rows.raw();
                    callback(rows);
                },
                (error) => { console.log("Error fetching records: ", error) }
            );
        });
    }

}
