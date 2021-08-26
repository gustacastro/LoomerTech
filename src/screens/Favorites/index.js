import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import accentFold from '../../helpers/accentFold';

import {
    Container,
    Search,
    IconsButton,
    Input,
    Icon,
    IconSad,
    Title,
    Organization,
    OrganizationTitle,
    OrganizationSpan,
    OrganizationContent,
    Image,
    Save,
    SaveImg,
    Header,
    HeaderTitle,
    HeaderLeft,
    TitleEmpty,
    IconBookmark,
    List,
    OrganizationTitleSave,
    Redirection
} from './styles';

export function Favorites() {
    const dataKey = '@LoomerTech:orgs';

    const navigation = useNavigation();
    const [newInput, setNewInput] = useState('');
    const [bttn, setBttn] = useState(false);
    const [saved, setSaved] = useState([]);

    useEffect(() => {
        async function loadData() {
            const data = await AsyncStorage.getItem(dataKey);
            setSaved(JSON.parse(data));
         }
 
         loadData();
    }, []);

    const EmptyList = () => (
        <>
            <IconSad name="frown" size={25} color="#666666"/>
            <Title>Oops! Não encontramos organizações com este nome. </Title>
        </>
      );

    function ResetInput() {
        setBttn(false);
        setNewInput('');
    }

    const getListData = () => {
        const filterKey = accentFold(newInput.toLowerCase());

        return saved.filter((item) => {
            const filterLabel = accentFold((item?.name).toLowerCase());

          if(filterLabel.includes(filterKey)) {
            return true;
          }

          return false;
        });
    };

    return (
    <Container>
        <Header>
            <HeaderLeft>
                <IconsButton onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={20} color="#969696"/>
                </IconsButton>
                <HeaderTitle>Suas organizações salvas</HeaderTitle>
            </HeaderLeft>

            <IconsButton onPress={() => setBttn(true)}>
                <Icon name="search" size={20} color="#969696"/>
            </IconsButton>
        </Header>

        {bttn && (
            <>
                {saved && <Search>
                    <Input
                        placeholder="Procurar organizações..."
                        value={newInput}
                        onChangeText={setNewInput}
                        autoCapitalize='none'
                        icon={newInput}
                    />
                    <IconsButton onPress={() => ResetInput()}>
                        <Icon name="x" size={20} color="#969696"/>
                    </IconsButton>    
                </Search>}
            </>
            
        )}

            {newInput ? (
                <>
                {getListData && <>
                    <List 
                            data={getListData()}
                            keyExtractor={item => item.id}
                            ListEmptyComponent={EmptyList}
                            renderItem={({ item }) => {
                                const { name,avatar, bio, url } = item;
                                return (
                                <>
                                <Redirection onPress={() => Linking.openURL(`${url}`)}>
                                    <Organization>
                                        <Image
                                            source={{
                                                uri: `${avatar}`,
                                            }}
                                        />
                                        <OrganizationContent>
                                            <OrganizationTitle>{name}</OrganizationTitle>
                                            {bio && <OrganizationSpan>{bio}</OrganizationSpan>}

                                            <Save onPress={() => {}}>
                                                <SaveImg name="bookmark" size={20} color="#FFFFFF"/>
                                                <OrganizationTitleSave>Salvo</OrganizationTitleSave>
                                            </Save>
                                        </ OrganizationContent>
                                    </Organization>
                                </Redirection>
                                </>
                                );
                            }}
                        />
                </>}
            </>
            
        ) : (
            <>
                {saved ? (
                <>
                        
                        <List 
                            data={saved}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => {

                                const { name,avatar, bio, url, id } = item;
                                
                                return (
                                <>
                                <Redirection onPress={() => Linking.openURL(`${url}`)}>
                                <Organization>
                                    <Image
                                        source={{
                                            uri: `${avatar}`,
                                        }}
                                    />
                                    <OrganizationContent>
                                        <OrganizationTitle>{name}</OrganizationTitle>
                                        {bio && <OrganizationSpan>{bio}</OrganizationSpan>}

                                        <Save>
                                            <SaveImg name="bookmark" size={20} color="#FFFFFF"/>
                                            <OrganizationTitleSave>Salvo</OrganizationTitleSave>
                                        </Save>
                                    </ OrganizationContent>
                                </Organization>
                                </Redirection>
                                </>
                                );
                            }}
                            
                        />
                </>
            ) : (
                        <>
                        <TitleEmpty>Sua lista de organizações está vazia. Clique no ícone
                            <IconBookmark name="bookmark" size={18} color="#666666"/>para salvar uma organização
                        </TitleEmpty>
                        </>
                    )}
            </> )}        

    </Container>
    );
}

export default Favorites;