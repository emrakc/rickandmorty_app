import React, { createContext, useContext, useState } from 'react';

const MenuContext = createContext();
const MenuActionContext = createContext();

export const useMenuContext = () => useContext(MenuContext);
export const useMenuActionContext = () => useContext(MenuActionContext);

const MenuContextProvider = (props) => {
    const [selectedCharacterId, setSelectedCharacterId] = useState(null);
    return (
        <MenuContext.Provider value={{ selectedCharacterId }}>
            <MenuActionContext.Provider value={{ setSelectedCharacterId }}>
                {props.children}

            </MenuActionContext.Provider>
        </MenuContext.Provider>
    )
}

export default MenuContextProvider