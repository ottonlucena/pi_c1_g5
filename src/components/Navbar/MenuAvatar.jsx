import {
  Menu as MenuInner,
  MenuItem,
  MenuButton,
  MenuDivider,
} from "@szhsin/react-menu";
/* import { useAuth0 } from '@auth0/auth0-react'; */
import styled, { keyframes } from "styled-components";
import { getObjetWorlds } from "../../Utils/utils";
import { useAuth } from "../AuthContext/AuthContext";
import { Link } from "react-router-dom";


const menuShow = keyframes`
  from {
    opacity: 0;
  }
`;
const menuHide = keyframes`
  to {
    opacity: 0;
  }
`;

const Menu = styled(MenuInner)`
  .szh-menu {
		min-width: 8rem;
		&--state-opening {
			animation: ${menuShow} 0.15s ease-out;
		&--state-closing {
			animation: ${menuHide} 0.2s ease-out forwards;
		}
		}
`;

const ContainerAvatar = styled.div``;
const Names = styled.div``;

import "@szhsin/react-menu/dist/index.css";
const MenuAvatar = (users) => {
  const { logout } = useAuth();
  //const { logout } = useAuth0();//
  const { user } = users;
  const nameObj = getObjetWorlds(user.name);

  return (
      <Menu
        style={{ display: "flex", flexDirection: "row", gap: "none" }}
        transition
        menuButton={
          <MenuButton style={{ borderRadius: "50%", border: "none" }}>
            <ContainerAvatar style={{ display: "flex", flexDirection: "row" }}>
              <img
                style={{ borderRadius: "50%" }}
                width={40}
                src={user.picture}
                alt="Avatar usuario ${user.name}"
              />
              <Names
                style={{
                  display: "flex",
                  flexDirection: "column",
                  paddingInline: "8px",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#828282",
                }}
              >
                <p style={{ fontSize: "11px" }}>{nameObj[1]}</p>
                <p style={{ fontSize: "11px" }}>{nameObj[2]}</p>
              </Names>
            </ContainerAvatar>
          </MenuButton>
        }
      >
        <MenuItem>Perfil</MenuItem>
        <MenuItem>
          <Link
            to="/favoritos"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Favoritos
          </Link>
        
        </MenuItem> 
         <MenuItem>
      <Link to='/reservas' style={{ textDecoration: 'none', color: 'inherit' }}>Mis reservas</Link>
      </MenuItem>
        <MenuDivider />
        <MenuItem onClick={() => logout()}>LogOut</MenuItem>
      </Menu>
  );
};
export default MenuAvatar;
