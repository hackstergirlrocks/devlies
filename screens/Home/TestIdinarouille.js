import { View, Pressable, Text, StyleSheet } from "react-native";

export default function MyButton({ onPress }) {
    const ntm = (ff) => {
        console.log(ff);
        onPress?.(); // exécute la fonction passée en prop si elle existe
    };

    return (
        <View style={styles.flex}>
            <Pressable
                style={({ pressed }) => [
                    styles.button,
                    pressed && styles.buttonPressed
                ]}
                onPress={() => ntm("sorry")} // se déclenche uniquement si relâché dans la zone
            >
                {({ pressed }) => (
                    <Text style={styles.text}>
                        {pressed ? "Relâche pour valider" : "Appuie"}
                    </Text>
                )}
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        justifyContent: "center",
    },
    button: {
        backgroundColor: "blue",
        padding: 15,
        borderRadius: 8,
    },
    buttonPressed: {
        backgroundColor: "darkblue",
    },
    text: {
        color: "#fff",
        textAlign: "center",
    },
});