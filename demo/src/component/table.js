import React, {Component} from 'react';
import { Table, Tooltip, Button, Modal} from 'antd';
import {getTableData} from "./fetch";

//Modal小表格
class Properties extends Component{
    constructor(props) {
        super(props);

        //modal表格数据配置
        this.sonColumns = [
            { title: 'Type', dataIndex: 'type', key: 'type' },
            { title: 'Url', dataIndex: 'url', key: 'url', render: text => <a href={text} target={'blank'}>{text}</a>}
        ];
    }
    render() {
        return(
            <div>
                <Modal
                    title="Properties"
                    bodyStyle={{padding: 0}}
                    visible={this.props.visible}
                    footer={null}
                    onCancel={this.props.handleCancel}
                >
                    <Table
                        columns={this.sonColumns}
                        dataSource={this.props.tableData}
                        pagination={false}
                    />
                </Modal>
            </div>
        )
    }
}


class TableList extends Component{
    constructor(props) {
        super(props);

        this.state = {
            data: [], //总表数据
            visible: false,
            tableData: [], //modal层数据
            loading: true
        };

        //总表columns配置
        this.columns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width: 300,
            render: text =>
                (<Tooltip title={text}>
                    <p style={{
                        width: '268px',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        margin: 0
                    }}>
                        {text}
                    </p>
                </Tooltip>)
        }, {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: text => <img src={text} style={{width: '100px'}}/>
        }, {
            title: 'HumanURL',
            dataIndex: 'humanURL',
            key: 'humanURL',
            align: 'center',
            render: text => <a href={text} target={'blank'}>{'链接'}</a>
        }, {
            title: 'BaseURL',
            dataIndex: 'baseURL',
            key: 'baseURL',
            align: 'center',
            render: text => <a href={text} target={'blank'}>{'链接'}</a>
        }, {
            title: 'Tags',
            dataIndex: 'tags',
            key: 'tags',
            render: record => {
                let _len = record.length;
                let item = () => {
                    return(
                        record.map((res,i)=> {
                            return _len - 1 === i ? (<span key={i}>{res}</span>) : (<span key={i}>{res},</span>)
                        })
                    )
                };
                return(
                    <div>
                        {item()}
                    </div>
                )
            },
        }, {
            title: 'Properties',
            dataIndex: 'properties',
            key: 'properties',
            align: 'center',
            render: record => (
                <div>
                    <Button type="primary" onClick={this.showModal.bind(this, record)}>Show</Button>
                </div>
            )
        }];
    }

    componentDidMount() {
        getTableData().then( value => {
            this.setState({
                loading: false,
                data: value.apis
            });
        });
    }

    //显示模块框
    showModal(e) {
        this.setState({
            visible: true,
            tableData: e
        });
    }
    _handleCancel() {
        this.setState({visible: false});
    }

    render() {
        return(
            <div>
                <Table
                    rowKey={record => record.name}
                    dataSource={this.state.data}
                    columns={this.columns}
                    bordered
                    pagination={false}
                    loading={this.state.loading}
                />
                <Properties
                    tableData={this.state.tableData}
                    visible={this.state.visible}
                    handleCancel={this._handleCancel.bind(this)}
                />
            </div>
        )
    }
}

export default TableList;