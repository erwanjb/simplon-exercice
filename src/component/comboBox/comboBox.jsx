import React from 'react'
import * as antd from 'antd'
import 'antd/dist/antd.css'

class comboBox extends React.Component {

    getValue(value) {
        this.props.recupChange(value)
    }


    render() {
        const dataSelect = this.props.dataSelect
        return (
            <div>
                <antd.Select 
                    labelInValue={this.props.mode ==='edit' ? true : false}
                    disabled= {this.props.mode === 'edit' ? true : false}
                    value={this.props.mode === 'edit' ? {key: (this.props.comboValue ? this.props.comboValue: '' )} : this.props.comboValue ? this.props.comboValue : ''}
                    onChange={this.getValue.bind(this)}
                    showSearch 
                    placeholder="Choisir une option" 
                    style={{ width: 200 }}
                    filterOption= {(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }>
                    {dataSelect.map((element, index) => <antd.Select.Option key={!this.props.comboValue ? index : null} value={element.value}>{element.displayField}</antd.Select.Option>)}
                </antd.Select>
            </div>
        )
    }
}

export default comboBox