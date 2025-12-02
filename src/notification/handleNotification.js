import notifee, { AndroidImportance, AndroidVisibility, TriggerType, EventType } from "@notifee/react-native";
import dayjs from "dayjs";

/**
 * Agendar uma notificação de lembrete de entrega.
 *
 * Esta função solicita permissão para enviar notificações, garante que um canal de notificação
 * padrão esteja criado e, em seguida, agenda uma notificação para ser disparada em uma data e hora específicas.
 *
 * @async
 * @function scheduleNotification
 * @param {Object} dateTime - Um objeto `dayjs` ou uma string/data que será convertida em `dayjs`, representando a data e hora da entrega.
 * @param {string} nameClient - O nome do cliente para o qual a entrega está agendada.
 * @param {function(boolean):void} callback - Uma função de callback que será chamada após a tentativa de agendamento da notificação. Recebe um parâmetro booleano que indica se o agendamento foi bem-sucedido (`true`) ou falhou (`false`).
 * 
 * @throws {Error} - Lança um erro se houver falha ao solicitar permissão, criar o canal ou agendar a notificação.
 *
 * @example
 * // Agendar uma notificação para 25 de dezembro de 2024 às 15:30
 * const date = dayjs('2024-12-25 15:30');
 * const name = "João Silva";
 * scheduleNotification(date, name);
 *
 * @description
 * A notificação será disparada no horário especificado e incluirá o nome do cliente e a data/hora da entrega
 * no corpo da notificação. O canal de notificação é configurado com alta importância para garantir que a
 * notificação seja exibida com destaque no dispositivo do usuário.
 */
async function scheduleNotification(dateTime, nameClient, callback) {
    try {
        // Solicita permissão para enviar notificações
        await notifee.requestPermission();

        // Identificador do canal de notificação
        const idChannel = "default";

        // Cria um canal padrão se ele ainda não existir
        if (!await notifee.isChannelCreated(idChannel)) {
            await notifee.createChannel({
                id: idChannel, // Identificador do canal
                name: "Default Channel", // Nome do canal
                importance: AndroidImportance.HIGH, // Nível de importância da notificação
            });
        }

        // Garante que dateTime seja um objeto dayjs
        if (!dayjs.isDayjs(dateTime)) {
            dateTime = dayjs(dateTime);
        }

        // Se a data e hora especificadas estiverem a 3 ou mais dias no futuro em relação à data e hora atuais,
        // ajusta a data para 2 dias antes da data original. Isso garante que a notificação será exibida com antecedência
        if (dayjs().diff(dateTime, "day") >= 3) {
            dateTime = dateTime.subtract(2, "day");
        }

        // Converte a data e hora escolhidas para um timestamp (milissegundos)
        const timestamp = dateTime.valueOf();

        // Cria uma notificação agendada
        await notifee.createTriggerNotification({
            title: "Lembrete de Entrega", // Título da notificação
            body: `
            👋 Você tem uma entrega agendada com 👉${nameClient}👈 
            para 📅${dateTime.format("DD/MM/YYYY - HH:mm")}📅`, // Corpo da notificação

            // Configurações para Android
            android: {
                channelId: idChannel, // ID do canal padrão
                smallIcon: "ic_launcher", // Ícone da notificação
                importance: AndroidImportance.HIGH, // Nível de importância da notificação
                visibility: AndroidVisibility.PUBLIC, // Visibilidade da notificação
                vibration: true, // Ativa a vibração
                sound: "Default", // Som de notificação padrão
                vibrationPattern: [300, 500], // Padrão de vibração (300ms ligado, 500ms desligado)
            },

            // Configuração para iOS
            ios: { sound: "default" } // Som padrão para iOS
        }, {
            timestamp, // Timestamp em milissegundos para o agendamento da notificação
            type: TriggerType.TIMESTAMP, // Tipo de trigger, baseado em timestamp
        });

        // Loga uma mensagem de sucesso no console
        console.log("Notification scheduled successfully");
        callback(true)
    } catch (error) {
        // Loga um erro caso ocorra falha ao agendar a notificação
        console.error("Error scheduling notification:", error);
        callback(false)
    }
}

/**
 * Habilita o manuseio de eventos de notificações em background.
 *
 * Esta função registra um listener para eventos de notificações quando o aplicativo está em background,
 * permitindo que ações específicas sejam executadas ao clicar em notificações nesse estado.
 *
 * @async
 * @function enableBackgroundNotifications
 * 
 * @description
 * O listener capturará eventos relacionados a notificações enquanto o aplicativo está em background,
 * verificando se a notificação foi clicada e, em caso afirmativo, executará a lógica correspondente.
 * A lógica adicional a ser executada ao clicar na notificação deve ser implementada dentro do bloco condicional.
 *
 * @example
 * // Habilitar manuseio de notificações em background
 * enableBackgroundNotifications();
 *
 * @remarks
 * O listener de evento configurado nesta função é específico para a ação padrão de clique em notificação,
 * identificada pelo `pressAction.id` igual a "default".
 */
async function enableBackgroundNotifications() {
    notifee.onBackgroundEvent(async ({ type, detail }) => {
        const { notification, pressAction } = detail;

        if (type === EventType.ACTION_PRESS && pressAction.id === "default") {
            console.log("Notification clicked in background");
        }
    })
}

export { scheduleNotification, enableBackgroundNotifications };