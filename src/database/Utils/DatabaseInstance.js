import { openDatabase } from "react-native-sqlite-storage";


export default function getDatabase() {
    const db = openDatabase(
        {
            name: "mydatabase.db",
            location: "default",
        },
        () => console.log("Database opened successfully")
        ,
        (error) => {
            console.log("Error opening database: ", error);
        }
    )

    let createTable = `
        CREATE TABLE IF NOT EXISTS clients (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            quantity INTEGER NOT NULL,
            description TEXT NOT NULL,
            date TEXT NOT NULL
        )`;

    db.transaction((tsx) => {
        tsx.executeSql(
            createTable,
            [],
            () => {
                console.log("Table created successfully");
            },
            (error) => {
                console.log("Error creating table:", error);
            }
        );

    });

    return db;
}


