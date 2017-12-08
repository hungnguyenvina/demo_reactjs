import React from 'react';
import axios from 'axios';

export default class ProductUpdate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            product: {
                _id : 0,
                name:'enter product name',
                description:'enter product description',
                price:10
            }    
        };

        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        let self=this;
        axios.get('http://localhost:3005/product/'+this.props.match.params.id)
        .then(function(response){
            console.log(response.data);
            console.log(self);
            //const state = self.state;
            //state.products = state.products.filter(item => item._id !== id);
            self.state.product = response.data;
            self.setState(self.state.product);
            console.log(self.state.product.name);

        })
        .catch(function(error){
            console.log(error);
        });
    }

    onChange(event) {
        const state = this.state;
        state.product[event.target.name] = event.target.value;
        this.setState(state.product);

    }

    handleSubmit(event) {
        event.preventDefault();
        console.log('product object:',this.state.product);
        var productID = this.props.match.params.id;
        console.log('product id:',productID);
        //var self = this;

        let productJSON = JSON.stringify(this.state.product);
        console.log('product json:',productJSON);
        axios.put('http://localhost:3005/products/'+productID, productJSON,{
            headers: {
                'Content-Type': 'application/json'
            }})
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

