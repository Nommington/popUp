import React, { Component } from "react";
import "./Inventory.css";
// import AddItem from "../../../components/admin/AddItem"
import AddModal from "../../../components/admin/AddModal"
import EditModal from "../../../components/admin/EditModal"
import axios from "axios";

class Inventory extends Component {
  constructor(props) {
    super(props)
    this.refreshInventoryList = this.refreshInventoryList.bind(this);
  }

  state = {
    items: []
  }

  refreshInventoryList() {
    axios.get('/api/items')
    .then(res => {
      const items = res.data;
      this.setState({ items })
    })
    .catch(function (err) {
      console.log(err);
    });
  }

  componentDidMount() {
    this.refreshInventoryList();
  }

  buttonEdit(e, upc) {
    e.preventDefault();
    console.log(`Editing item with UPC #${upc} ...`);
    alert("This will edit the item with UPC " + upc);
  }


  // Matches with "/api/items/:upc"
  buttonRemove(e, upc) {
    e.preventDefault();
    var userConfirmation = window.confirm(`Are you sure you want to delete this item?`);
    if (!userConfirmation) {
      alert(`This item will not be deleted!`);
    } else {
      // console.log(`Deleting item with UPC #${upc} ...`)
      axios.delete('/api/items/' + upc)
      .then(res => {
        // console.log(res);
        // console.log(res.data);
        this.refreshInventoryList()
        //this.forceUpdate();
      }).catch(error => {
        console.log("There was an error deleting this item: ", error);
      })
    }
  }

  render() {
    return (
      <div id="inventory" className="container">
        <div className="row">
          <div className="col-sm">
            <h1 className="text-center">
              Inventory
            </h1>
            <p>
              These are the items populating the inventory for Popup Theory. Revise or delete the items using the controls below, or <a id="add-item" href="">add a new item</a> to the inventory.
            </p>
            {this.state.items.map((item, i) => 
              <table className="table" key={i}>
                <tbody>
                  <tr>
                    <td colSpan="2">
                      <h2>{item.name}</h2>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <span>ID:</span>
                            </td>
                            <td>
                              <span>{item._id}</span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span>UPC:</span>
                            </td>
                            <td>
                              <span>{item.upc}</span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span>PRICE:</span>
                            </td>
                            <td>
                              <span>${item.price}</span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span>STOCK:</span>
                            </td>
                            <td>
                              <span>{item.stock}</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td align="center">
                      <img src={item.photoURL} alt={item.name} />
                    </td>
                    <td>
                      <div className="float-right">
                        <button
                          id="btnEdit"
                          className="btn btn-light"
                          data-toggle="modal"
                          data-target="#editModal"
                          type="button"
                          data-backdrop="static"
                          data-keyboard="false"
                          // onClick={(e) => this.buttonEdit(e, item.upc)}
                          >
                          Edit
                        </button>
                        <button 
                          id="btnRemove"
                          className="btn btn-light"
                          type="button"
                          onClick={(e) => {this.buttonRemove(e, item.upc);}}>
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
            {/* <AddItem refreshInventoryList={this.refreshInventoryList} /> */}
          </div>
        </div>
        <button
          id="btnAdd"
          className="btn btn-light action-button"
          data-toggle="modal"
          data-target="#addModal"
          type="button"
          data-backdrop="static"
          data-keyboard="false">
          Add Item To Inventory
        </button>
        <AddModal refreshInventoryList={this.refreshInventoryList} />
        <EditModal refreshInventoryList={this.refreshInventoryList} />
      </div>
    );
  }
}

export default Inventory;