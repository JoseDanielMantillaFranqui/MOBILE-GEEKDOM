const botonVerificar = document.querySelector('[data-form-login]');

botonVerificar.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const correoRegistrado = "danielfranqui016@gmail.com";
    const contrasenhaRegistrada = "droket7555";

    const correoIngresado = document.querySelector('[data-correo]').value;
    const contrasenhaIngresada = document.querySelector('[data-contrasenha]').value;

    const correoEstilo = document.querySelector('[data-correo]');
    const contrasenhaEstilo = document.querySelector('[data-contrasenha]');
    const loginError = document.querySelector('[data-error]');

    if (correoIngresado === correoRegistrado && contrasenhaIngresada === contrasenhaRegistrada) {
        correoEstilo.classList.remove("login__correo--error");
        contrasenhaEstilo.classList.remove("login__contrasenha-error");
        window.location.href = "../productos-admin.html";
    } else {
        correoEstilo.classList.add("login__correo--error");
        contrasenhaEstilo.classList.add("login__contrasenha--error");
        loginError.style.display = 'block';
    }
});

