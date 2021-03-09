import { contactoConstants } from '../constants';
import { contactoService } from '../services';
import { alertActions } from './';
import { history } from '../helpers';

export const contactoActions = {
    obtieneContactos,
    eliminaContacto,
    agregarContacto,
    obtenerContactoById,
    editarContacto
};

function editarContacto(id,nombre_completo,apellidos,telefono, correo, foto) {
    return dispatch => {

        contactoService.editarContacto(id,nombre_completo,apellidos,telefono, correo, foto)
            .then(
                resultedit => dispatch(success(resultedit)),
                error => dispatch(failure(error))
            );
    };

    function success(resultedit) { return { type: contactoConstants.EDITA_SUCCESS, resultedit } }
    function failure(error) { return { type: contactoConstants.EDITA_FAILURE, error } }
}

function obtenerContactoById(id) {

    return dispatch => {

        contactoService.obtenerContactoById(id)
            .then(
                itemContacto => dispatch(success(itemContacto)),
                error => dispatch(failure(error))
            );
    };

    function success(itemContacto) { return { type: contactoConstants.GETID_SUCCESS, itemContacto } }
    function failure(error) { return { type: contactoConstants.GETID_FAILURE, error } }
}

function agregarContacto(nombre_completo,apellidos,telefono, correo, foto) {

    return dispatch => {

        contactoService.agregarContacto(nombre_completo,apellidos,telefono, correo, foto)
            .then(
                resultadd => dispatch(success(resultadd)),
                error => dispatch(failure(error))
            );
    };

    function success(resultadd) { return { type: contactoConstants.AGREGA_SUCCESS, resultadd } }
    function failure(error) { return { type: contactoConstants.AGREGA_FAILURE, error } }
}

function eliminaContacto(contactoID) {

    return dispatch => {
      //  dispatch(request());

        contactoService.eliminaContacto(contactoID)
            .then(
                resultdelete => dispatch(success(resultdelete)),
                error => dispatch(failure(error))
            );
    };

    //function request() { return { type: contactoConstants.ELIMINA_REQUEST } }
    function success(resultdelete) { return { type: contactoConstants.ELIMINA_SUCCESS, resultdelete } }
    function failure(error) { return { type: contactoConstants.ELIMINA_FAILURE, error } }
}

function obtieneContactos() {

    return dispatch => {
        dispatch(request());

        contactoService.obtieneContactos()
            .then(
                result => dispatch(success(result)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: contactoConstants.OBTIENETODOS_REQUEST } }
    function success(result) { return { type: contactoConstants.OBTIENETODOS_SUCCESS, result } }
    function failure(error) { return { type: contactoConstants.OBTIENETODOS_FAILURE, error } }
}