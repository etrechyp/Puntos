import React, { useState } from "react";
// import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, Button } from "react-native";
import { Map, Modal, Panel, Input, List } from "./components";

export default function App() {
    const [puntos, setPuntos] = useState([]);
    const [name, setName] = useState("");
    const [visibility, setVisibility] = useState(false);
    const [puntoTemp, setPuntoTemp] = useState({});
    const [visibilityFilter, setVisibilityFilter] = useState("new_punto");
    const [pointsFilter, setPointsFilter] = useState(true)

    const togglePointsFilter = () => {
      setPointsFilter(!pointsFilter)
    }

    const handleLongPress = ({ nativeEvent }) => {
        setVisibilityFilter('new_punto')
        setPuntoTemp(nativeEvent.coordinate);
        setVisibility(true);
    };

    const handleChangeText = (text) => {
        setName(text);
    };

    const handleSubmit = () => {
        const newPunto = { coordinate: puntoTemp, name: name };
        setPuntos(puntos.concat(newPunto));
        setVisibility(false);
        setName("");
    };

    const handleLista = () => {
      setVisibilityFilter('all_puntos')
      setVisibility(true)


    }

    return (
        <View style={styles.container}>
            <Map onLongPress={handleLongPress} puntos={puntos} pointsFilter={pointsFilter} />
            <Modal visibility={visibility}>
                {visibilityFilter == "new_punto" ? (
                    <View style={styles.form}>
                        <Input
                            title="Name"
                            placeholder="point Name"
                            onChangeText={handleChangeText}
                        />
                        <Button title="submit" onPress={handleSubmit} />
                    </View>
                ) : (
                    <List puntos={puntos}  closeModal={() => setVisibility(false)}/>
                )}
            </Modal>
            <Panel onPressLeft={handleLista} textLeft='List' togglePointsFilter={togglePointsFilter} />
            {/* <StatusBar style="auto" /> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    form: {
      padding: 15
    },
});
