import React, {useState, useRef, useEffect, Children} from 'react'
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Checkbox,
  // Cascader,
  TimePicker,
  DatePicker,
  InputNumber,
  Upload,
  // TreeSelect,
  Switch,
  Slider,
  AutoComplete,
  Row,
  Col,
} from 'antd'
import {InboxOutlined, UploadOutlined} from '@ant-design/icons'
import {ButtonGroupData, SFormProps} from './inter'
import {FormInstance} from 'antd/lib/form'
// const [fileList, setFileList] = useState([''])

export const FromItem = ({item}: {item: any}) => {
  const {
    render,
    name,
    label,
    rules,
    type,
    options,
    data,
    defaultValue,
    onChange,
    onSelect,
    children,
    formItemOptions,
  } = item
  let html: any
  //console.log('item', item, options)
  switch (type) {
    case 'Input' || 'Input.Text':
      html = <Input {...options} defaultValue={defaultValue} />
      break
    case 'Input.TextArea':
      html = <Input.TextArea {...options} defaultValue={defaultValue} />
      break
    case 'Input.Password':
      html = <Input.Password {...options} defaultValue={defaultValue} />
      break
    case 'InputNumber':
      html = <InputNumber {...options} defaultValue={defaultValue} />
      break
    case 'Input.Search':
      html = <Input.Search {...options} defaultValue={defaultValue} />
      break
    case 'Slider':
      html = <Slider {...options} defaultValue={defaultValue} />
      break
    case 'Radio':
      html = (
        <Radio {...options} defaultChecked={defaultValue} onChange={onChange}>
          {data}
        </Radio>
      )
      break
    case 'Checkbox':
      html = (
        <Checkbox {...options} defaultChecked={defaultValue} onChange={onChange}>
          {data}
        </Checkbox>
      )
      break
    case 'Checkbox.Group':
      html = options.span ? (
        <Checkbox.Group {...options}>
          <Row>
            {data &&
              data.map((item: {value: any; label: React.ReactNode}, index: number) => (
                <Col key={index} span={options.span}>
                  <Checkbox value={item.value}>{item.label}</Checkbox>
                </Col>
              ))}
          </Row>
        </Checkbox.Group>
      ) : (
        <Checkbox.Group {...options} options={data} defaultValue={defaultValue} onChange={onChange}></Checkbox.Group>
      )
      break
    case 'Radio.Group':
      html = options.span ? (
        <Radio.Group {...options}>
          <Row>
            {data &&
              data.map((item: {value: any; label: React.ReactNode}, index: number) => (
                <Col key={index} span={options.span}>
                  <Radio value={item.value}>{item.label}</Radio>
                </Col>
              ))}
          </Row>
        </Radio.Group>
      ) : (
        <Radio.Group {...options} options={data} defaultValue={defaultValue} onChange={onChange}></Radio.Group>
      )
      break
    case 'Select':
      html = <Select {...options} options={data} onChange={onChange} onSelect={onSelect}></Select>
      break
    case 'Switch':
      html = <Switch {...options} onChange={onChange}></Switch>
      break
    case 'Upload':
      html = (
        <Upload name={name} action="https://www.mocky.io/v2/5cc8019d300000980a055e76" listType="picture" {...options}>
          {children || (
            <Button>
              <UploadOutlined /> Upload
            </Button>
          )}
        </Upload>
      )
      break
    case 'AutoComplete':
      html = <AutoComplete {...options} options={data} onChange={onChange} onSelect={onSelect} />
      break
    case 'Upload.Dragger':
      html = (
        <Upload.Dragger name={name} listType="picture" {...options}>
          {children || (
            <>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">Support for a single or bulk upload.</p>
            </>
          )}
        </Upload.Dragger>
      )
      break
    case 'TimePicker':
      html = <TimePicker {...options} onChange={onChange} />
      break
    case 'DatePicker':
      console.log('datepicker', options)
      html = <DatePicker {...options} onChange={onChange} />
      break
    case 'RangePicker':
      html = <DatePicker.RangePicker {...options} onChange={onChange} />
      break
    case 'RangeTimePicker':
      html = <TimePicker.RangePicker {...options} onChange={onChange} />
      break
    // case 'TreeSelect':
    //   return <TreeSelect {...options}></TreeSelect>
    case 'Button':
      if (data && Array.isArray(data)) {
        html = (
          <div className="from-btn-group">
            {data.map((condition: ButtonGroupData) => (
              <div style={{display: 'inline-block', marginRight: '12px'}} key={condition.value}>
                <Button type="primary" {...condition.options} onClick={condition.onClick} htmlType={condition.htmlType}>
                  {condition.label}
                </Button>
              </div>
            ))}
          </div>
        )
      }
      break
    case 'render':
      if (options && options.disFormItem) {
        return typeof render === 'function' ? render() : render
      }
      html = typeof render === 'function' ? render() : render
      break
    default:
      html = (
        <span {...options} className="ant-form-text">
          {data}
        </span>
      )
      break
  }
  return (
    <Form.Item key={name} label={label} name={name} rules={rules} className={'s-form-item'} {...formItemOptions}>
      {html}
    </Form.Item>
  )
}
const layout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
}
const SForm = (props: SFormProps) => {
  let formRef: React.RefObject<FormInstance> = React.createRef()
  props.dataRef && (formRef = props.dataRef)
  useEffect(() => {
    if (props.initialValues && Object.keys(props.initialValues).length > 0) {
      formRef.current?.setFieldsValue({...props.initialValues})
    } else {
      formRef.current?.resetFields()
    }
  }, [props.initialValues])
  return (
    <>
      <Form ref={formRef} {...layout} className="s-form" {...props} {...props.options}>
        {props.items.map((item, index) => (
          <FromItem key={item.name || index} item={item} />
        ))}
      </Form>
    </>
  )
}
export default SForm
