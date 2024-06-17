export default function() {
	return useCookie("navBarClicked", {
		maxAge: 31536000,
		default: () => false,
		sameSite: "strict"
	});
}
