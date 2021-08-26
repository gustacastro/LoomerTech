import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

export const Container = styled.View`
  flex: 1;
  padding: 70px 0px;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background };
`;

export const Search = styled.View`
    flex-direction: row;
    background-color: ${({ theme }) => theme.colors.frameBackground };
    width: 350px;
    height: 60px;
    elevation: 1;
    border-radius: 14px;
    align-items: center;
    justify-content: center;
`;

export const IconsButton = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
`;

export const Input = styled.TextInput.attrs({
    placeholderTextColor: '#969696',
  })`
    flex: 1;
    padding-left: ${({ icon }) => icon ? 0 : 18}px;
`;

export const Icon = styled(FeatherIcon)`
    margin: 0 18px;
`;

export const Graphic = styled(FeatherIcon)`
    border: 1px;
    border-radius: 3px;
    border-color: #2496ef;
    margin-top: 35px;
    margin-bottom: 20px;
    padding: 0 1px;
`;

export const Title = styled.Text`
    font-weight: 500;
    font-style: normal;
    color: #000000;
    font-size: 22px;

`;

export const SubTitle = styled.Text`
    font-weight: 400;
    font-style: normal;
    color: #636363;
    font-size: 16px;
    margin-top: 3px;
    margin-bottom: 22px;
`;

export const Organization = styled.View`
    flex-direction: row;
    width: 350px;
    border-radius: 14px;
    background-color: ${({ theme }) => theme.colors.frameBackground };
    elevation: 1;
    padding: 14px;
    margin-top: 10px;
`;

export const Image = styled.Image`
    width: 50px;
    height: 50px;
    margin-right: 14px;
    border-radius: 6px;
`;

export const OrganizationTitle = styled.Text`
    font-weight: 500;
    font-style: normal;
    color: #2196f3;
    font-size: 16px;
`;

export const OrganizationSpan = styled.Text`
    font-weight: 400;
    font-style: normal;
    color: #636363;
    font-size: 16px;
    margin-bottom: 11px;
`;

export const Save = styled.TouchableOpacity`
    align-self: flex-end;
    flex-direction: row;
    width: 105px;
    height: 32px;
    background-color: rgba(33, 150, 243, 0.1);
    border-radius: 16px;
    align-items: center;
    justify-content: center;
`;

export const OrganizationContent = styled.View`
    flex-direction: column;
    flex: 1;
`;

export const SaveImg = styled(FeatherIcon)`
    margin-right: 5px;
`;

export const Saved = styled.TouchableOpacity`
    flex-direction: row;
    width: 190px;
    height: 49px;
    background-color: #2196F3;
    border-radius: 39px;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 10px;
    right: 20px;
`;

export const SavedImg = styled(FeatherIcon)``;

export const SavedTitle = styled.Text`
    font-weight: 500;
    font-style: normal;
    color: #FFFFFF;
    font-size: 16px;
    margin-right: 8px;
`;

export const List = styled.FlatList``;

export const IconSad = styled(FeatherIcon)`
    margin-top: 21px;
    margin-bottom: 7px;
    align-self: center;
`;

export const TitleOops = styled(OrganizationSpan)`
    padding: 0 60px;
    text-align: center;
`;

export const Redirection = styled.TouchableOpacity``;