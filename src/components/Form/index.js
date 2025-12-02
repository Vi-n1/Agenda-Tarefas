import React, { useState } from "react";
import { TextInput, Button, Snackbar } from "react-native-paper";
import { View, Text } from "react-native";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import DateTimePicker from "react-native-ui-datepicker";

import databaseManager from "../../database/databaseManager";
import clients from "../../model/client";
import { scheduleNotification, enableBackgroundNotifications } from "../../notification/handleNotification";
import styles from "./styles";

const database = new databaseManager()
enableBackgroundNotifications()

const Form = () => {
    dayjs.locale("pt-br");

    const [date, setDate] = useState(dayjs());
    const [name, setName] = useState("")
    const [quantity, setQuantity] = useState("")
    const [description, setDescription] = useState("")
    const [isScheduled, setIsScheduled] = useState(false)

    function saveNewClient() {
        let client = new clients(
            name,
            quantity,
            description,
            date
        )

        //database.deleteAllRecords() // testing
        database.addClient(client, (success) => {

            if (success) {
                scheduleNotification(client.date, client.name, (scheduled) => {
                    if (scheduled) {
                        setIsScheduled(true)
                    }
                });
            }
        });

    }

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <TextInput
                    label="Nome do cliente"
                    mode="flat"
                    style={styles.inputName}
                    onChangeText={setName}
                />

                <TextInput
                    label="Quantidade de salgados"
                    mode="flat"
                    keyboardType="numeric"
                    style={styles.inputNumber}
                    onChangeText={setQuantity}
                />

                <TextInput
                    label="Descrição"
                    mode="flat"
                    style={styles.inputName}
                    multiline={true}
                    onChangeText={setDescription}
                />

                <View style={styles.datePicker}>
                    <DateTimePicker
                        mode="single"
                        date={date}
                        minDate={dayjs().subtract(1, "day")}
                        timePicker={true}
                        locale="pt"
                        onChange={(params) => setDate(params.date)}
                        selectedItemColor="#9542FF"
                    ></DateTimePicker>
                </View>
                <Button
                    icon={"calendar"}
                    mode="elevated"
                    style={styles.button}
                    onPress={() => saveNewClient()}
                >
                    Agendar
                </Button>
                <Snackbar
                    visible={isScheduled}
                    onDismiss={() => setIsScheduled(false)}
                    duration={1000}
                    elevation={5}
                    action={{
                        label: "fechar",
                        textColor: "#9542FF"
                    }}
                    style={{ backgroundColor: "#f4ecff", borderRadius: 20 }}
                >
                    <Text style={{ color: "#9542FF" }}>Cliente agendado 🙏</Text>

                </Snackbar>
            </View>
        </View>
    );
}

export default Form;