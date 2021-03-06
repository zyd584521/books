import React, { Component } from 'react'
import { getCategory,deleteCategoryHandler } from "@api";
import { withRouter } from 'react-router-dom';
import { Table,Form, Input,Row,Col, Select,Icon, Button ,Modal,message} from 'antd';
import { TableWarp } from "./styled";

const FormItem = Form.Item;
const { Option } = Select;
const {confirm} = Modal

@withRouter
@Form.create()
class Category extends Component {
  constructor(){
    super()
    this.state = {
      table:{},
      parameter:{},
      loading:true
    }
  }
  componentDidMount(){
    this.updateTable(1)
  }
  updateTable=async (_page=1,_limit=5)=>{
    this.setState({
        loading:true
    })
    const {parameter} = this.state
    let params = {
      _page,
      _limit,
      ...parameter
    }
    const count = await getCategory({...parameter})
    getCategory(params).then(res=>{
        this.setState({
          table:{
            dataSource:res,
            count:count.length,
            current:_page
          },
          loading:false
        })
    })
  }
  deleteHandler = (record)=>{
    const {table:{current}} = this.state
    confirm({
      title: '警告',
      content: '确定是否删除',
      okText:"确认",
      cancelText:"取消",
      onOk:()=>{
        deleteCategoryHandler(record.id).then(v=>{
          this.updateTable(current)
          message.success('删除成功')
        })
      },
    });
  }
  modificationHandler = (record)=>{
    this.props.history.push(`/category/detail/${record.id}`)
  }
  setColumns = ()=>{
    return [
      {
        title: '图书类别编码',
        dataIndex: 'typeNumber',
        key: 'typeNumber',
        width: 800,
      },
      {
        title: '图书类别名称',
        dataIndex: 'typeName',
        key: 'typeName',
        width: 800,
      },
      {
        title: '图书类别标识',
        dataIndex: 'signboard',
        key: 'signboard',
        width: 800
      },
      {
        title: '图书类别扩展',
        dataIndex: 'typeExtend',
        key: 'typeExtend',
        width: 800
      },
      {
        title: '年级',
        dataIndex: 'grade',
        key: 'grade',
        width: 800
      },
      {
        width: 100,
        title: '修改',
        key: 'modification',
        render: (text,record) => <span className='fixedSpan' onClick={()=>this.modificationHandler(record)}>修改</span>,
        fixed: 'right',
      },
      {
        width: 100,
        title: '删除',
        key: 'delete',
        render: (text,record) => <span className='fixedSpan' onClick={()=>this.deleteHandler(record)}>删除</span>,
        fixed: 'right',
      }
    ];
  }
  handleTableChange = (page, pageSize) => {
    this.updateTable(page);
  };
  onSubmit = ()=>{
    this.props.form.validateFields((err,value)=>{
      if(err){
        return
      }
      let parameter = {}
      if(value.type==='grade'){
        parameter['q'] =  value.value
      }else{
        parameter[value.type] = value.value
      }
      this.setState({
        parameter
      },()=>{
        this.updateTable()
      })
    })
  }
  clearSearchValues = ()=>{
    this.props.form.resetFields()
  }
  goAddBookType = ()=>{
    this.props.history.push('/category/detail')
  }
  onFocus = ()=>{
    if(!this.props.form.getFieldValue('type')){
      message.warning('请先选择查询条件')
      return
    }
  }
  render() {
    const {table,loading} = this.state
    const {
      form: { getFieldDecorator }
    } = this.props
    const gradeArr = ['一年级','二年级','三年级','四年级','五年级','六年级','初一','初二','初三','高一','高二','高三']
    const type = [
      {
        dicCode:'typeNumber',
        dicName:'图书类别编码'
      },
      {
        dicCode:'typeName',
        dicName:'图书类别名称'
      },
      {
        dicCode:'signboard',
        dicName:'图书类别标识'
      },
      {
        dicCode:'typeExtend',
        dicName:'图书类别扩展'
      },
      {
        dicCode:'grade',
        dicName:'年级'
      }
    ]
    return (
      <TableWarp>
        <Form labelAlign='left'>
          <Row>
            <Col span={6} >
              <FormItem label='条件' {...{labelCol:{span:4},wrapperCol:{span:20}}}>
                {
                  getFieldDecorator(
                    'type'
                  )(
                    <Select
                      placeholder='-请选择-'
                      suffixIcon={
                        <Icon type="caret-down" style={{ transform: 'scale(0.7)' }} />
                      }
                      allowClear={true}
                      style={{ width: '100%' }}
                      notFoundContent='没有找到数据'
                    >
                      {type.map(v => (
                        <Option value={v.dicCode} key={v.dicCode}>{v.dicName}</Option>
                      ))}
                    </Select>

                  )
                }
              </FormItem>
            </Col>
            <Col span={6} style={{paddingLeft:8}}>
              <FormItem >
              {
                getFieldDecorator(
                  'value'
                )(
                  this.props.form.getFieldValue('type')==='grade'?
                  <Select placeholder='请选择查询条件'>
                      {
                        gradeArr.map(v=>(
                          <Option key={v} value={v}>
                            {v}
                          </Option>
                        ))
                      }
                  </Select>
                  :
                  <Input placeholder='请输入查询条件' onFocus={this.onFocus}/>
                )
              }
            </FormItem>
            </Col>
            <Col span={12}>
              <Button type="primary" onClick={this.onSubmit} style={{marginRight:5}}>
                查询
              </Button>
              <Button type="danger" onClick={this.clearSearchValues} style={{marginRight:5}}>
                重置信息
              </Button>
              <Button type="primary" style={{marginTop:5}} onClick={this.goAddBookType}>
                添加图书类别
              </Button>
            </Col>
          </Row>
        </Form>
        <Table
            rowKey={record => record.id}
            columns={this.setColumns()}
            className="menuListTable"
            loading={loading}
            dataSource={table.dataSource}
            pagination={{
              total: table.count,
              pageSize:5,
              onChange: this.handleTableChange,
              current:table.current
            }}
            scroll={{ x:1000  }}
          />
      </TableWarp>
    )
  }
}

export default Category
