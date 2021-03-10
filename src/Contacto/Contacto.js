import React from 'react';
import { connect } from 'react-redux';
import { contactoActions } from '../actions';
import Modal from "react-bootstrap/Modal";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Buscar from '../componente/Buscar';
import './Contacto.css';

class Contacto extends React.Component {
  
    constructor(props) {
      super(props);
      this.state = {
        isOpen: false,
        id:'',
        nombre_completo:'',
        apellidos:'',
        telefono:'',
        correo:'',
        foto:'',
        value:''
      };
    }

    openModal = () => this.setState({ isOpen: true,id:'',
                                      nombre_completo:'',
                                      apellidos:'',
                                      telefono:'',
                                      correo:'',
                                      foto:'' });
    closeModal = () => this.setState({ isOpen: false });
   
    componentDidMount() {
    this.showAll();
    }

    
    eliminaContacto(id) {
   
      this.props.dispatch(contactoActions.eliminaContacto(id));
      this.showAll();
    }

     editaContacto(idp,nombre_completop,apellidosp,telefonop,correop,fotop) {
     
      this.openModal();

      this.setState({ id: idp, 
                      nombre_completo:nombre_completop,
                      apellidos:apellidosp,
                      telefono: telefonop,
                      correo: correop,
                      foto:fotop});
      
     
    }

    showAll() {
      const { dispatch } = this.props;
      dispatch(contactoActions.obtieneContactos() );
    }

    handleOnClick =() => {
      const { dispatch } = this.props;
      dispatch(contactoActions.buscaContactos(this.state.value));
    }
    
    onChangeValueHandler = (val) => {
      this.setState({ value: val.target.value })
    }

