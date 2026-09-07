export function writeData(
    saves: {
        get: () => { u8: Uint8Array; u32: Uint32Array; u64: BigUint64Array };
        set: (data: ArrayBufferLike) => void;
    },
    type: "u8",
    offset: number,
    data: number,
    until: number | undefined = undefined,
) {
    const save = saves.get();
    const count = typeof until === "undefined" ? 1 : until;
    save[type].fill(data, offset, offset + count);
    saves.set(save[type].buffer);
}

export function writeDataArray(
    saves: {
        get: () => { u8: Uint8Array; u32: Uint32Array; u64: BigUint64Array };
        set: (data: ArrayBufferLike) => void;
    },
    offset: number,
    data: Uint8Array<ArrayBuffer>,
) {
    const save = saves.get();
    save["u8"].set(data, offset);
    saves.set(save["u8"].buffer);
}

export function readData(
    saves: {
        get: () => { u8: Uint8Array; u32: Uint32Array; u64: BigUint64Array };
        set: (data: ArrayBufferLike) => void;
    },
    type: "u8" | "u32" | "u64",
    offset: number,
    until: number | undefined = undefined,
) {
    const save = saves.get();
    const divisor = type === "u8" ? 1 : type === "u32" ? 4 : 8;
    if (typeof until === "undefined") {
        return Number(save[type][offset / divisor]);
    } else {
        return save[type].slice(offset, offset + until);
    }
}
