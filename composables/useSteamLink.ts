export default function() {
	return useCookie("steamLink", {
		maxAge: 31536000,
		default: () => false
	});
}
