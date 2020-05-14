import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import makeStyles from "@material-ui/core/styles/makeStyles";

export const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

export const buildCss = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
}));
