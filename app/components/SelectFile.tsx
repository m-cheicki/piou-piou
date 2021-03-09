import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { Base64 } from "../helpers/base64";
import Shadow from "shadows-rn"; 
import {buttons, containers, shadows,text} from '../resources/css/style';

export interface SelectDataProps {
    onSelectData?: (base64: string) => void, 
}

export default class SelectDataComponent extends Component<SelectDataProps, any> {

    public constructor(props: SelectDataProps) {
        super(props)

        this.state = {
            filename: null, 
        }
    }

    private _selectFile = async () => {
        let file = await DocumentPicker.getDocumentAsync()
        if (file) {
            const uri: string = (file as any).uri
            const base64 = await this._reafFile(uri)
            const filename = (file as any).name
            this.setState({ filename : filename })
            if (base64) {
                this._createData('base64', base64)
            }
        }
    }

    private _reafFile = async (uri: string) => {
        if (uri) {
            const content = await FileSystem.readAsStringAsync(uri, { encoding: 'base64' })
            return content
        }
    }

    private _createData = (type: string, data: any) => {
        let obj = { type: type, data: data }
        const json = JSON.stringify(obj)
        const encodedUri = encodeURI(json)
        const base64 = Base64.encode(encodedUri)
        if (this.props.onSelectData != undefined) {
            this.props.onSelectData(base64)
        }
    }
    

    public render = () => {

        let containerText

        if (this.state.selectedDataSize > 0 ) {
            containerText = this.state.filename
        }
        else {
            containerText = "Choose a file"
        }

        return (
            <TouchableOpacity style={[buttons.button, buttons.selectFile]} onPress={this._selectFile}>
                <Shadow
                    style={{
                        width: "100%",
                        height: 48,
                        borderRadius: 8, 
                        padding: 4, 
                    }}

                    shadows = {[shadows.light, shadows.dark]}
                    inset = {false}
                >
                    <View style={[containers.chooseFile]}>
                        <Text style={[text.whiteText]}>{containerText}</Text>
                    </View>
                </Shadow>
            </TouchableOpacity>
        )
    }
}