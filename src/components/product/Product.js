import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {  NavLink } from 'react-router-dom';

export default class Product extends Component {
    propTypes = {
        products: PropTypes.array.isRequired
    };

    constructor(prop) {
        super(prop);
        this.createProductRow = this.createProductRow.bind(this);
    }

    createProductRow() {
         
       return (
        <div>
            <table>
                <tr>
                    <td>ID</td>
                    <td>Name</td>
                    <td>Description</td>
                    <td>Price($)</td>
                    <td>Actions</td>
                </tr>
                
                { this.props.products.map((item) => {
                    return (
                        <tr key={item._id}>
                            <td>{item._id}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.price}</td>
                            <td>
                                <NavLink to={`/update/${item._id}`} className="btn btn-primary">Update</NavLink>
                                <a href="#" onClick={()=>this.props.callDelete(item._id)}  className="btn btn-danger">Delete</a>
                            </td>
                        </tr>
                    );
                })}

            </table>
        </div>
       );
        
    }

    render() {
        return (
            <div>
               { this.props.products.map((item) => {
                    return (<p key={item._id}>{item.price}</p>);
                })}
           <br />
                  { this.createProductRow()}
            </div>
        );
    }
}