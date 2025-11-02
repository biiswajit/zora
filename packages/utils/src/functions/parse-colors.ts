import type { Color } from "../types";

function parseColor(colorName: Color) {
    switch (colorName) {
        case "default":
            return "#f97316";
        case "red":
            return "#ff6c6b";
        case "orange":
            return "#ffa85f";
        case "yellow":
            return "#fedf53";
        case "green":
            return "#64db7c";
        case "blue":
            return "#47a8ff";
        case "purple":
            return "#e363f6";
        case "gray":
            return "#acacb0";
        default:
            return "#f97316";
    }
}

export { parseColor };
