import { ScrollView, StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { getAllModules } from '../api';
import { setModules, setSearch } from '../store/moduleSlice';
import ModuleCard from '../components/ModuleCard';
import Spinner from '../components/Spinner';
import { commonStyles } from '../styles/common'

export default function ModulesListScreen({ navigation }) {
    const dispatch = useDispatch();
    const { modules } = useSelector((store) => store.module);
    const { searchText } = useSelector((store) => store.module);

    useEffect(() => {
        getAllModules(searchText).then(data => {
            dispatch(setModules(data?.modules))
        })
    }, [dispatch]);

    const handleSearch = () => {
        getAllModules(searchText).then(data => {
            dispatch(setModules(data?.modules))
        })
    };

    return (
        <ScrollView contentModuleStyle={styles.scrollViewContent}>
            <View style={styles.module}>
                <TextInput
                    style={[styles.input, commonStyles.rounded_sm, commonStyles.shadow_sm]}
                    placeholder="Введите название"
                    value={searchText}
                    onChangeText={(text) => dispatch(setSearch(text))}
                    placeholderTextColor={'#aeb2b6'}
                    onSubmitEditing={handleSearch}
                />
                <TouchableOpacity style={[styles.button, commonStyles.rounded_sm, commonStyles.shadow]} onPress={handleSearch}>
                    <Text style={styles.buttonText}>Поиск</Text>
                </TouchableOpacity>
            </View>
            {modules && modules.length > 0 ? (
                modules.map((module) => <ModuleCard key={module.uuid} {...{ uuid: module.uuid, name: module.name, description: module.description }} style={commonStyles.shadow} navigation={navigation} />)
            ) : (
                !modules && <Spinner />
            )}
        </ScrollView >
    );
}

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        padding: 10,
        gap: 10,
        backgroundColor: '#ffffff',
    },
    input: {
        flex: 1,
        backgroundColor: '#212529',
        paddingHorizontal: 12,
        paddingVertical: 2,
        marginRight: 8,
        color: 'white',
        fontSize: 14,
    },
    module: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // paddingHorizontal: 16,
        marginBottom: 4,
    },
    button: {
        backgroundColor: '#520dc2',
        paddingVertical: 6,
        paddingHorizontal: 8,
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
        // fontWeight: 'bold',
    },
});