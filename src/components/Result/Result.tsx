import * as React from 'react'
import Loader from 'react-loader-spinner'

interface IProps{
  result:string
  filelength:any
}

export default class Result extends React.Component<IProps,{}> { // {} means state is an empty object and dont need to access it (constructor)
  
  public render() {
    return (
      <div className="dank">
        {
          this.props.result === "" && this.props.filelength>0 ? // if empty string or file length is < 0 means its loading
            <Loader type="TailSpin" color="#00BFFF" height={80} width={80} /> :
            <p>{this.props.result}</p>
        }
      </div>
    )
  }
}