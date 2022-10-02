import React, {useState, useEffect} from 'react';

const Goal = () => {

    //Keep temporary data for API
    const [datas, setDatas] = useState([]);

    const fetchData = async () => {
        try {
            const response = await GoalFinder.get("/")
            console.log(response.data.length);
            if(response.data.length !==0 ){
                for(let i=0;i<response.data.length;i++){
                    setDatas(data => [...data, response.data[i]])
                }
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {

        fetchData();
    
    },[])

    return(
        <>
        <Grid container rowSpacing={1} sx={{mt:2}}>
            {datas && datas.map((data) => (
                <Grid item xs={12} key={data.id}>
                <Card  sx={{ display: 'flex' }}>
                    <CardMedia
                        component="img"
                        height="200"
                        image="goal-image2.jpg"
                        alt="property-image"
                        sx={{ width: 300 }}
                    />
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography gutterBottom variant="h5" component="div">
                        {data.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        {data.description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <IconButton sx={{marginLeft: 'auto'}} aria-label="delete-goal-button" color="success" onClick={() => handleTaskComplete(data.id)}>
                            <TaskAltSharpIcon/>
                        </IconButton>
                    </CardActions>
                </Card>
            </Grid>
            ))} 
        </Grid>
        </>
    )

}

export default Goal;