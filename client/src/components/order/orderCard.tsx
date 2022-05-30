import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export function OrderCard() {
    return (
        <Card sx={{ maxWidth: 345, marginTop: 5, }}>
            <Typography>
                OrderNummer
            </Typography>
            <Typography>
                Bild på produkten eller bara i text vilken produkt som behövs?!
            </Typography>
            <Typography>
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