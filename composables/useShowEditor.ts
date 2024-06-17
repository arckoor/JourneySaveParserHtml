export default function() {
	return useCookie("showEditor", {
		maxAge: 31536000,
		default: () => true,
		sameSite: "strict"
	});
}
