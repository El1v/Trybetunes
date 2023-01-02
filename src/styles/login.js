import { Box, Paper, Stack, styled } from '@mui/material';

export const CustomContentLogin = styled(Box)`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const CustomAsideLogin = styled('aside')`
  display: flex;
  width: 60%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const CustomStackLogin = styled(Stack)`
  display: flex;
  width: 70%;
  justify-content: center;
  align-items: center;
`;

export const CustomImage = styled('img')`
  width: 200px;
  margin-bottom: 40px;
`;

export const CustomFormLogin = styled(Paper)`
  display: flex;
  width: 40%;
  height: 80%;
  justify-content: center;
  align-items: center;
  margin: 0 20px;
`;
