import { useCallback, useEffect, useState } from "react";

const TestGroundPage = () => {
  const [policeData, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categoryTotals, setCategoryTotals] = useState([])
  const [totalCrime, setTotalCrime] = useState(0)


  const fetchPoliceDataHandler = useCallback(async () => {
    
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://data.police.uk/api/crimes-street/all-crime?poly=50.348010,-4.186085:50.414103,-4.208948:50.411820,-4.086455:50.357098,-4.093174&date=2022-08"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const loadedData = [];
      
      let crimes = {}
      let crimesArr = []
      let totalCrimeTally = 0

    //   Get desired data from response
      for (const key in data) {
        loadedData.push({
          id: data[key].id,
          category: data[key].category,
          street: data[key].location.street
        });

        // count category totals
        if(crimes[data[key].category]){
            crimes[data[key].category] += 1
        } else {
            crimes[data[key].category] = 1
        }


        totalCrimeTally ++
      }

      crimesArr = Array.from(crimes)


    console.log(loadedData)
      setData(loadedData);
      setTotalCrime(totalCrimeTally)
    //   console.log("categoryTotals")
    //   console.log(categoryTotals)
    //   console.log(crimes)
  
        crimesArr = Object.keys(crimes).map((key) => [(key), crimes[key]]);
      setCategoryTotals(crimesArr)

        console.log(crimesArr)
  


    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchPoliceDataHandler();
  }, [fetchPoliceDataHandler]);

  return (
    <>
      <h1>Test Ground</h1>
      <h3>{totalCrime}</h3>
      <p>Start of data</p>
      {categoryTotals.map(elem => <p key = {elem[0]}>{elem[0]} : {elem[1]}</p> )}
      <p>End of data</p>
    </>
  );
};

export default TestGroundPage;
