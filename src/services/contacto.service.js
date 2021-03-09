import { authHeader } from '../helpers';

export const contactoService = {
    obtieneContactos,
    eliminaContacto,
    agregarContacto,
    obtenerContactoById,
    editarContacto
};

async function editarContacto(id,nombre_completo,apellidos,telefono, correo, foto) {

    const requestOptions = {
        method: 'PUT',
        headers: authHeader(), 
        body: JSON.stringify({ nombre_completo, apellidos,telefono, correo, foto })
    };
    
    const response = await fetch('http://localhost:4000/api/contactos/' + id, requestOptions);
    return handleResponse(response);
}

async function obtenerContactoById(id) {

    const requestOptions = {
        method: 'GET',
        headers: authHeader() 
    };

    const response = await fetch('http://localhost:4000/api/contactos/' + id, requestOptions);
    return handleResponse(response);

}

async function agregarContacto(nombre_completo,apellidos,telefono, correo, foto) {

    
    const requestOptions = {
        method: 'POST',
        headers: authHeader(), 
        body: JSON.stringify({ nombre_completo, apellidos,telefono, correo, foto })
    };
    
    const response = await fetch('http://localhost:4000/api/contactos/', requestOptions);
    return handleResponse(response);
}


async function eliminaContacto(contactoID) {

    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    
    const response = await fetch('http://localhost:4000/api/contactos/' + contactoID, requestOptions);
    return handleResponse(response);
}

async function obtieneContactos() {

    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    console.log(requestOptions);

    const response = await fetch('http://localhost:4000/api/contactos/' , requestOptions);
    return handleResponse(response);
}

function logout() {
    localStorage.removeItem('cookieuser');
 }

function handleResponse(response) {

    return response.text().then(text => {

        const data = text && JSON.parse(text);
        
        if (!response.ok) {

            if (response.status === 401) {
                logout();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}