    render() {
      const { items,dispatch,itemContacto } = this.props;
      const { isOpen,id, nombre_completo,apellidos,telefono,correo,foto,value } = this.state;

        return (<div>
               <div className="col-lg-12">
                 <div className="row">
                     <div className="col-lg-4">
                         <button type="button" className="btn btn-primary btn-sm float-left mt-4 mb-2" 
                              onClick={(e) => { dispatch(contactoActions.obtieneContactos()) }}>
                         ACTUALIZAR
                         </button>
                     </div>
                    <div className="col-lg-4">
                       <Buscar key={1} 
                               value={value}
                               onChangeValue={this.onChangeValueHandler} 
                               presiona={() => this.handleOnClick ()} /> 
                    </div>
            <div className="col-lg-4">   
                      <button type="button" className="btn btn-primary btn-sm float-right mt-4 mb-2" 
                              onClick={this.openModal}>
                        AGREGAR NUEVO
                      </button>
             </div>
                      
              
        <table className="table table-bordered table-striped text-center table-sm colortable">
         <thead>
         <tr>
           <th scope="col">Id</th>
           <th scope="col"></th>
          <th scope="col">Nombre</th>
          <th scope="col">Apellidos</th>
          <th scope="col">Correo</th>
          <th scope="col">Telefono</th>
          <th scope="col">Fecha</th>
          <th>Acciones</th>
         </tr>
         </thead>
            { items &&
              <tbody>
                   {items.map((contacto, index) =>
                    <tr key={contacto.id}>
                          <th scope="row"> {contacto.id }</th>
                          <th><img src={contacto.foto} width="30" height="30"/></th>
                          <td>{contacto.nombre_completo }</td>
                          <td>{contacto.apellidos }</td>
                          <td>{contacto.correo }</td>
                          <td>{contacto.telefono }</td>
                        <td>{new Intl.DateTimeFormat("en-MX").format(new Date(contacto.fecha_captura))}</td>
                        <td>
                        <button className="btn btn-outline-success btn-sm" onClick={(e) => {
                                       this.editaContacto(contacto.id,
                                                          contacto.nombre_completo,
                                                          contacto.apellidos,
                                                          contacto.telefono,
                                                          contacto.correo,
                                                          contacto.foto)}}> Editar </button>  
                         <button className="btn btn-outline-danger btn-sm ml-2" onClick={(e) => { 
                                    if (window.confirm('Esta seguro de eliminar al contacto?')) this.eliminaContacto(contacto.id) } }> Eliminar</button> 
                        
                        </td>
                    </tr>)}
              </tbody>
             }
             
            </table>
            </div>
            <Modal show={isOpen} onHide={this.closeModal} backdrop="static">
            <Modal.Header>
               <Modal.Title>Contacto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Formik
                initialValues={{
                  nombre_completo: nombre_completo !='' ? nombre_completo : '',
                  apellidos: apellidos != ''? apellidos:'',
                  telefono: telefono != '' ? telefono: '',
                  correo: correo != '' ? correo : '',
                  foto: foto !='' ? foto : 'https://i.ibb.co/q0VnZjH/contacto.png'
                }}
                validationSchema={Yup.object().shape({
                  nombre_completo:Yup.string().required('El nombre es requerido'),
                  apellidos:Yup.string().required('El apellido es requerido'),
                  telefono: Yup.string().required('El telefono es requerido'),
                  correo: Yup.string().email('Email es invalido').required('Email es requerido'),
                  foto: Yup.string().required('El link del perfil es requerido.')
                })}
                onSubmit={fields => {

                  if (id!='') {
                     dispatch( 
                                 contactoActions.editarContacto(id,
                                                               fields.nombre_completo,
                                                               fields.apellidos,
                                                               fields.telefono, 
                                                               fields.correo, 
                                                               fields.foto)
                             );
                  } else {

                         dispatch(
                                  contactoActions.agregarContacto(fields.nombre_completo,
                                                                  fields.apellidos,
                                                                  fields.telefono,
                                                                  fields.correo,
                                                                  fields.foto)
                                );
                  }

                    this.showAll();

                    this.closeModal();
                }}>
              {({ errors, status, touched }) => (
              <Form >
             <fieldset>
              <fieldset className="form-group">
                <label htmlFor="nombre_completo">Nombre</label>
                     <Field name="nombre_completo" type="text" className={'form-control' + (errors.nombre_completo && touched.nombre_completo ? ' is-invalid' : '')} />
                     <ErrorMessage name="nombre_completo" component="div" className="invalid-feedback" />
               </fieldset>
               <fieldset className="form-group">
               <label htmlFor="apellidos">Apellidos</label>
                     <Field name="apellidos" type="text" className={'form-control' + (errors.apellidos && touched.apellidos ? ' is-invalid' : '')} />
                     <ErrorMessage name="apellidos" component="div" className="invalid-feedback" />
               </fieldset>
               <fieldset className="form-group">
               <label htmlFor="telefono">Telefono</label>
                     <Field name="telefono" type="text" className={'form-control' + (errors.telefono && touched.telefono ? ' is-invalid' : '')} />
                     <ErrorMessage name="telefono" component="div" className="invalid-feedback" />
               </fieldset>
               <fieldset className="form-group">
                   <label htmlFor="correo">Email</label>
                     <Field name="correo" type="text" className={'form-control' + (errors.correo && touched.correo ? ' is-invalid' : '')} />
                     <ErrorMessage name="correo" component="div" className="invalid-feedback" />
               </fieldset>
               <fieldset className="form-group">
                   <label htmlFor="foto">Link foto perfil</label>
                     <Field name="foto" type="text" className={'form-control' + (errors.foto && touched.foto ? ' is-invalid' : '')} />
                     <ErrorMessage name="foto" component="div" className="invalid-feedback" />
               </fieldset>
               
               <button className="btn btn-sm btn-success btn-block" type="submit">ACEPTAR </button>
              
              </fieldset>
            </Form> 
  )}
  </Formik>
                  </Modal.Body>
                 <Modal.Footer>
                    <button className="btn btn-danger btn-sm" onClick={this.closeModal}>CANCELAR</button>
                    
        </Modal.Footer>
      </Modal>

            </div>

   
      </div>);
    }
}

function mapStateToProps(state) {
  const { items,itemContacto } = state.contactos;
  return {
    items,
    itemContacto
  };
}

const connectedContactoPage = connect(mapStateToProps)(Contacto);
export { connectedContactoPage as Contacto }; 
