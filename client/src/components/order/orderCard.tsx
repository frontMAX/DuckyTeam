import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { Order } from '@shared/types';
import { useParams } from 'react-router-dom';
import { useOrder } from '../../contexts/Order/orderContext';
// import { getOrders } from '../../../../backend/resources/order/order.controller';

export function OrderCard() {

    //sälva contexten, typ "usecontext"
    const { orders, fetchOrder } = useOrder();

    const { id } = useParams()

    const order = orders.find(
        (item: Order) => item.id.toString() === id
    )
    // funktionen som hämtar ordrar i context
    React.useEffect(() => {
        if (id) {
            console.log('jklajknsdh',)
            fetchOrder(id)
        }
    }, [fetchOrder, id]);

    return (

        // <Card sx={{ maxWidth: 345, marginTop: 5, }}>
        //fast order då, verkar inte finnas ett corresponding interface med allt som behövs
        <Card key={order?.id} sx={{ borderRadius: '1rem', padding: '1rem' }}>
            {/* "orders.map yada yada, key: order.id, key: order.name, yada yada" */}
            <Typography>
                {order?.orderNumber}
                OrderNummer
            </Typography>
            <Typography>
                Bild på produkten eller bara i text vilken produkt som behövs?!
            </Typography>
            <Typography>
                {order?.createdAt}
                Vilket datum den skapades ?
            </Typography>
            <Typography>
                Användaren
            </Typography>
            <Typography>
                Leverans
            </Typography>

            <CardContent>
                <Typography gutterBottom variant="h5" component="div">

                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}