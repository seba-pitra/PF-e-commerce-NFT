import { useEffect,useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as actions from "../../../../redux/actions"


export default function UserCollectionsSelector({user, styles, selectCollection}) {
    const dispatch = useDispatch();
    const [checked,setChecked] = useState(false);
    const shouldUpdate = useSelector(state => state.shouldUpdate)


    useEffect(()=> {
        dispatch(actions.logInUser(user.id))
    }, [shouldUpdate])
    useEffect(()=> {
        console.log('asddsaasdads')
    }, [checked])
    const userCollectionsChecks = user.collections?.map((collection) => (
        <div className={styles["created-collections"]}>
        <label htmlFor={collection.id}>
            <b>{collection.name}</b>
        </label>
        <input
            type="checkbox"
            value={collection.id}
            checked={checked}
            onClick={(e) => {
                selectCollection(e);
                setChecked(!checked)
            }}
            className={styles["option-btn btn-filter"]}
            // className="option-btn btn-filter" SE VA A ROMPER CUANDO FUNCIONE EL CREATE. ES DE OTRO ARCHIVO
            />
        </div>
    ))

    return (
        <>
            {userCollectionsChecks}
        </>
    )
}