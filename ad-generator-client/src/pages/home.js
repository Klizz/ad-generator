import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import NumberFormat from 'react-number-format';

function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;
    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            thousandSeparator
            isNumericString
            prefix="$"
            onValueChange={(data) => {
                onChange({
                    target: {
                        name: props.name,
                        value: data.value,
                    },
                });
            }}
        />
    );
}

const useStyles = makeStyles({
    root: {
        marginTop: 50,
        marginBottom: 50,
        padding: 30
    }
});

const Home = () => {
    const [data, setData] = useState({
        price: '',
        description: ''
    })

    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState(null)

    const handleSubmit = (event) => {
        setLoading(true)
        event.preventDefault()
        axios.post('http://localhost:5000/new', data, { responseType: 'blob' })
            .then(res => {
                setImage(URL.createObjectURL(res.data))
                setLoading(false)
            })
    }

    const handlePriceInputChange = (event) => {
        setData((data) => ({
            ...data,
            price: event.target.value,
        }));
    };

    const handleDescriptionInputChange = (event) => {
        event.persist();
        setData((data) => ({
            ...data,
            description: event.target.value,
        }));
    };

    const classes = useStyles();

    return (
        <div className="App">
            <Grid container justify="center">
                <Grid item xs={12} sm={10}>
                    <form
                        onSubmit={handleSubmit}
                        noValidate autoComplete="off"
                    >
                        <Card className={classes.root}>
                            <CardContent>
                                <h1 className="title">Crear anuncio en seminuevos.com</h1>
                                <TextField
                                    id="outlined-basic"
                                    label="Precio"
                                    variant="outlined"
                                    name="price"
                                    value={data.price}
                                    onChange={handlePriceInputChange}
                                    InputProps={{
                                        inputComponent: NumberFormatCustom,
                                    }}

                                />
                                <br /><br />
                                <TextField
                                    id="outlined-multiline-flexible"
                                    type="text"
                                    label="Descripcion"
                                    rows={4}
                                    multiline
                                    variant="outlined"
                                    name="description"
                                    value={data.description}
                                    onChange={handleDescriptionInputChange}
                                /><br /><br />
                                {loading ?
                                    <div>
                                        <p>Esto puede tardar unos minutos</p><br />
                                        <CircularProgress />
                                    </div>
                                    : null}
                                {!loading ? <Button variant="contained" color="primary" type="submit">
                                    Publicar
                                </Button>
                                    : null}
                                <br /><br />
                                <img src={image} width="100%" alt="" />
                            </CardContent>
                        </Card>
                    </form>
                </Grid>
            </Grid>
        </div>
    );
}

export default Home;