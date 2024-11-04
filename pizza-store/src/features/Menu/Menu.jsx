import { useLoaderData } from 'react-router-dom';
import { getMenu} from '../../services/apiRestaurant';
import  MenuItem from '../../features/Menu/MenuItem';

function Menu() {
  const menu = useLoaderData();
  console.log(menu);
  return (<ul>
    {menu.map(menuItem => <MenuItem key={menuItem.id} pizza={menuItem} />)}
  </ul>);
}


export async function loader() {

  const menu = await getMenu();
  return menu;
}

export default Menu;
