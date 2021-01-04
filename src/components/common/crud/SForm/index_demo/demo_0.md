
---
type: demo
index: 0
title: Form组件展示
documentation: 
---

``` jsx
import { SForm } from '@emp-antd/base/components/common/crud'
<SForm
  name={name}
  form={testForm}
  onFinish={(form: any) => {
    message.success(form)
  }}
  layout={'horizontal'}
  initialValues={{
    Input: '输入的默认值',
    AutoComplete: '选项3',
    multipleSelect: '2',
    InputNumber: 18
  }}
  items={[
    {
      type: 'Input',
      label: '输入框',
      name: 'Input',
      options: {
        placeholder: '输入框',
      },
      rules: [{required: true, message: '输入不能为空'}], // rules
    },
    {
      type: 'AutoComplete',
      label: '自动完成框',
      name: 'AutoComplete',
      options: {
        placeholder: '自动完成框',
      },
      data: [
        {
          value: '1',
          label: '选项1',
        },
        {
          value: '2',
          label: '选项2',
        },
      ],
    },
    {
      type: 'Select',
      label: 'Select选择框',
      name: 'multipleSelect',
      options: {
        mode: 'multiple',
        placeholder: '多选Select选择框',
      },
      rules: [{required: true, message: '选择不能为空'}], // rules
      data: [
        {
          value: '1',
          label: '选项1',
        },
        {
          value: '2',
          label: '选项2',
        },
      ],
    },
    {
      type: 'InputNumber',
      label: '数字输入框',
      name: 'InputNumber',
      options: {
        placeholder: '数字输入框',
        style: {
          width: '200px',
        },
      },
      rules: [
        {required: true, message: 'ruleRequired'},
        {type: 'integer', max: 30, min: 0, message: 'ruleMax'}
      ]
    },
    {
      type: 'Button',
      label: '',
      name: 'Button',
      options: {
        disFormItem: true,
      },
      data: [
        {
          htmlType: 'submit',
          value: 0,
          label: '提交',
          options: {
            style: {
              width: '100px',
              marginLeft: '200px',
            },
          },
        },
        {
          value: 1,
          label: '取消',
          options: {
            style: {
              width: '100px',
              marginLeft: '200px',
            },
            type: 'default',
          },
        },
      ],
    },
  ]}
/>

```
