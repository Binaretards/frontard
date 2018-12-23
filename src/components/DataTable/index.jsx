import React, { Component } from 'react'
import { Table, Button, Alert } from 'reactstrap'
import _ from 'lodash'
import 'bootstrap/dist/css/bootstrap.min.css';

const data = {
  "tableName": [
      {
        "uuid": "d708ea20-96ed-412b-82f1-43a177fbeeca",
        "fields": {
          "id": 1,
          "path": "/img/img_1.tga",
          "scale_x": 0.25,
          "scale_y": 0.25
        }
      },
      {
        "uuid": "d708ea20-96ed-412b-82f1-43a177fbeecb",
        "fields": {
          "id": 2,
          "path": "/img/img_1111.tga",
          "scale_x": 0.225,
          "scale_y": 0.255
        }
      },
      {
        "uuid": "d708ea20-96ed-412b-82f1-43a177fbeecс",
        "fields": {
          "id": 555,
          "path": "/шьтфу",
          "scale_x": 0.322,
          "scale_y": 2.255
        }
      },
    ],
  "table2": [
      {
        "uuid": "d708ea20-96ed-412b-82f1-43a177fbeeca",
        "fields": {
          "privet": 1,
          "put": "/img/img_2.tga",
          "scally": 0.25,
          "mauldar": 0.25
        }
      },
    ]
}

class TableList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: [],
      loaded: false,
      activeTab: Object.keys(data)[0]
    }
  }

  componentDidMount() {
    this.setState({ data, loaded: true })
  }

  showTabs = (table) => {
    const tables = Object.keys(data)
    return tables.map((item, i) => {
      console.log(item)
      let activeProperty = item === this.state.activeTab ? { active: true } : {}
      return (
        <Button color="info" onClick={() => this.setState({ activeTab: item })} {...activeProperty} key={i}>
          {item}
        </Button>
      )
    })
  }

  showActiveTab = () => {
    let activeTab = this.state.activeTab
    let tableData = this.state.data[activeTab]

    return (
      this.renderTable(activeTab, tableData)
    )
  }

  renderTable = (tableName, tableData) => {
    console.log(tableData)
    if(!tableData || !tableData.length){
      return (
        <Alert>
          Нет данных
        </Alert>
      )
    }
    let header = Object.keys(tableData[0].fields)

    return (
      <Table bordered>
        <thead>
          <tr>
            {header.map((item, index) => {
              return (
                <th key={index}>{item}</th>
              )
            })}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tableData.map(item => {
            return (
              <tr key={item.uuid}>
                {Object.keys(item.fields).map((key, i) => {
                  let field = item.fields[key]
                  return (
                    <td key={i}>
                      <input className="form-control" type="text" value={field}
                      onChange={(event) => {this.onInputChange(tableName, item.uuid, key, event.target.value)}}>
                      </input>
                    </td>
                  )
                })}
                 <td><Button onClick={() => this.onRowDelete(tableName, item.uuid)} outline>X</Button></td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    )
  }

  onRowDelete = (tableName, rowId) => {
    let stateData = _.cloneDeep(this.state.data)
    let rows = stateData[tableName].filter(item => item.uuid !== rowId)
    stateData[tableName] = rows
    this.setState({data: stateData})
  }

  onInputChange = (tableName, rowId, fieldName, value) => {
    console.log('oninputchange', tableName, rowId, fieldName, value)
    let stateData = _.cloneDeep(this.state.data)
    let rows = stateData[tableName]
    let index = _.findIndex(rows, {uuid: rowId})
    if(~index){
      rows[index].fields[fieldName] = value
    }
    stateData = rows
    this.setState({data: stateData})
  }

  render() {
    if (!this.state.loaded) {
      return null
    }
    console.log(this)
    return (
      <div>
        {this.showTabs()}
        {this.showActiveTab()}
      </div>
    )
  }

}

export default TableList