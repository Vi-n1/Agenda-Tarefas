import React, { useCallback, useState } from "react";
import { View, FlatList, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import dayjs from "dayjs";

import databaseManager from "../../database/databaseManager";
import styles from "./styles";

const database = new databaseManager()

const ListClients = () => {
    const [data, setData] = useState([]);

    const fetchData = useCallback(() => {
        database.getAll(setData);
    }, []);

    // Chama fetchData sempre que a tela ganha foco
    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [fetchData])
    );

    const formatDate = (dateString) => {
        return dayjs(dateString).locale("pt-br").format("DD/MM/YYYY HH:mm");
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.rowLayout}>
                        <Text style={styles.textName}>
                            👤 Nome: {item.name}{"\n"}
                            🛒 Quantidade: {item.quantity}{"\n"}
                            📅 Data: {formatDate(item.date)}{"\n"}
                            📖 Descrição:{"\n"}{item.description}
                        </Text>
                    </View>
                )}
            >

            </FlatList>
        </View>
    )
}

export default ListClients;