import React, { createContext, useContext, useState } from 'react';

const FavoriteRoomsContext = createContext<any>(null);

export const useFavoriteRooms = () => useContext(FavoriteRoomsContext);

export const FavoriteRoomsProvider = ({ children }: { children: React.ReactNode }) => {
    const [favoriteRooms, setFavoriteRooms] = useState<string[]>([]);

    const toggleFavoriteRoom = (roomId: string) => {
        setFavoriteRooms((prevFavoriteRooms: string[]) =>
            prevFavoriteRooms.includes(roomId)
                ? prevFavoriteRooms.filter((id) => id !== roomId)
                : [...prevFavoriteRooms, roomId]
        );
    };

    return (
        <FavoriteRoomsContext.Provider value={{ favoriteRooms, toggleFavoriteRoom }}>
            {children}
        </FavoriteRoomsContext.Provider>
    );
};
