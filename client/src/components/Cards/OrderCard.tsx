import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link, useParams } from 'react-router-dom';
import { useOrder } from '../../contexts/Order/orderContext';
import { useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { Order } from '@shared/types';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export function OrderCard() {
    const { id } = useParams();
    //sälva contexten, typ "usecontext"
    const { orders, fetchOrder } = useOrder();

    const order = orders.find(
        (item: Order) => item.id.toString() === id
    )

    // funktionen som hämtar en order i context
    useEffect(() => {
        if (id) {
            fetchOrder(id)
        }
    }, [fetchOrder, id]);

    return (
        <Container>
            <Link to="/admin">
                <Button startIcon={<ArrowBackIcon />}>Tillbaka till adminsidan</Button>
            </Link>
            {order && (
                <Card sx={{ borderRadius: '1rem', padding: '1rem' }}>
                    <Typography>
                        Order number:  {order.orderNumber}
                    </Typography>

                    <Typography>
                        Order date:  {order.createdAt}
                    </Typography>

                    <Typography>
                        Customer:  <Link to={`/user/${id}`}>{order.user}</Link>
                    </Typography>

                    <Typography>
                        Products ordered:
                        {/* loop with table? */}
                        {order.products}

                    </Typography>


                    <Typography>
                        Shipping adress: {order.shipping}
                    </Typography>

                    <Typography>
                        Delivery method: {order.delivery}
                    </Typography>


                </Card>
            )}
        </ Container>

    );
}