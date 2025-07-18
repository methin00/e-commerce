import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDrawer } from '../redux/slices/appSlice';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import "../css/drawer.css"
import { removeFromBasket, setSubTotal } from '../redux/slices/basketSlice';
import { useNavigate } from 'react-router-dom';

export default function TemporaryDrawer() {
    const { drawerOpen } = useSelector(store => store.app)
    const dispatch = useDispatch()
    const { productsIn, subTotal } = useSelector(store => store.basket)

    const removeItem = (item) => {
        dispatch(removeFromBasket(item))
    }
    const navigate =useNavigate()

    const calcPrice = () => {
        let temptotal = 0;
        productsIn.forEach((item) => { temptotal = temptotal + item.count * item.price })
        console.log(temptotal)
        return temptotal
    }
    React.useEffect(() => {
        dispatch(setSubTotal(calcPrice()));
    }, [productsIn]);

    const DrawerList = (
        <Box sx={{ width: 350 }} role="presentation" className="boxFlex">
            <List>
                {productsIn.length > 0 ? (
                    productsIn.map((item) => (
                        <ListItem key={item.id} disablePadding>
                            <ListItemButton style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                <div>
                                    <ListItemText onClick={() => { navigate("/product-details/" + item.id);  dispatch(toggleDrawer(false))}} primary={item.title} secondary="Fiyat:" />
                                    <ListItemText onClick={() => { navigate("/product-details/" + item.id);  dispatch(toggleDrawer(false))}} primary={`${item.price}TL`} />
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                                    <img src={item.image} style={{ width: "64px", height: "64px" }} onClick={() => { navigate("/product-details/" + item.id);  dispatch(toggleDrawer(false))}} />
                                    <ListItemText primary={`${item.count} adet`} onClick={() => { navigate("/product-details/" + item.id);  dispatch(toggleDrawer(false))}} />
                                    <DeleteForeverIcon className='iconDelete' onClick={() => removeItem(item)} />
                                </div>
                            </ListItemButton>
                        </ListItem>
                    ))
                ) : (
                    <ListItem>
                        <ListItemText primary="Sepetiniz boş." />
                    </ListItem>
                )}
            </List>
            <div>
                <Divider />
                <ListItemText primary={`Sepet Tutarı: ${subTotal}TL`} className='subTotalFlex'></ListItemText>
            </div>
        </Box>
    );

    return (
        <div >
            {
                drawerOpen == true &&
                <Drawer open={drawerOpen} anchor="right" onClose={() => { dispatch(toggleDrawer(false)) }} >
                    {DrawerList}
                </Drawer>
            }
        </div>
    );
}