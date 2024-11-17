import { useDispatch } from "react-redux";
import Button from "../../UI/Button";
import { deleteItem } from "./CartSlice";

function DeleteItem({pizzaId}) {
    const dispatch  = useDispatch();
    return (
        <Button type="small" onClick={() => dispatch(deleteItem(pizzaId))}>Delete</Button>
    )
}

export default DeleteItem;
