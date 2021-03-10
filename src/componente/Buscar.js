import React from 'react';

const Buscar = (props) => {

  return (<div className="mt-4">
             <div className="input-group mb-3">
                <input type="text" 
                       className="form-control" 
                       value={props.value} 
                       onChange={props.onChangeValue} />
                  <div className="input-group-append">
                    
                    <button className="btn btn-outline-secondary" 
                            type="button" 
                            onClick={props.presiona}>Buscar</button>
                   </div>
                </div>  
         </div>);
};

export default Buscar;