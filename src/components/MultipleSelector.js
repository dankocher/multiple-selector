import React, { Component } from 'react';
import { Select } from 'antd';

const Option = Select.Option;

class MultipleSelector extends Component {

    defaultSelectText = "";

    state = {
        selected: [],
        newSelector: ""
    };

    componentWillMount() {
        this.setState({
            selected: [...this.props.selected],
            newSelector: this.props.selectText
        });

        this.defaultSelectText = this.props.selectText;
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            selected: [...nextProps.selected]
        });
    }

    async handleChange(item, index) {
        if (item.key === "delete") {
            await this.state.selected.splice(index, 1);
        } else if (index === "new") {
            this.state.selected.push(item.key);
            this.state.newSelector = this.defaultSelectText;
        } else {
            this.state.selected[index] = item.key;
        }
        await this.forceUpdate();

        this.props.onChange(this.state.selected);
    }

    render() {
        const {deleteText, size} = this.props;

        const data = this.props.data === undefined ? [] : this.props.data;

        return (
            <div className="multiple-selector-container">
                {
                    this.state.selected.map((item, index) => (
                        <div key={`selector-${index}`} style={{marginBottom: 5}}>
                            <Select labelInValue value={{ key: (data.find(d => d.key === item)).value}} style={{width: '100%'}} size={size}
                                    onChange={item => this.handleChange(item, index)}>
                                {
                                    data.map((option, o_index) => (
                                        this.state.selected.find(s => s === option.key) == null ?
                                            <Option key={`option-${index}-${o_index}`} value={option.key}>{option.value}</Option>
                                        : null
                                    ))
                                }
                                {
                                    <Option value={"delete"}>{deleteText}</Option>
                                }
                            </Select>
                        </div>
                    ))
                }
                {
                    this.state.selected.length < data.length ?
                    <div>
                        <Select labelInValue value={{key: this.state.newSelector}} style={{width: '100%'}} size={size}
                                onChange={item => this.handleChange(item, "new")}>
                            {
                                data.map((option, o_index) => (
                                    this.state.selected.find(s => s === option.key) == null ?
                                        <Option key={`option-${o_index}`} value={option.key}>{option.value}</Option>
                                        : null
                                ))
                            }
                        </Select>
                    </div>
                    : null
                }
            </div>
        );
    }
}

export default MultipleSelector;
