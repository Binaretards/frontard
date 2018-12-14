import React, { Component } from 'react';
import {Table, Button} from 'reactstrap'
import _ from 'lodash'
const data = {
    "segments": {
      "header": [
        {
          "fields": [
            {
              "name": "magic_word",
              "value": "test"
            },
            {
              "name": "version",
              "value": "00123"
            },
            {
              "name": "segment_count",
              "value": 5
            }
          ],
          "empty": false
        }
      ],
      "segment": [
        {
          "fields": [
            {
              "name": "id",
              "value": 1
            },
            {
              "name": "path",
              "value": "/img/img_1.tga"
            },
            {
              "name": "scale_x",
              "value": 0.15
            },
            {
              "name": "scale_y",
              "value": 0.15
            }
          ],
          "empty": false
        },
        {
          "fields": [
            {
              "name": "id",
              "value": 2
            },
            {
              "name": "path",
              "value": "/img/img_2.tga"
            },
            {
              "name": "scale_x",
              "value": 0.25
            },
            {
              "name": "scale_y",
              "value": 0.25
            }
          ],
          "empty": false
        },
        {
          "fields": [
            {
              "name": "id",
              "value": 3
            },
            {
              "name": "path",
              "value": "/img/img_3.tga"
            },
            {
              "name": "scale_x",
              "value": 0.35
            },
            {
              "name": "scale_y",
              "value": 0.35
            }
          ],
          "empty": false
        },
        {
          "fields": [
            {
              "name": "id",
              "value": 4
            },
            {
              "name": "path",
              "value": "/img/img_4.tga"
            },
            {
              "name": "scale_x",
              "value": 0.45
            },
            {
              "name": "scale_y",
              "value": 0.45
            }
          ],
          "empty": false
        },
        {
          "fields": [
            {
              "name": "id",
              "value": 5
            },
            {
              "name": "path",
              "value": "/img/img_5.tga"
            },
            {
              "name": "scale_x",
              "value": 0.55
            },
            {
              "name": "scale_y",
              "value": 0.55
            }
          ],
          "empty": false
        }
      ]
    },
    "empty": false
  }

class DataTable extends Component {
  state = {
    data: [],
    loaded: false,
   }
  componentDidMount() {
    console.log('cdm')
    let newData = data.segments.segment.map(segment => {
      let row = {}
      segment.fields.map(field => {
        row[field.name] = field.value
        return null
      })
      return row
    })
    this.setState({data:newData,loaded:true})
  }
  renderTable = () => {
    console.log('rt')
    return (
      <Table>
        <tbody>
          {this.state.data.map(segment => {
            return this.renderRow(segment)
          })}
        </tbody>
      </Table>
      
    )
  }
  renderRow = (fields) => {
    let rowId = fields.id
    return (
      <tr key={rowId}>
        {Object.keys(fields).map(field => {
          return this.renderField(rowId, field, fields[field])
        })}
      </tr>
    )
  }
  renderField = (rowId, name, value) => {
    return (
      <td key={name}>
        <input className="form-control" type="text" value={value} 
          onChange={(event) => {this.onInputChange(rowId, name, event.target.value)}} />
          
      </td>
    )
  }
  onInputChange = (rowId, name, value) => {
    console.log('oninputchange', rowId, name, value)
    let data = _.cloneDeep(this.state.data)
    let index = _.findIndex(data, {id:rowId})
    console.log(index)
    if(~index){
      data[index][name] = value
    }
    this.setState({data})
  }
  onSaveClick = () => {
    // let resultData = _.cloneDeep(data)
    // resultData.segments.segment = resultData.segments.segment.map(segment => {
    //   let rowId = segment.fields[0]
    //   let fields = segment.fields.map(field => {
    //     let index = _.findIndex(this.state.data, {id})
    //     field.name = null
    //     field.value = null
    //   })
    //   segment.fields = fields
    //   return segment
    // })
    
    console.log(JSON.stringify(this.state.data))
  }
  render() { 
    console.log(this.state)
    if (!this.state.loaded) {
      return null
    }
    return ( 
      <React.Fragment>
        {this.renderTable()}
        <Button onClick={this.onSaveClick} color="danger">save</Button>
      </React.Fragment>
     );
  }
}
 
export default DataTable;