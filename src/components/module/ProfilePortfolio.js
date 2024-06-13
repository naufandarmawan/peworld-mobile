import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Input from '../base/input'
import Button from '../base/button'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import Toast from 'react-native-toast-message'
import RadioButton from '../base/RadioButton'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import GreyUpload from '../../assets/grey-upload.svg'
import GreyImage from '../../assets/grey-image.svg'
import GreySize from '../../assets/grey-size.svg'

const ProfilePortfolio = () => {
    const [portfolioForm, setPortfolioForm] = useState({
        id: '',
        application_name: '',
        link_repository: '',
        application: '',
        image: '',
    })
    const [myPortfolio, setMyPortfolio] = useState([])
    const [selectedOption, setSelectedOption] = useState('Aplikasi mobile');

    const getMyPortfolio = async () => {
        try {
            const token = await AsyncStorage.getItem('token')

            const res = await axios.get(`https://fwm17-be-peword.vercel.app/v1/portfolio`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            setMyPortfolio(res.data.data)
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.response.data.message || 'Something went wrong'
            });
        }
    }

    const addMyPortfolio = async () => {
        try {
            const token = await AsyncStorage.getItem('token')

            if (portfolioForm.id) {
                const { id, created_at, updated_at, ...updateData } = portfolioForm;

                const res = await axios.put(`https://fwm17-be-peword.vercel.app/v1/portfolio/${portfolioForm.id}`, updateData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                Toast.show({
                    type: 'success',
                    text1: res.data.status,
                    text2: res.data.message
                });

                setPortfolioForm({})
                getMyPortfolio()

            } else {
                const { id, created_at, updated_at, ...updateData } = portfolioForm

                const res = await axios.post(`https://fwm17-be-peword.vercel.app/v1/portfolio`, updateData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                Toast.show({
                    type: 'success',
                    text1: res.data.status,
                    text2: res.data.message
                });

                setPortfolioForm({})
                getMyPortfolio()
            }

        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.response.data.message || 'Something went wrong'
            });
        }
    }

    const deleteMyPortfolio = async (id) => {
        try {
            const token = await AsyncStorage.getItem('token')

            const res = await axios.delete(`https://fwm17-be-peword.vercel.app/v1/portfolio/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            getMyPortfolio()
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.response.data.message || 'Something went wrong'
            });
        }
    }

    const handleSelect = (portfolio) => {
        setPortfolioForm(portfolio);
    }

    useEffect(() => {
        getMyPortfolio()
    }, [])

    const handleChageImage = async () => {
        try {
            const res = await launchImageLibrary(null);

            if (res.didCancel) {
                return;
            }

            const data = res.assets[0];
            console.log(data);
            

            const formData = new FormData();

            const dataImage = {
                uri: data.uri,
                name: data.fileName,
                filename: data.fileName,
                type: data.type,
            };

            console.log(dataImage);

            formData.append('file', {
                uri: data.uri,
                name: data.fileName,
                filename: data.fileName,
                type: data.type,
            });

            const result = await axios.post(
                'https://fwm17-be-peword.vercel.app/v1/upload',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            );
            
            const image = result.data.data.file_url 
            setPortfolioForm({ ...portfolioForm, image: image });

        } catch (error) {
            console.log(error?.response.data);
        }
    };

    return (
        <View style={{ backgroundColor: '#FFFFFF', padding: 30, borderRadius: 10, gap: 20 }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#1F2A36', marginBottom: 20, }}>Pengalaman Kerja</Text>
            <View style={{ gap: 10 }}>
                <Input
                    value={portfolioForm.application_name}
                    onChangeText={value => setPortfolioForm({ ...portfolioForm, application_name: value })}
                    label="Nama Aplikasi"
                    placeholder="Gojek"
                />
                <Input
                    value={portfolioForm.link_repository}
                    onChangeText={value => setPortfolioForm({ ...portfolioForm, link_repository: value })}
                    label="Link Repo"
                    placeholder="Github"
                />

                <View style={styles.radioContainer}>
                    <Text style={{ fontSize: 12, color: '#9EA0A5', paddingLeft: 5, marginBottom: 5, }}>Type portofolio</Text>
                    <RadioButton
                        options={['Aplikasi Mobile', 'Aplikasi Web']}
                        selectedOption={selectedOption}
                        onSelect={option => {
                            setSelectedOption(option);
                            setPortfolioForm({ ...portfolioForm, application: option });
                        }}
                    />
                </View>

                <View>
                    <Text style={{ fontSize: 12, color: '#9EA0A5', paddingLeft: 5, marginBottom: 5, }}>Upload gambar</Text>
                    <TouchableOpacity onPress={handleChageImage} style={{ padding: 30, alignItems: 'center', gap: 20, borderWidth: 1, borderRadius: 8, borderColor: '#9EA0A5' }}>
                        {portfolioForm.image ? (
                            <Image source={{ uri: portfolioForm.image }} style={{width: '100%', height: 200, borderRadius: 8, resizeMode: 'cover',}} />
                        ) : (
                            <>
                                <View style={{ alignItems: 'center' }}>
                                    <GreyUpload />
                                    <Text style={{ fontSize: 12, color: '#1F2A36', paddingLeft: 5, marginBottom: 5, }}>Upload file dari penyimpanan</Text>
                                </View>
                                <View style={{ alignItems: 'center', gap: 10 }}>
                                    <GreyImage />
                                    <Text style={{ fontSize: 12, color: '#1F2A36', paddingLeft: 5, marginBottom: 5, }}>High-Res Image PNG, JPG or GIF </Text>
                                </View>
                                <View style={{ alignItems: 'center', gap: 10 }}>
                                    <GreySize />
                                    <Text style={{ fontSize: 12, color: '#1F2A36', paddingLeft: 5, marginBottom: 5, }}>Size 1080x1920 or 600x800</Text>
                                </View>
                            </>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ width: '100%', height: 1, backgroundColor: '#E2E5ED' }}></View>
            <Button text={portfolioForm.id ? 'Update Portfolio' : 'Tambah Portfolio'} onPress={addMyPortfolio} />
            <View style={myPortfolio ? styles.container : styles.hidden}>
                {myPortfolio.map((item) => (
                    <View key={item.id} style={styles.item}>
                        <TouchableOpacity key={item.id} onPress={() => handleNavigate(item.link_repository)}>
                            <Image source={{ uri: item.image }} style={styles.image} />
                        </TouchableOpacity>
                        <View style={styles.buttonsContainer}>
                            <Button
                                variant='primary-yellow'
                                onPress={() => handleSelect(item)}
                                text='Select'
                            />
                            <Button
                                variant='secondary-yellow'
                                onPress={() => deleteMyPortfolio(item.id)}
                                text='Delete'
                            />
                        </View>
                    </View>
                ))}
            </View>
            <Toast />
        </View>
    )
}

export default ProfilePortfolio

const styles = StyleSheet.create({
    container: {
        borderTopWidth: 1,
        borderColor: '#E2E5ED',
        paddingTop: 30,
        flexDirection: 'column',
        gap: 30, // Equivalent to gap-4 in tailwind (4 * 4)
    },
    hidden: {
        display: 'none',
    },
    item: {
        justifyContent: 'space-between',
        width: '100%',
        gap: 20
    },
    companyLogo: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    position: {
        fontWeight: '600',
        fontSize: 20,
        color: '#1F2A36',
    },
    company: {
        fontWeight: '400',
        fontSize: 18,
        color: '#46505C',
    },
    workMonth: {
        fontWeight: '400',
        fontSize: 16,
        color: '#9EA0A5',
    },
    workYear: {
        fontWeight: '400',
        fontSize: 16,
        color: '#9EA0A5',
    },
    description: {
        fontWeight: '400',
        fontSize: 14,
        color: '#1F2A36',
    },
    buttonsContainer: {
        gap: 8,
        height: 'fit-content',
        flexDirection: 'column',
        width: '100%'
    },
    image: {
        width: '100%',
        aspectRatio: 4 / 3,
        resizeMode: 'cover',
        borderRadius: 4
    },
    radioContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    radioTitle: {
        fontSize: 16,
        marginBottom: 10,
    },
});