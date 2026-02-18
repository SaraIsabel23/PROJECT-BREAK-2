// authController.js: Contiene la lógica de negocio relacionada con autenticación (login, registro, etc.)

const baseHtml  = require('../helpers/baseHtml');
const getNavBar = require('../helpers/getNavBar');

const authController = {
    showLogin: (req, res) => {
        const error = req.query.error;
        const form = `
            <div class="form-login">
                <h2>Iniciar Sesion</h2>
                ${error ? '<p class="error-msg">Usuario o contrasena incorrectos</p>' : ''}
                <form action="/auth/login" method="POST" class="form-container">
                    <label>Usuario</label>
                    <input type="text" name="username" required>
                    <label>Contrasena</label>
                    <input type="password" name="password" required>
                    <button type="submit" class="btn-crear">Entrar</button>
                </form>
            </div>
        `;
        const html = baseHtml(getNavBar() + form);
        res.send(html);
    },

    login: (req, res) => {
        const { username, password } = req.body;

        if (username === process.env.ADMIN_USER && password === process.env.ADMIN_PASSWORD) {
            req.session.isAdmin = true;
            res.redirect('/dashboard');
        } else {
            res.redirect('/auth/login?error=true');
        }
    },

    logout: (req, res) => {
        req.session.destroy();
        res.redirect('/products');
    }
};

module.exports = authController;