import { Button } from "@chakra-ui/button";
import { Box, VStack } from "@chakra-ui/layout";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

interface ISidebar {
  onClose: () => void;
  isOpen: boolean;
  variant: string | undefined;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IButtonMenu {
  link: string;
  name: string;
}

function Sidebar(props: ISidebar) {
  const buttonMenu: IButtonMenu[] = [
    { link: "/mercati", name: "Mercati" },
    { link: "/notizie", name: "Notizie" },
    { link: "/portafoglio", name: "Portafoglio" },
  ];

  const isSidebar: boolean = props?.variant === "sidebar";

  const buttonFunction = () => {
    props.onClose();
    props.setVisible(false);
  };

  return (
    <Box w={isSidebar ? "25%" : 0}>
      {isSidebar ? (
        <VStack h="100vh" bg="#dfdfdf" pt="50px">
          <Link to="/">
            <Button
              variant="button-menu"
              onClick={() => props?.setVisible(true)}
            >
              Home
            </Button>
          </Link>

          {buttonMenu.map((button) => {
            return (
              <Link to={button?.link}>
                <Button variant="button-menu" onClick={buttonFunction}>
                  {button.name}
                </Button>
              </Link>
            );
          })}
        </VStack>
      ) : (
        <Drawer
          isOpen={props?.isOpen}
          placement="left"
          onClose={props?.onClose}
        >
          <DrawerOverlay>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Menu</DrawerHeader>
              <DrawerBody>
                <VStack>
                  {buttonMenu.map((button) => {
                    return (
                      <Link to={button?.link}>
                        <Button variant="button-menu" onClick={buttonFunction}>
                          {button.name}
                        </Button>
                      </Link>
                    );
                  })}
                </VStack>
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      )}
    </Box>
  );
}

export default Sidebar;
