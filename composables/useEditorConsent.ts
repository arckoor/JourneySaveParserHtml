export default function() {
	return useCookie("editorConsent", {
		maxAge: 31536000,
		default: () => false,
		sameSite: "strict"
	});
}
