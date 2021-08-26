import styled from 'styled-components';

export const Container = styled.View`
`;

export const StatusBar = styled.StatusBar.attrs((props) => ({
    barStyle: props.type
      ? 'light-content'
      : 'dark-content'
  }))`
`;

