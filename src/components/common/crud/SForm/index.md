## API

### SForm参数

|           参数 |                             说明 |                          类型 | 是否必须 |
| -------------: | -------------------------------: | ----------------------------: | -------: |
|        dataRef |                          dataRef | React.RefObject<FormInstance> |       否 |
|        options |                         可选配置 |                     FormProps |       否 |
|       onFinish | 提交表单且数据验证成功后回调事件 |                      Function |       否 |
| onFinishFailed | 提交表单且数据验证失败后回调事件 |                      Function |       否 |
|          items |                    formItems数组 |               FormItemProps[] |       是 |
|其他    | 请参考[antd form](https://ant.design/components/form-cn/)

### Form参数 参考antd 文档 Form参数

### FormItem参数

|        参数 |                                             说明 |                类型 | 是否必须 |
| ----------: | -----------------------------------------------: | ------------------: | -------: |
|        type |                                             类型 |              string |       是 |
|       label |                                     展示的标签名 |              string |       是 |
|        name |                                           字段名 |              string |       否 |
|       rules |                     校验规则，设置字段的校验逻辑 |              Rule[] |       否 |
|      render | 需要自定义item时候或者元素不需要参与formItem时候 |                 any |       否 |
| placeholder |                                      placeholder |              string |       否 |
|         col |                                         布局宽度 |              number |       否 |
|     options | 需要自定义item时候或者元素不需要参与formItem时候 | FormItemOptionsType |       否 |
|        data |                               对应种类Item的data |                 any |       否 |
|    onChange |                               对应的onChange事件 |            Function |       否 |
|    onSelect |                       对应的Select的onSelect事件 |            Function |       否 |
|     onClick |                            对应Item的onClick事件 |            Function |       否 |

### FormItemOptionsType 目前支持

|                参数 |                                             说明 |
| ------------------: | -----------------------------------------------: |
|     RadioGroupProps |                             antd RadioGroupProps |
|          InputProps |                                  antd InputProps |
|          GroupProps |                      antd Input组件的 GroupProps |
|         SearchProps |                     antd Input组件的 SearchProps |
|       TextAreaProps |                   antd Input组件的 TextAreaProps |
|       PasswordProps |                   antd Input组件的 PasswordProps |
| selectMultipleProps |            antd Select组件的 selectMultipleProps |
|     DatePickerProps |            antd DatePicker组件的 DatePickerProps |
|     TimePickerProps |            antd TimePicker组件的 TimePickerProps |
|         UploadProps |     antd Upload组件的 TimePicUploadPropskerProps |
|         SliderProps |                    antd Slider组件的 SliderProps |
|    InputNumberProps |          antd InputNumber组件的 InputNumberProps |
|         SelectProps |                    antd Select组件的 SelectProps |
|   AutoCompleteProps |       antd AutoComplete 组件的 AutoCompleteProps |
|          renderForm | 仅仅render 使用disFormItem来判断是否是form的Item |
|            textForm |                                     仅仅展现text |
