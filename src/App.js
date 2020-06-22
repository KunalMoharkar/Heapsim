import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Navbar} from './Navbar';
import {Header} from './Header';

class App extends React.Component
{
  constructor(props)
  {
    super(props);
    
    this.state={
      value:'',
      mode:"BuildHeap",
      startbuild:0,
      startsort:0,
      step:0,
      arrsize:0,
      submit:false,
      arr:[],
    }
  }

  tohome=()=>{
    this.setState({
      value:'',
      mode:"BuildHeap",
      startbuild:0,
      startsort:0,
      step:0,
      arrsize:0,
      submit:false,
      arr:[],
    })
  }

  handleChange=(event)=>{
    this.setState({value: event.target.value});
  }

  handleSubmit=(event)=>{

    let size = this.state.value.length;

    this.setState((prevState)=>({
      submit:true,
      startbuild:parseInt(prevState.value.length/2)-1,
      startsort:prevState.value.length-1,
      arrsize:prevState.value.length,
    }))

    this.strToarray(this.state.value,this.state.arr);
    event.preventDefault();
  }

  strToarray=(str,arr)=>{
    this.setState({
    arr:[...str.split('').map((val)=>(val.charCodeAt(0)))],
    })
  }

  changemode=()=>{
    this.setState({
      mode:"HeapSort",
      step:0,
    })
  }

  heapify=(arr,i,size)=>{

    let left,right,current,large,prev,temp;
    current = i;

    while(current < size)
    {   
        prev = current;
        large = arr[current];
        left = 2*current +1;
        right = 2*current + 2;

        if(left<size && arr[left]>large)
        {
            large = arr[left];
            current = left;
        }
        
        if(right < size && arr[right] > large)
        {
            large = arr[right];
            current = right;
        }

        if(arr[prev]!=large)
        {
            temp =arr[prev];
            arr[prev] = large;
            arr[current] = temp;
        }
        else
        {
            break;
        } 
    }
    this.setState({
      arr:[...arr],
    })
  }

  buildheap=(arr,size,i)=>{

      this.heapify(arr,i,size);
      this.setState((prevState)=>({
        startbuild:prevState.startbuild -1,
        step :prevState.step+1,
      }))
  }

  heapsort=(arr,i)=>{
       let temp;

        temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;

        this.heapify(arr,0,i);
        this.setState((prevState)=>({
          startsort:prevState.startsort -1,
          step :prevState.step+1,
        }))
  }


  render(){


    const controlbuild=()=>{

      if(this.state.submit)
      {

        if(this.state.startbuild === -1)
        {
          return(
            <div>
              <div className="alert alert-primary">Completed Build</div>
              <button className="btn btn-dark" onClick={this.changemode}>Proceed to sort</button>
            </div>
            );
        }
        else
        {
          return(<button class="btn btn-primary" onClick={()=>this.buildheap(this.state.arr,this.state.arrsize,this.state.startbuild)}>next</button>)
        }

      }
      else
      {
        return(null);
      }

    }

    const controlsort=()=>{

      if(this.state.submit)
      {

        if(this.state.startsort === 0)
        {
          return(
          <div>
          <div className="alert alert-primary">Completed Sort</div>
          <button className="btn btn-info" onClick={this.tohome}>Home</button>
          </div>
          );

        }
        else
        {
          return(<button class="btn btn-primary" onClick={()=>this.heapsort(this.state.arr,this.state.startsort)}>next</button>)
        }

      }
      else
      {
        return null;
      }

    }

    const form=()=>{

      if(this.state.submit)
      {
        return null;
      }
      else
      {
        return(  
          <div className="container">
            <form onSubmit={this.handleSubmit}>
              <label>
                <b>Input:</b>
                <br />
                <input type="text" value={this.state.value} onChange={this.handleChange}
                 className="form-control" placeholder="Enter String" />
              </label>
              <br />
              <input type="submit" value="Submit" className="btn btn-dark" />
            </form>
          </div>
        )
      }

    }

  
    return(
      <div>
        <Navbar />
        <Header content={this.state.mode}/>
        {form()}
        <div className="container my-3 p-3">
            <button class="btn btn-success my-3" >
             <b>Step: </b>{this.state.step}
            </button>
          <div className="row">
            {this.state.arr.map((val)=>(
              <div className="card">
                <div className="card-body">
                  <p className="card-title"><b>{val}</b></p>  
                </div>
              </div>
            ))}
        </div>
        <br />
        <br />
          {this.state.mode==="BuildHeap"?controlbuild():controlsort()}
        </div>
      </div>
    );
  }

}


export default App;
