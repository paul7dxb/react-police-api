const CrimeList = (props) => {
    const queryParams = props.queryParams

    // console.log("queryParams")
    // console.log(queryParams)
    // console.log("props")
    // console.log(props)

    if(queryParams){
            return (
        <>
        <h1>First</h1>
        <h1>{queryParams.date}</h1>
        <h1>{queryParams.category}</h1>
        <p>{queryParams.polyBoundaryQuery}</p>
        <h1>{queryParams.date}</h1>
        </>
    )
    } else{
        return (
            <h1>Loading ...</h1>
        )
    }

}

export default CrimeList