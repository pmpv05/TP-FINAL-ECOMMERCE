import React, { Component } from 'react';

class Breadcrumb extends Component {
    render() { 
        const breadcrumb = this.props.categories.map(theCategory => { {/*mapeamos el array de strings*/}
            return <p className='detail breadItem'>{theCategory} </p>
        })
        return ( 
            <div className="breadcrumb">{breadcrumb}</div>
         );
    }
}
 
export default Breadcrumb;