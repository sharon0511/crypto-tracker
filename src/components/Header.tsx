import styled from "styled-components";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";

interface Props {
  isDark: boolean;
  toggleTheme: () => void;
}

const Container = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  padding: 0 20px;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
`;

const ToggleWrapper = styled.button`
  width: 60px;
  height: 30px;
  border-radius: 30px;
  border: none;
  background-color: ${(props) => props.theme.textColor};
  display: flex;
  align-items: center;
  padding: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  z-index: 999;
`;

const Icon = styled.div<{ isDark: boolean }>`
  font-size: 18px;
  transform: translateX(${(props) => (props.isDark ? "26px" : "0")});
  transition: transform 0.3s ease;
`;

const HomeLink = styled(Link)`
  text-decoration: none;
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => props.theme.textColor};
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.7;
  }
`;

function Header({ isDark, toggleTheme }: Props) {
  return (
    <Container>
      <HomeLink to="/">Home</HomeLink>
      <ToggleWrapper onClick={toggleTheme} aria-label="Toggle Dark Mode">
        <Icon isDark={isDark}>{isDark ? "🌙" : "☀️"}</Icon>
      </ToggleWrapper>
    </Container>
  );
}

export default Header;