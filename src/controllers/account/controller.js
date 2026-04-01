export function buildLogin(req, res) {
	res.render('account/login', {
		title: 'Sign In',
	});
}

export function buildRegister(req, res) {
	res.render('account/register', {
		title: 'Register',
	});
}
