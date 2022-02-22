import React from 'react';
import MyButton from "../common/Button/MyButton";
import MyInput from "../common/Input/MyInput";
import MyCheckbox from "../common/Checkbox/MyCheckbox";

const Common = () => {
    return (
        <div>
            <MyButton red disabled={true}>button</MyButton>
            <MyInput error={'error'}/>
            <MyCheckbox/>
        </div>
    );
}

export default Common;