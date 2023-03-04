import { db } from '../../firebase-config'
import { addDoc, collection } from 'firebase/firestore'
import styles from './style.module.css'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ActiveContext } from "../../ActiveContext"

const AddItem = () => {
    const itemList = collection(db, "items")
    const [text, setText] = useState({ name: "", list: "" })
    const navigate = useNavigate()
    const { isActive, setActive } = useContext(ActiveContext);

    const handleSubmit = async e => {
        e.preventDefault()
        await addDoc(itemList, text)
        setText({ name: "", list: "" })
        navigate("/")
    }

    return (
        <div className={styles.container1}>
            <h1 className={isActive ? styles.title1 : styles.title1_night}>Add to do</h1>
            <form onSubmit={handleSubmit} className={isActive ? styles.form : styles.form_night}>
                <label className={isActive ? styles.label : styles.label_night}>name</label>
                <input
                    className={isActive ? styles.input : styles.input_night}
                    type="text"
                    value={text.name}
                    onChange={e => setText({ ...text, name: e.target.value })}
                />
                <label className={isActive ? styles.label : styles.label_night}>description</label>
                <input
                    className={isActive ? styles.input : styles.input_night}
                    type="text"
                    value={text.list}
                    onChange={e => setText({ ...text, list: e.target.value })}
                />
                <button className={isActive ? styles.save_update : styles.save_update_night}>save</button>
            </form>
        </div>
    )
}
export default AddItem