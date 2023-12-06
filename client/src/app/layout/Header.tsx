import { AppBar, Switch, Toolbar, Typography } from "@mui/material";


type Props = {
  darkMode: boolean;
  setDarkMode: (a: boolean) => void;
};

function Header(props: Props) {
  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant="h6">RE-STORE</Typography>
        <Switch onChange={() => props.setDarkMode(!props.darkMode)} />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
