export default function() {
	const state = useState("saves", () => ({
		rawData: [] as number[],
	}));

	function get() {
		const u8 = new Uint8Array(state.value.rawData);
		return {
			u8: u8,
			u32: new Uint32Array(u8.buffer),
			u64: new BigUint64Array(u8.buffer),
		};
	}

	function set(data: ArrayBuffer) {
		state.value.rawData = Array.from(new Uint8Array(data));
	}

	return {
		get,
		set,
	};
}
