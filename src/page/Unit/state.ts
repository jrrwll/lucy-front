import { create } from 'zustand';

export interface UnitValueStore {
    unitValue: number;
    setUnitValue: (newUnitValue: number) => void;
}

export const useUnitValueStore = create<UnitValueStore>((set) => ({
    unitValue: 1,
    setUnitValue: (newUnitValue: number) => set({ unitValue: newUnitValue })
}));
