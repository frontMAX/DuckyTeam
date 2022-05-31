import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Order } from '@shared/types';
import { useParams } from 'react-router-dom';
import { useOrder } from '../../contexts/Order/orderContext';
import { useEffect } from 'react';
import { Box } from '@mui/material';

// import { getOrders } from '../../../../backend/resources/order/order.controller';

export function OrderCard({ rder }: any) {

    //sälva contexten, typ "usecontext"
    const { orders, fetchOrder, fetchOrders } = useOrder();

    const { id } = useParams()

    const order = orders.find(
        (item: Order) => item.id.toString() === id
    )




    // funktionen som hämtar en order i context
    useEffect(() => {

        if (id) {
            fetchOrder(id)
        }
    }, [fetchOrder, id]);


    if (!id) {

        return <div>...blehh</div>
    }
    return (

        // <Card sx={{ maxWidth: 345, marginTop: 5, }}>
        //fast order då, verkar inte finnas ett corresponding interface med allt som behövs
        <Box>
            {order && (
                // key={order?.id}
                <Card sx={{ borderRadius: '1rem', padding: '1rem' }}>

                    {/* "orders.map yada yada, key: order.id, key: order.name, yada yada" */}



                    <><Typography>
                        {order.orderNumber}
                    </Typography>
                        <Typography>

                        </Typography>
                        <Typography>
                            {order.orderNumber}
                            Vilket datum den skapades ?
                        </Typography><Typography>
                            Användaren
                        </Typography><Typography>
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
                        </CardActions></>

                </Card>
            )}
        </Box>

    );
}