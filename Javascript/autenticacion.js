/**
 * AutoDrive - Lógica de Autenticación
 * Gestiona el acceso, registro y navegación de la página de inicio.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Referencias a las secciones (contenedores)
    const loginSec = document.getElementById('seccion-login');
    const registroSec = document.getElementById('seccion-registro');
    const preguntasSec = document.getElementById('seccion-preguntas');
    const finalSec = document.getElementById('seccion-final');

    // Referencias a botones de navegación
    const btnIrRegistro = document.getElementById('btn-ir-registro');

    // 1. NAVEGACIÓN: Mostrar formulario de registro
    if (btnIrRegistro) {
        btnIrRegistro.addEventListener('click', () => {
            loginSec.hidden = true;
            registroSec.hidden = false;
        });
    }

    // 2. LOGICA DE LOGIN: Validar contra CLIENTES_MOCK (en cuentas.js)
    const formLogin = document.getElementById('form-login');
    if (formLogin) {
        formLogin.addEventListener('submit', (e) => {
            e.preventDefault(); // Evita que la página se recargue

            const emailInput = document.getElementById('login-email').value;
            const passInput = document.getElementById('login-pass').value;

            // Buscamos al usuario en nuestra "base de datos" simulada
            const indiceUsuario = CLIENTES_MOCK.findIndex(u => 
                u.usuario.correo === emailInput && u.usuario.contrasena === passInput
            );

            if (indiceUsuario !== -1) {
                // Guardamos el índice en localStorage para que el dashboard sepa quién entró
                localStorage.setItem('clienteActivoBanca360', indiceUsuario);
                
                loginSec.hidden = true;
                finalSec.hidden = false;

                // Redirigimos al dashboard después de una breve pausa
                setTimeout(() => {
                    window.location.href = 'html/dashboard_resumen.html';
                }, 1500);
            } else {
                alert('Credenciales inválidas. Por favor, verifica tu correo y contraseña.');
            }
        });
    }

    // 3. LÓGICA DE REGISTRO: Flujo hacia preguntas de seguridad
    const formRegistro = document.getElementById('form-registro');
    if (formRegistro) {
        formRegistro.addEventListener('submit', (e) => {
            e.preventDefault();
            const p1 = document.getElementById('pass1').value;
            const p2 = document.getElementById('pass2').value;

            if (p1 !== p2) {
                alert('Las contraseñas no coinciden.');
                return;
            }

            registroSec.hidden = true;
            preguntasSec.hidden = false;
        });
    }

    // 4. LÓGICA DE PREGUNTAS: Finalizar registro
    const formPreguntas = document.getElementById('form-preguntas');
    if (formPreguntas) {
        formPreguntas.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('¡Cuenta creada con éxito! Ahora puedes iniciar sesión.');
            window.location.reload(); // Volvemos al login
        });
    }
});
