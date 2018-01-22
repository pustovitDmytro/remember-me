import React from 'react';
import { Input, Select } from 'antd';
const { Option } = Select;

const selectBefore
 = <Select defaultValue="http://" style={{ width: 90 }}>
     <Option value="http://">http://</Option>
     <Option value="https://">https://</Option>
 </Select>
;
const CustomInput = <Input addonBefore="http://" defaultValue="filtered value" />

export default CustomInput;