import React, { Component } from "react";
import { render } from "react-dom";

class App extends Component {

    constructor(){
        super();
        this.state = {
            title: '',
            description: '',
            productos: [],
            _id:''
        };
        this.handleChange = this.handleChange.bind(this)
        this.addProduct = this.addProduct.bind(this)
    }

    addProduct(e){
        if (this.state._id) {
            fetch(`/api/product/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
            .then(res=>res.json())
            .then(data=> {
                M.toast({html:'Tarea Actualizada'});
                this.setState({title: '',description: '',_id: ''});
                this.getProduct();
            })
            .catch(err => console.Error(err))
        }else{
            fetch('/api/product', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
            .then(res=>res.json())
            .then(data=> {
                M.toast({html:'Tarea Guardada'});
                this.setState({title: '',description: ''});
                this.getProduct();
            })
            .catch(err => console.Error(err))
        }
        e.preventDefault();
    }

    getProduct(e){
        fetch('/api/product', {
            method: 'GET',
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then(data=> {
            this.setState({productos: data});
        })
    }

    deleteProduct(id){
        if (confirm('Esta Seguro de eliminar este producto?')) {
            fetch(`/api/product/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
            .then(res=>res.json())
            .then(data=> {
                M.toast({html:data.status});
                this.getProduct();
            })
        }
    }

    editProduct(id){
        fetch(`/api/product/${id}`)
            .then(res=>res.json())
            .then(data => {
                this.setState({
                    title: data.title,
                    description: data.description,
                    _id: data._id
                })
            })
    }

    componentDidMount(){
        this.getProduct();
    }

    handleChange(e){
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }
    render() {
        return(
            <div>
                {/*NAVEGACION*/}
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">GESIVAR</a>
                    </div>
                </nav>
                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addProduct}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="title" onChange={this.handleChange} type="text" placeholder="Product Title" value={this.state.title}></input>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                               <textarea name="description" onChange={this.handleChange} placeholder="Descripcion " className="materialize-textarea" value={this.state.description}></textarea>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn light-blue darken-4">
                                            Enviar
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th>Descripcion</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.productos.map(producto => {
                                            return(
                                                <tr key={producto._id}>
                                                    <td>{producto.title}</td>
                                                    <td>{producto.description}</td>
                                                    <td>
                                                        <button className="btn light-blue darken-4" onClick={
                                                            () => this.deleteProduct(producto._id)}>
                                                            <i className="material-icons">delete</i>
                                                        </button>
                                                        <button className="btn light-blue darken-4" style={{margin:'4px'}} onClick={() => this.editProduct(producto._id)}>
                                                            <i className="material-icons">edit</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default App;