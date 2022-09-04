import { ModalProps } from "react-native";
import { modal } from "./styles";
import theme from 'styles/GlobalStyles';
import { useState } from "react";
import {TouchableOpacity, Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import { HLoadingDots } from "components/HLoadingDots";
import Lottie from "lottie-react-native";

interface Props extends ModalProps {
    showModal?: boolean;
}

export function LoaderModal({ showModal = true ,...rest }: Props){

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={showModal}
            onRequestClose={() => {}}
            >
                <View style={modal.centeredView}>
                <View style={modal.modalView}>                
                    <Lottie
                    source={require("../../assets/116545-loading-cat.json")}
                    autoPlay={true}
                    loop={true}
                    />              
                </View>
                </View>
            </Modal>
    )
}