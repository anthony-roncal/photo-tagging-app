import { React, useState } from "react";
import styles from "../styles/Modal.module.css";

const Modal = ({ setShowModal, time, saveScore }) => {
    const [name, setName] = useState('');

    const handleInput = (e) => {
        setName(e.target.value);
    };

    const handleSave = () => {
        saveScore(name);
        setShowModal(false);
    }

    return (
        <>
            <div className={styles.darkBG} onClick={() => setShowModal(false)} />
            <div className={styles.modal}>
                <div className={styles.modalHeader}>
                    <h5 className={styles.heading}>Completed in {time}!</h5>
                </div>
                <div className={styles.modalContent}>
                    <label for="name">Enter your name to save your time!</label>
                    <input type='text' id='name' onChange={handleInput}/>
                </div>
                <div className={styles.modalActions}>
                    <div className={styles.actionsContainer}>
                        <button className={styles.saveBtn} onClick={handleSave}>
                            Save
                        </button>
                        <button className={styles.cancelBtn} onClick={() => setShowModal(false)}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;