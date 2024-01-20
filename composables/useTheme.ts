import { squarePolynomial } from "utils/math";

export default function() {
	return useState("theme", () => {
		const isLight = Math.random() > (1 - squarePolynomial(new Date().getHours(), -0.00694444, 0.1666666)) ? true : false;
		let background = "hov";
		if (isLight) {
			background += " hovLight";
		}
		return {
			isLight: isLight,
			background: background
		};
	});
}
