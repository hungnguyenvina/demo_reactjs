import React from 'react';
import Product from './Product';
import axios from 'axios';
import PropTypes from 'prop-types';

export default class ProductList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            products: []
        };

        this.handleClickItemInChild = this.handleClickItemInChild.bind(this);
    }

    componentDidMount(){
        console.log('Component Product did mount!');
        var self = this;//use temporary variable named "self" to get instance of ProductList class
        //inside axios.get function , "this" now is instance of axios, we need this (instance of Product class)
        //to access products variable so we use self.products
        axios.get('http://localhost:3005/products')
                .then(function(response){
                    console.log(response.data);
                    //self.products = response.data;
                    self.setState({
                        products: response.data
                    });
                })
                .catch(function(error){
                    console.log(error);
                });
    }

    handleClickItemInChild(id) {
        alert('delete product with '+id);
        let self=this;
        axios.delete('http://localhost:3005/products/'+id)
        .then(function(response){
            console.log(response);
            //console.log(self);
            //const state = self.state;
            //state.products = state.products.filter(item => item._id !== id);
            self.state.products = self.state.products.filter(item => item._id !== id);
            self.setState(self.state.products);

        })
        .catch(function(error){
            console.log(error);
        });
    }

    /*products = [
        { _id:1, name:'Product 1', description: 'This is product 1', price: 10000},
        { _id:2, name:'Product 2', description: 'This is product 2', price: 20000},
        { _id:3, name:'Product 3', description: 'This is product 3', price: 30000},
      ];*/
    
    render(){
       

        return (
            <div>
            <h1>Product list</h1>
            <Product callDelete={this.handleClickItemInChild} products={this.state.products} />
            </div>
        );
    }

    
}

ProductList.propTypes = {
    children: PropTypes.element
  };

