import * as React from 'react';
import DropArea from './components/DropArea/DropArea'
import Header from './components/Header/Header'
import Result from './components/Result/Result'

interface IState {
  result:string
  filelength:number
}

class App extends React.Component<{},IState>{

  public constructor(props:any){
    super(props)
    this.state = {
      filelength:0,
      result:"",
      }
  }

  
  public resultstate = (resultString:string,filelen:any) => {
    this.setState({result:resultString,filelength:filelen})
  } 
  // automatically bound to this state
  // always going to be referencing the current class that its in

  public render() {
    return (
      <div>
        <Header />
        <DropArea setResults={this.resultstate} />
        <Result result={this.state.result} filelength={this.state.filelength} />
      </div>
    );
  }
}

export default App;
