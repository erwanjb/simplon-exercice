import React from 'react'
import * as antd from 'antd'
import 'antd/dist/antd.css';
import Highlighter from 'react-highlight-words';


class grid extends React.Component {

  state = {
    searchText: '',
  }

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <antd.Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <antd.Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </antd.Button>
        <antd.Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </antd.Button>
      </div>
    ),
    filterIcon: filtered => (
      <antd.Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  })

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  }

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  }
  
  render() {
      const dataSource = this.props.dataSource
        
        const columns = []
        if (this.props.dataSource[0]) {
          for(const prop in this.props.dataSource[0]) {
            columns.push({
              title: prop[0].toUpperCase() + prop.slice(1),
              dataIndex: prop,
              key: prop
            })
          }
        }

        for(const action of this.props.actionSource) {
          columns.push({
            title: action.title[0].toUpperCase() + action.title.slice(1),
            dataIndex: action.title,
            key: action.title,
            render: action.action
          })
        }
          
      return (
        <div>
          <antd.Table dataSource={dataSource} columns={columns} ></antd.Table>
        </div>
      )
  }
}

export default grid