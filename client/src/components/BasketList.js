import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { ListGroup, Row } from "react-bootstrap";
import { Context } from "..";
import DeviceItem from "./DeviceItem";

const BasketList = observer(() => {
    const {basket} = useContext(Context)
    //const {device} = useContext(Context)

//  "корзина пуста" или товары корзины. +/- (удалить)
// оформить заказ

    return (
        <Row className="d-flex">
            {basket.basket_devices.map(basketItem =>
                <ListGroup.Item 
                    style={{cursor: 'pointer'}}
                    key={basketItem.id}
                >
                    <Row style={{padding: 10}}>
                        {basketItem.id}: Количество {basketItem.quantity} 
                    </Row>  
                </ListGroup.Item>   
            )}
        </Row>
    );
});

export default BasketList;