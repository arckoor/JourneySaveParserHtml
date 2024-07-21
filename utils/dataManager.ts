export function writeData(
	saves: {
		get: () => { u8: Uint8Array, u32: Uint32Array, u64: BigUint64Array },
		set: (data: ArrayBuffer) => void
	},
	type: "u8" | "u32" | "u64",
	offset: number,
	data: number
) {
	const save = saves.get();
	const divisor = type === "u8" ? 1 : type === "u32" ? 4 : 8;
	save[type][offset / divisor] = data;
	saves.set(save[type].buffer);
}

export function readData(
	saves: {
		get: () => { u8: Uint8Array, u32: Uint32Array, u64: BigUint64Array },
		set: (data: Uint8Array) => void
	},
	type: "u8" | "u32" | "u64",
	offset: number, until: number | undefined = undefined
) {
	const save = saves.get();
	const divisor = type === "u8" ? 1 : type === "u32" ? 4 : 8;
	if (typeof until === "undefined") {
		return Number(save[type][offset / divisor]);
	} else {
		return save[type].slice(offset, offset + until);
	}
}
