import React from 'react';
import axios from 'axios';

export default class ProductAdd extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            product: {
                name:'enter product name',
                description:'enter product description',
                price:10
            }    
        };

        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onChange(event) {
        const state = this.state;
        state.product[event.target.name] = event.target.value;
        this.setState(state.product);
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.product);

        //var self = this;
        axios.post('http://localhost:3005/products/', this.state.product)
        .then(function(response){
            console.log(response.data);
            //self.products = response.data;
            //self.setState({
            //    products: response.data
            //});
        })
        .catch(function(error){
            console.log(error);
        });
    }

    render(){


        return (
            <div>
                <h1>Product add</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input onChange={this.onChange}  name="name" value={this.state.product.name} type="text" className="form-control" id="name" />
                        <p>{ this.state.product.name }</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <input onChange={this.onChange} name="description" value={this.state.product.description}  type="text" className="form-control" id="description" />
                        <p>{ this.state.product.description }</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price:</label>
                        <input onChange={this.onChange}  name="price" value={this.state.product.price} type="text" className="form-control" id="price" />
                        <p>{ this.state.product.price }</p>
                    </div>
                    <button type="submit" className="btn btn-default">Save</button>
                </form> 
            </div>
        );
    }
}