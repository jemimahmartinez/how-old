import * as React from 'react'
import ReactDropzone from 'react-dropzone'
import './DropArea.css'

interface IState {
    imageFiles: any[],
    dropzone: any
}

interface IProps{
    setResults:any
}

export default class DropArea extends React.Component<IProps, IState>{
    constructor(props: any) {
        super(props) // when using a constructor => always have to pass on the props
        this.state = { // initialise state
            dropzone: this.onDrop.bind(this),
            imageFiles: []
        }
    }

    public onDrop(files: any) { // update files
        this.setState({
            imageFiles: files,
        })
        this.props.setResults("",this.state.imageFiles.length)
        const file = files[0] // want to see the first file
        const reader = new FileReader();
        reader.onload = (event) => {
            const binaryString = (event.target as FileReader).result;
            if (typeof binaryString === "string") {
                this.upload(btoa(binaryString)) // btoa function will throw an error if it isnt a string
            }
        };
        try{
            reader.readAsBinaryString(file); // pass in file
        }catch(error){
            this.props.setResults("Sorry we had trouble loading that file please use a downloaded image file",0);
        }
    }

    public upload(base64String: any) { // upload function takes in image and does what we want it to do
        const base64 = require('base64-js');
        const byteArray = base64.toByteArray(base64String); // need base64-js package to be available
        fetch('https://whatsmyage.azurewebsites.net/image', {
            body: byteArray,
            headers: {
                'Content-Type': 'application/octet-stream',
            },
            method: 'POST'
        })
        // async
            .then((response: any) => { // after fetch call is finished
                if (!response.ok) {
                    this.props.setResults("Sorry there was an error",this.state.imageFiles.length)
                } else {
                    response.json().then((json: any[]) => { // otherwise we will see if there are any json files
                        if(json.length<1){
                            this.props.setResults("Sorry no face detected",this.state.imageFiles.length)
                        }else{
                            this.props.setResults("Age is "+json[0].faceAttributes.age,this.state.imageFiles.length)
                        }
                    })
                }
            })
    }
    public render() { // render our the react dropzone
        return (
            <div className="cont">
                <div className="centreText">
                    <div className="dropZone">
                        <ReactDropzone accept='image/*' onDrop={this.state.dropzone} style={{ position: "relative" }}>
                            <div className="dropZoneText">
                                {
                                    this.state.imageFiles.length > 0 ? // ? like an if statement
                                        <div>{this.state.imageFiles.map((file) => <img className="image1" key={file.name} src={file.preview} />)}</div> :
                                        <p>Try dropping some files here, or click to select files to upload.</p>
                                }
                            </div>
                        </ReactDropzone>
                    </div>
                </div>
            </div>
        )
    }

}
