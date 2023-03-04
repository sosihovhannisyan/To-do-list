import { doc, getDoc, updateDoc } from "firebase/firestore"
import { useState, useEffect, useContext } from "react"
import { db } from "../../firebase-config"
import styles from ".././AddItem/style.module.css"
import { useNavigate, useParams } from "react-router-dom"
import { ActiveContext } from "../../ActiveContext"

const EditItem = () => {
    const { id } = useParams()
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const { isActive, setActive } = useContext(ActiveContext);

    const getItem = async () => {
        let itm = doc(db, "items", id)
        let info = await getDoc(itm)
        setData(info.data())
    }

    const handleSubmit = async e => {
        e.preventDefault()
        let docRef = doc(db, "items", id)
        await updateDoc(docRef, data)
        navigate("/")
    }

    useEffect(() => {
        getItem()
    }, [])

    return (
        <div className={styles.container1}>
            <h1 className={isActive ? styles.title1 : styles.title1_night}>Edit to do</h1>
            {
                !data
                    ?
                    <h2 className={isActive ? styles.loading1 : styles.loading1_night}>Loading...</h2>
                    :
                    <form className={isActive ? styles.form : styles.form_night} onSubmit={handleSubmit}>

                        <label className={isActive ? styles.label : styles.label_night}>name</label>
                        <input
                            className={isActive ? styles.input : styles.input_night}
                            type="text"
                            value={data.name}
                            onChange={e => setData({ ...data, name: e.target.value })}
                        />
                        <label className={isActive ? styles.label : styles.label_night}>description</label>
                        <input
                            className={isActive ? styles.input : styles.input_night}
                            type="text"
                            value={data.list}
                            onChange={e => setData({ ...data, list: e.target.value })}
                        />
                        <div>
                            {
                                isLoading
                                    ?
                                    <p className={isActive ? styles.loading1_night : styles.loading1}>Loading..0000.</p>
                                    :
                                    <button className={isActive ? styles.save_update : styles.save_update_night}>Update</button>
                            }
                        </div>
                    </form>
            }
        </div>
    )
}
export default EditItem
