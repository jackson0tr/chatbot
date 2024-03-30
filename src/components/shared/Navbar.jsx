import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const drawerWidth = 240;

function Navbar(props) {
  const { window } = props;
  const { navItems } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Box
        sx={{
          flexGrow: 1,
          display: { xs: "block" },
          pt: 3,
          textAlign: "center",
        }}
      >
        <img src={"image/ptuk.jpg"} width="35" height="35" />

        <Typography component="div">Palestine Technical University</Typography>
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              component={Link}
              to={item.toLowerCase() === "profile" ||item.toLowerCase() === "home"? `${item.toLowerCase().replace(/\s/g, "-")}` : `/${item.toLowerCase().replace(/\s/g, "-")}`}
            >
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor: "#fff", color: "#000" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              alignItems: "center",
            }}
          >
            <img src={"image/ptuk.jpg"} alt="" width="35" height="35" />
            <Typography component="div" sx={{ pl: 2 }}>
              Palestine Technical University
            </Typography>
          </Box>
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            {navItems.map((item) => (
              <>
                {item === "Sign in" ? (
                  <Button
                    variant="contained"
                    key={item}
                    sx={{
                      backgroundColor: " rgba(43, 1, 62, 0.7)",
                      color: "#fff",
                      borderRadius: 5,
                      "&:hover": {
                        backgroundColor: " rgba(43, 1, 62, 0.8)",
                      },
                    }}
                    component={Link}
                    to={`/${item.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    {item}
                  </Button>
                ) : (
                  <Button
                    key={item}
                    sx={{ color: "#000" }}
                    component={Link}
                    to={item.toLowerCase() === "profile" ||item.toLowerCase() === "home"? `${item.toLowerCase().replace(/\s/g, "-")}` : `/${item.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    {item}
                  </Button>
                )}
              </>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}

Navbar.propTypes = {
  window: PropTypes.func,
  navItems: PropTypes.array.isRequired,
};

export default Navbar;
