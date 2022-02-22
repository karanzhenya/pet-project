import React from 'react';
import s from "../PacksList.module.css";
import MyButton from "../../common/Button/MyButton";

const ConfigurationPanel = () => {
    return (
        <div className={s.leftPart}>
            Show packs cards
            <div className={s.buttonContainer}><MyButton>My</MyButton><MyButton>All</MyButton></div>
            Number of cards
            <input type={"range"}/>
        </div>
    );
}

export default ConfigurationPanel;