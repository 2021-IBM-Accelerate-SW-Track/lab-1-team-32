//import Header from "./component/header"
import Editable_Label from "./component/editable_label"
import './App.css';

import React, {Component} from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Checkbox from '@material-ui/core/Checkbox';

import Button from '@material-ui/core/Button';

class App extends Component{
  constructor()
  {
    super();
    this.state={
      data:'',
      list:[]
    }
  }
  //Test for duplicates, return true if a duplicate is found
  testDuplicate(name){
    const {list} = this.state;
    for(let i = 0; i < list.length; ++i){
      if(list[i].name === name)
        return true;
    }
    return false;
  }
  //Record input
  handle(event)
  {
    this.setState({
      data:event.target.value
    })
  }
  //Submit input, unless there is a duplicate list item.
  submitInput(){
    let {list, data} = this.state;
    if(!this.testDuplicate(data)){
      //If there is no duplicate, enter the item
      list.push({
        name: data,
        date: new Date(),
        complete: false
      });
      this.setState({ list:list });
    }
  }
  //Set complete
  setComplete(item, event){
    let {list} = this.state;
    const index = list.findIndex((i)=>i.name === item.name);
    list[index].complete = event.target.checked;
    this.setState({ list:list });
  }
  //Delete an item
  deleteItem(item){
    const newList = this.state.list.filter((listItem)=>listItem.name !== item.name);
    this.setState({list:newList});
  }
  //Submit an item name edit, unless that list item name is taken.
  submitEdit(oldName, newName){
    //console.log("oldName: " + oldName + " newName: " + newName);
    if(!this.testDuplicate(newName)){
      let {list} = this.state;
      const index = list.findIndex((i)=>i.name === oldName);
      list[index].name = newName;
      this.setState({list:list});
    }
  }

  render() {
    return (
      <div className="App">

        <input type="text" id="input" data-testid="new-item-input" onChange={ this.handle.bind(this) } />
        <button type="button" data-testid="new-item-button" onClick={ this.submitInput.bind(this) }>Add Item</button>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item Name</TableCell>
              <TableCell>Date Created</TableCell>
              <TableCell>Task Complete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              this.state.list.map((item)=>{
                return(
                  <TableRow key={item.name}>
                    <TableCell>
                      <Editable_Label text={item.name} onSubmitEdit={(newText)=>{this.submitEdit(item.name, newText)}}></Editable_Label>
                    </TableCell>
                    <TableCell>{
                      (item.date.getMonth()+1) + '/' +
                      item.date.getDate() + '/' +
                      item.date.getFullYear() + ' ' +
                      item.date.getHours() + ':' +
                      item.date.getMinutes() + ':' +
                      item.date.getSeconds()
                    }</TableCell>
                    <TableCell><p>{item.complete}</p><Checkbox checked={item.complete} onChange={event=>{this.setComplete(item, event)}}></Checkbox></TableCell>
                    <TableCell>
                      <Button variant="contained" color="secondary" 
                      onClick={this.deleteItem.bind(this, item)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>

      </div>
    );
  }
}

export default App;
