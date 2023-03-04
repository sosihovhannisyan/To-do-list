import { useEffect, useState, useContext } from 'react'
import { db } from '../../firebase-config'
import { collection,deleteDoc, doc, getDocs } from "firebase/firestore"
import styles from './style.module.css'
import { convert } from '../../lib/convert'
import { Link, useNavigate } from "react-router-dom"
import { ActiveContext } from "../../ActiveContext"

const ItemList = () => {
    const [items, setItems] = useState([])
    const itemList = collection(db, "items")
    const {isActive, setActive} = useContext(ActiveContext);
    const [done, setDone] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const deleteUser = async id => {
        setIsLoading(true)
        let item = await doc(db, "items", id)
        await deleteDoc(item)
        setItems(items.filter(elm => id !== elm.id))
        setIsLoading(false)
    }

    const loadItems = async () => {
        setIsLoading(true)
        let data = await getDocs(itemList)
        setItems(data.docs.map(
            elm => ({ ...elm.data(), id: elm.id })
        ))
        setIsLoading(false)
    }

    const onComplete = elm => {
        elm.done = true
        elm.timeCompleted = Date.now()
        setItems([...items])
    }

    const onCancel = elm => {
        elm.done = false
        elm.timeCompleted = null
        setItems([...items])
    }

    useEffect(() => {
        loadItems()
    }, [])

    useEffect(() => {
        setDone(items.filter(a => a.done))
    }, [items])


    return (
        <div className={styles.container}>
            <h1 className={isActive ? styles.title : styles.title_night}>To do - {items.length }</h1>
            <div><Link className={isActive ? styles.add : styles.add_night} to="/add">Add to do</Link></div>

            {isLoading
                ?
                <h2 className={isActive ? styles.loading : styles.loading_night}>Loading...</h2>
                :
                <div className={isActive ? styles.list : styles.list_night} >
                    <div>
                        <button className={styles.btn} onClick={() => setActive(true)}>light</button>
                        <button className={styles.btn} onClick={() => setActive(false)}>night</button>
                    </div>
                    <div className={styles.parent}>
                        {
                            items.map(elm =>
                                    <div className={elm.done ? styles.completed : styles.task}>
                                    <h3>{elm.name}</h3>
                                    <h4>{elm.list}</h4>

                                        {
                                            elm.timeCompleted &&
                                            <p>completed on <b>{convert(elm.timeCompleted)}</b></p>
                                        }
                                        {
                                            !elm.done
                                                ? <button onClick={() => onComplete(elm)}>Complete</button>
                                                : <button onClick={() => onCancel(elm)}>Cancel</button>
                                        }
                                        <button onClick={() => deleteUser(elm.id)}>Delete</button>
                                        <button onClick={() => navigate("/item/edit/" + elm.id)}>Edit</button>
                                    </div>
                            )
                        }
                    </div>
                    {items.length > 0 && <h3>{done.length}/{items.length}</h3>}
                </div>} 
        </div>
    )
}
export default ItemList;