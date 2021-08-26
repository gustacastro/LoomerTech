import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { api } from '../../services/api';

import routes from '../../navigation/routes';

import {
    Container,
    Search,
    Input,
    IconsButton,
    Icon,
    Graphic,
    Title,
    SubTitle,
    Organization,
    OrganizationTitle,
    OrganizationSpan,
    OrganizationContent,
    Image,
    Save,
    SaveImg,
    Saved,
    SavedImg,
    SavedTitle,
    List,
    IconSad,
    TitleOops,
    Redirection
} from './styles';

export function Main() {
    const dataKey = '@LoomerTech:orgs';

    const [orgs, setOrgs] = useState([]);
    const [newInput, setNewInput] = useState('');
    const [tmp, setTmp] = useState('');
    const [saved, setSaved] = useState([]);
    const navigation = useNavigation();

    const groups = ['reactjs', 'angular', 'vuejs'];
    const mainOrgs = [];

    useEffect(() => {
        groups.map((group) => {
             api.get(`/users/${group}`)
            .then((response) => {
                if (!(orgs.find(org => org.id === response.data.id))) {
                    mainOrgs.push(response.data);
                    setOrgs(mainOrgs);
                }
            })
            .catch((error) => {
                console.log(error);
            });
        });
    },[]);

    async function saving(dataF) {
        return await AsyncStorage.setItem(dataKey, JSON.stringify(dataF)); 
    }

    async function handleAddOrgs(data) {
        const dataOrg = {
            id: data.id,
            name: data.name,
            avatar: data.avatar_url,
            bio: data.bio,
            url: data.html_url,
        }

            try {

            const dataZ = await AsyncStorage.getItem(dataKey);
            const currentData = dataZ ? JSON.parse(dataZ) : [];

           if (dataZ) {
                const same = currentData.find(item => item.id === dataOrg.id );

                if(!same) {
                    const dataFormatted = [
                        ...currentData,
                        dataOrg
                    ]
                    saving(dataFormatted);
                } else {
                    Alert.alert('Já possuí está organização salva.');
                }
           } else {
                const dataFormatted = [
                    ...currentData,
                    dataOrg
                ]
                saving(dataFormatted);
            }


        } catch (error) {
            console.log(error);
            Alert.alert('Não foi possível salvar');
        }
    }

    const EmptyList = () => (
        <>
            <IconSad name="frown" size={25} color="#666666"/>
            <TitleOops>Oops! Não encontramos organizações com este nome. </TitleOops>
        </>
      );

      const searchApi = (org) => {
        api.get(`/users/${org}`).then((response) => {
            setTmp(response.data);
            }).catch((error) => {
            console.log(error);
        });
        
      };

    useEffect(() => {
        async function loadData() {
           const data = await AsyncStorage.getItem(dataKey);
           setSaved(JSON.parse(data));
           console.log(saved);
        }

        loadData();
    }, []);

    return (
    <Container>
        <Search>
            { newInput ? (
                <>
                    <IconsButton onPress={() => {setNewInput('')}}>
                        <Icon name="arrow-left" size={20} color="#969696"/>
                    </IconsButton>
                </>
            ) : <></> }
            <Input
                placeholder="Procurar organizações..."
                value={newInput}
                onSubmitEditing={searchApi(newInput)}
                onChangeText={setNewInput}
                autoCapitalize='none'
                icon={newInput}
            />
            <Icon name="search" size={20} color="#969696"/>
        </Search>
        { newInput ? (
            <>
                <List 
                    data={tmp}
                    keyExtractor={item => item.id}
                    ListEmptyComponent={EmptyList}
                    renderItem={({ item }) => {
                        const { name,avatar_url, bio } = item;

                        return (
                        <>
                        <Organization>
                            <Image
                                source={{
                                    uri: `${avatar_url}`,
                                }}
                            />
                            <OrganizationContent>
                                <OrganizationTitle>{name}</OrganizationTitle>
                                {bio && (
                                    <>
                                        <OrganizationSpan>{bio}</OrganizationSpan>
                                    </>
                                )}

                                <Save onPress={() => navigation.navigate(routes.favorites)}>
                                    <SaveImg name="bookmark" size={20} color="#2496EF"/>
                                    <OrganizationTitle>Salvar</OrganizationTitle>
                                </Save>
                            </ OrganizationContent>
                        </Organization>
                        </>
                    );
                        }}
                    />
        </>) : (<>
        <Graphic name="bar-chart" size={20} color="#2496EF"/>
        <Title>Organizações em destaque</Title>
        <SubTitle>Veja as organizações em tendência no GitHub.</SubTitle>

        <List 
            data={orgs}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
                const { name,avatar_url, bio, html_url } = item;

                return (
                <>
                <Redirection onPress={() => Linking.openURL(`${html_url}`)}>
                    <Organization>
                        <Image
                            source={{
                                uri: `${avatar_url}`,
                            }}
                        />
                        <OrganizationContent>
                            <OrganizationTitle>{name}</OrganizationTitle>
                            {bio && <OrganizationSpan>{bio}</OrganizationSpan>}

                            <Save onPress={() => {handleAddOrgs(item)}}>
                                <SaveImg name="bookmark" size={20} color="#2496EF"/>
                                <OrganizationTitle>Salvar</OrganizationTitle>
                            </Save>
                        </ OrganizationContent>
                    </Organization>
                </Redirection>
                </>
                );
            }}
        />
        
        <Saved onPress={() => navigation.navigate(routes.favorites)}>
                    <SavedTitle>Ver salvos</SavedTitle>
                    <SavedImg name="arrow-right" size={20} color="#FFFFFF"/>

        </Saved>
        </> )}
    </Container>
    );
}

export default Main;