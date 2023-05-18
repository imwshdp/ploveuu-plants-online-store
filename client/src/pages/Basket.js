import React, { useContext, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import BasketList from '../components/BasketList';
import Pages from '../components/Pages';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { fetchBasketDevices } from '../http/basketAPI';

const Basket = observer(() => {
    const {basket} = useContext(Context)
    //const {user} = useContext(Context);

    // useEffect(() => {
    //     fetchBasketDevices(basket.baskets.id).then(data => basket.setDevices(data.rows))
    // }, [basket.baskets])

    return (
        <Container>
            <BasketList/>
        </Container>
    );
});

export default Basket;