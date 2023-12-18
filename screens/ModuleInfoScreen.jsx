import { View, Text, StyleSheet, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { resetModule, setModule } from '../store/moduleSlice';
import { getModule, imagePlaceholder, imageBaseURL } from '../api';
import { commonStyles } from '../styles/common'
import Spinner from '../components/Spinner';

export default function ModuleInfoScreen({ navigation, route }) {
    const { uuid } = route.params;
    const dispatch = useDispatch();
    const { module } = useSelector((store) => store.module);
    const [src, setSrc] = useState({ uri: `${imageBaseURL}/${uuid}.jpg` });

    // const handlePress = () => {
    //     navigation.navigate('ContainersList');
    // };

    useEffect(() => {
        getModule(uuid).then(data => {
            dispatch(setModule(data))
        })

        return () => {
            dispatch(resetModule());
        };
    }, [dispatch]);
    return (
        <View style={styles.ViewContent}>
            {module ? (
                <View>
                    {/* <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
                        <TouchableOpacity
                            onPress={handlePress}
                        >
                            <Text style={styles.text}>Контейнеры</Text>
                        </TouchableOpacity>
                        <Text style={styles.text}> / {container.marking}</Text>
                    </View> */}
                    <View style={[styles.card, commonStyles.shadow, commonStyles.rounded]}>
                        <View style={[styles.imageWrapper, commonStyles.rounded]}>
                            <Image
                                style={styles.image}
                                source={src}
                                onError={() => setSrc(imagePlaceholder)}
                            />
                        </View>
                        <View style={styles.module}>
                            <Text style={[commonStyles.title, commonStyles.centerText]}>{module.name}</Text>
                            <Text style={[commonStyles.text, commonStyles.centerText]}>Описание: {module.description}</Text>
                            <Text style={[commonStyles.text, commonStyles.centerText]}>Масса: {module.mass}</Text>
                            <Text style={[commonStyles.text, commonStyles.centerText]}>Длина: {module.length}</Text>
                            <Text style={[commonStyles.text, commonStyles.centerText]}>Диаметр: {module.diameter}</Text>
                        </View>
                    </View>
                </View>
            ) : (
                <Spinner />
            )}
        </View >
    );
}

const styles = StyleSheet.create({
    ViewContent: {
        flexGrow: 1,
        alignItems: 'stretch',
        padding: 10,
    },
    card: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        paddingHorizontal: 0,
        paddingTop: 0,
        overflow: 'hidden',
        gap: 14,
        paddingBottom: 10,
    },
    image: {
        flex: 1,
        width: '100%',
        resizeMode: 'cover',
    },
    imageWrapper: {
        overflow: 'hidden',
        aspectRatio: 16 / 10,
        margin: 0,
    },
    module: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        paddingHorizontal: 4,
        gap: 6,
    },
});