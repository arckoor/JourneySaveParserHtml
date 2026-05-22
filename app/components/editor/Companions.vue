<script setup lang="ts">
import { arrow } from "~/assets/images";

const theme = useTheme();
</script>

<template>
    <div class="companions">
        <div></div>
        <div>Name</div>
        <div>ID</div>
        <template v-for="(companion, idx) in companions" :key="idx">
            <div class="inner companion-buttons">
                <img class="up" :src="arrowImg" alt="Up" @dragstart.prevent @click="swap(idx, idx - 1)" />
                <span @click="clearIndex(idx)">x</span>
                <img class="down" :src="arrowImg" alt="Down" @dragstart.prevent @click="swap(idx, idx + 1)" />
            </div>
            <div class="inner">{{ companion.name }}</div>
            <div class="inner">{{ companion.id }}</div>
        </template>
    </div>
    <div class="button-container">
        <div>
            Set Companion Number:<input
                v-model.number="companionNumber"
                @input="companionNumberChanged"
                @keydown="checkInput"
                type="number"
                placeholder=""
                class="number-input"
            />
        </div>
        <div :class="theme.background + ' cursorPointer button'" @click="clearAll">Clear all</div>
    </div>
</template>

<script lang="ts">
interface Companion {
    name: string;
    id: string;
}

export default defineComponent({
    data() {
        return {
            companions: [] as Array<Companion>,
            companionNumber: 0,
            saves: useSaves(),
            arrowImg: arrow[0]![0],
        };
    },
    mounted() {
        const randomIndex = randomInt(0, 3);
        this.arrowImg = arrow[0]![randomIndex];
        this.$watch(this.saves.get, () => this.readAll(), { deep: true });
        this.readAll();
    },
    methods: {
        readAll() {
            this.companions = [];
            for (let i = 0; i < 8; i++) {
                const tempNameBuffer = readData(
                    this.saves,
                    "u8",
                    offsets.companionName + offsets.companionOffset * i,
                    24,
                ) as Uint8Array;
                const nameBuffer = tempNameBuffer.subarray(0, tempNameBuffer.indexOf(0x00));
                const name = new TextDecoder().decode(nameBuffer);
                const id = readData(this.saves, "u32", offsets.companionID + offsets.companionOffset * i) as number;

                this.companions.push({ name: name === "" ? "<none>" : name, id: id === 0 ? "<none>" : id.toString() });
            }
            this.companionNumber = readData(this.saves, "u8", offsets.companionAmount) as number;
        },
        clearIndex(idx: number) {
            writeData(
                this.saves,
                "u8",
                offsets.companionName + offsets.companionOffset * idx,
                0,
                offsets.companionOffset,
            );
            writeData(this.saves, "u8", 0x11c8 + offsets.companionSymbolOffset * idx, 0, offsets.companionSymbolOffset);
        },
        clearAll() {
            writeData(this.saves, "u8", offsets.companionName, 0, offsets.companionOffset * 8);
            writeData(this.saves, "u8", 0x11c8, 0, offsets.companionSymbolOffset * 8);
            writeData(this.saves, "u8", offsets.companionAmount, 0);
        },
        checkInput(event: KeyboardEvent) {
            if (
                !/[\d]/.test(event.key) &&
                !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(event.key)
            ) {
                event.preventDefault();
            }
        },
        companionNumberChanged() {
            if ((this.companionNumber as unknown as string) === "") {
                return;
            }
            if (this.companionNumber > 8) {
                this.companionNumber = 8;
            }
            writeData(this.saves, "u8", offsets.companionAmount, this.companionNumber);
        },
        swap(a: number, b: number) {
            if (b < 0) {
                b = 7;
            } else if (b >= 8) {
                b = 0;
            }

            const swapArray = (base: number, size: number) => {
                const aData = readData(this.saves, "u8", base + size * a, size) as Uint8Array<ArrayBuffer>;
                const bData = readData(this.saves, "u8", base + size * b, size) as Uint8Array<ArrayBuffer>;

                writeDataArray(this.saves, base + size * a, bData);
                writeDataArray(this.saves, base + size * b, aData);
            };

            swapArray(offsets.companionName, offsets.companionOffset);
            swapArray(offsets.companionSymbol, offsets.companionSymbolOffset);
        },
    },
});
</script>

<style scoped>
.button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.button {
    padding: 5px 10px;
}

.companions {
    display: grid;
    grid-template-columns: auto auto auto;
    gap: 8px 100px;
    align-items: center;
    margin-bottom: 30px;
}

.companion-buttons {
    display: flex;
    justify-content: center;
    flex-direction: row;
}

.companion-buttons > * {
    cursor: pointer;
    margin: 0 10px;
    cursor: pointer;
    transition: transform 0.2s;
}

.companion-buttons > span:hover {
    transform: scale(1.15);
}

.up {
    transform: rotate(90deg);
}

.up:hover {
    transform: rotate(90deg) scale(1.15);
}

.down {
    transform: rotate(270deg);
}

.down:hover {
    transform: rotate(270deg) scale(1.15);
}

.inner {
    font-size: var(--font-size--default);
}

.companions > div {
    text-align: center;
}

.number-input {
    background: transparent;
    border: none;
    outline: none;
    text-align: center;
    width: 40px;
    font-family: "Eyeglass Condensed Bold", sans-serif;
    margin-left: 10px;
    border-bottom: 1px solid currentColor;

    font-size: var(--font-size--default);
    color: inherit;
}

.number-input::-webkit-outer-spin-button,
.number-input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.number-input[type="number"] {
    -moz-appearance: textfield;
}
</style>
