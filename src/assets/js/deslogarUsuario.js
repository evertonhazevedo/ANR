const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true
})

/*Deslogar usuario*/
document.getElementById('btnSair')
    .addEventListener('click', async function () {

        localStorage.clear();

        await Toast.fire({
            icon: 'warning',
            title: 'Encerrando sessão...'
        })

        window.location.href = "/index.html";
    });